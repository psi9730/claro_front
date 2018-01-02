import Promise from 'bluebird';
import HttpError from 'standard-http-error';
import {decamelizeKeys, camelizeKeys} from 'humps';
import {normalize} from 'normalizr';
import {getConfiguration} from '../utils/configuration';
import {getAuthenticationToken} from '../utils/authentication';
import {setAuthenticationToken} from './authentication';
import timeout from './timeout';

const EventEmitter = require('event-emitter');

const TIMEOUT = 6000;

/**
 * All HTTP errors are emitted on this channel for interested listeners
 */
export const errors = new EventEmitter();

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @param {Object} schema Schema that normalizing body
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise} of response body
 */
export async function get(path, schema, suppressRedBox) {
  return bodyOf(request('get', path, null, schema, suppressRedBox));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Object} schema Schema that normalizing body
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function post(path, body, schema, suppressRedBox) {
  return bodyOf(request('post', path, body, schema, suppressRedBox));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Object} schema Schema that normalizing body
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function put(path, body, schema, suppressRedBox) {
  return bodyOf(request('put', path, body, schema, suppressRedBox));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} schema Schema that normalizing body
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function del(path, schema, suppressRedBox) {
  return bodyOf(request('delete', path, null, schema, suppressRedBox));
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 */

const REFRESH_TOKEN_REQUEST= 'API/REFRESH_TOKEN_REQUEST';
const REFRESH_TOKEN_SUCCESS = 'API/REFRESH_TOKEN_SUCCESS';
const REFRESH_TOKEN_FAILURE = 'API/REFRESH_TOKEN_FAILURE';

let refreshing = null;

async function refreshToken(refreshToken: string) {
  const body = {
    refreshToken,
    grantType: 'refresh_token',
  };
  const token = await post('/auth/driver_token', body);
  if (token) {
    await setAuthenticationToken(token);
    return true;
  }
  return false;
}

export async function request(method, path, body, schema, suppressRedBox = true) {
  try {
    const response = await sendRequest(method, path, body, suppressRedBox);
    const status = response.status;
    // if 401 refresh token
    // after refresh token retry
    if (status === 401) {
      if (refreshing === null) {
        const token = await getAuthenticationToken();
        if (token && token.refreshToken) {
          refreshing = refreshToken(token.refreshToken);
          if (await refreshing) {
            refreshing = null;
            return request(method, path, body, schema, suppressRedBox);
          }
        }
      } else {
        if (await refreshing) {
          refreshing = null;
          return request(method, path, body, schema, suppressRedBox);
        }
      }
    }
    // if error display error message

    // `fetch` promises resolve even if HTTP status indicates failure. Reroute
    // promise flow control to interpret error responses as failures
    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const error = new HttpError(status, message);

      // emit events on error channel, one for status-specific errors and other for all errors
      errors.emit(status.toString(), {path, message: error.message});
      errors.emit('*', {path, message: error.message}, status);

      throw error;
    }


    // if success parse response JSON
    // if parse error response raw string

    return handleResponse(
      path,
      schema,
      response
    );
  }
  catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
    throw error;
  }
}

/**
 * Takes a relative path and makes it a full URL to API server
 */
export function url(path) {
  const apiRoot = getConfiguration('API_ROOT');
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;
}

/**
 * Constructs and fires a HTTP request
 */
async function sendRequest(method, path, body) {
  console.log('sendRequest', method, path, body);

  try {
    const endpoint = url(path);
    const token = await getAuthenticationToken();
    const forceBasic = path === '/auth/driver_token';
    const accessToken = token ? token.accessToken : null;

    const headers = getRequestHeaders(body, accessToken, forceBasic);
    const options = body
      ? {method, headers, body: JSON.stringify(decamelizeKeys(body))}
      : {method, headers};

    console.log('in sendRequest', endpoint, 'options', options);

    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Receives and reads a HTTP response
 */
async function handleResponse(path, schema, response) {
  try {
    // parse response text
    const responseBody = await response.text();
    let body = responseBody ? camelizeKeys(JSON.parse(responseBody)) : null;
    console.log('before normalize', body);
    if (body && schema) {
      body = normalize(body, schema);
    }
    console.log('handleResponse', response, body);


    return {
      status: response.status,
      headers: response.headers,
      body,
    };
  } catch (e) {
    throw e;
  }
}

function getRequestHeaders(body, token, forceBasic = false) {
  const headers = body
    ? {'Accept': 'application/json', 'Content-Type': 'application/json'}
    : {'Accept': 'application/json'};

  if (token && !forceBasic) {
    return {...headers, Authorization: `Bearer ${token}`};
  } else {
    return {...headers, Authorization: 'Basic ZWFzaTZhZG1pbjplYXNpNg=='};
  }
}

// try to get the best possible error message out of a response
// without throwing errors while parsing
async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return '';
    }

    // Optimal case is JSON with a defined message property
    const payload = camelizeKeys(JSON.parse(body));
    if (payload && payload.message) {
      return payload.message;
    }

    // Should that fail, return the whole response body as text
    return body;

  } catch (e) {
    // Unreadable body, return whatever the server returned
    return response._bodyInit;
  }
}

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}

/**
 * Make best effort to turn a HTTP error or a runtime exception to meaningful error log message
 */
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`;
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  }
  else {
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`);
  }
}
