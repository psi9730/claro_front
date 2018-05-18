// @flow

import Promise from 'bluebird';
import HttpError from 'standard-http-error';
import {decamelizeKeys, camelizeKeys} from 'humps';
import {normalize} from 'normalizr';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import EventEmitter from 'event-emitter';

import {getConfiguration} from '../utils/configuration';
import {getAuthenticationToken} from '../utils/authentication';
import {clearAuthenticationToken, getDriverId, setAuthenticationToken} from './authentication';
import {deviceLocale} from '../utils/i18n';
import timeout from './timeout';
import toast from '../utils/toast';

const TIMEOUT = 6000;

/**
 * All HTTP errors are emitted on this channel for interested listeners
 */
export const errors = new EventEmitter();

export async function postPushToken(fcmToken: ?string, apnsToken: ?string) {
  const body = {
    fcmToken,
    apnsToken,
    platform: Platform.OS === 'ios' ? 'ios' : 'android',
    packageName: DeviceInfo.getBundleId(),
  };
  try {
    return await request('post', '/driver/endpoint', body);
  } catch (e) {
    return false;
  }
}

export async function postGeo(locs: ?Array<Object>) {
  try {
    return await request('post', '/driver/geo', locs);
  } catch (e) {
    return false;
  }
}

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @param {Object} schema Schema that normalizing body
 * @returns {Promise} of response body
 */
export async function get(path: string, schema: any) {
  return bodyOf(request('get', path, null, schema));
}


/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Object} schema Schema that normalizing body
 * @returns {Promise}  of response body
 */
export async function post(path: string, body: ?{}, schema: any) {
  return bodyOf(request('post', path, body, schema));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Object} schema Schema that normalizing body
 * @returns {Promise}  of response body
 */
export async function put(path: string, body: ?{}, schema: any) {
  return bodyOf(request('put', path, body, schema));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} schema Schema that normalizing body
 * @returns {Promise}  of response body
 */
export async function del(path: string, schema: any) {
  return bodyOf(request('delete', path, null, schema));
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 */

let refreshingPromise = null;

const TOKEN_URL = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

async function refreshToken() {
  const token = await getAuthenticationToken();
  const refreshToken = token && token.refreshToken;

  if (!refreshToken) return new Error();

  const body = {
    refreshToken,
    grantType: REFRESH_TOKEN,
  };
  try {
    const newToken = await post(TOKEN_URL, body);
    if (newToken) {
      await setAuthenticationToken(newToken);
      return null;
    }
    return new Error();
  } catch (e) {
    return e;
  }
}

export async function request(method: string, path: string, body: ?{}|Array<any>, schema: any) {
  try {
    const response = await sendRequest(method, path, body);
    const status = response.status;
    console.log(response,"response");
    // if 401 refresh token
    // after refresh token retry
    if (status === 401) {
      if (path === TOKEN_URL && body && body.grantType === REFRESH_TOKEN) {
        throw new Error('incorrect_refresh_token');
      } else if (path !== TOKEN_URL) {
        if (refreshingPromise === null) {
          refreshingPromise = refreshToken();
        }
        const refreshError = await refreshingPromise;
        refreshingPromise = null;
        if (refreshError === null) {
          return request(method, path, body, schema);
        } else {
          await clearAuthenticationToken();
          throw refreshError;
        }
      }
    }
    // if error display error message

    // `fetch` promises resolve even if HTTP status indicates failure. Reroute
    // promise flow control to interpret error responses as failures
    if (status >= 400) {
      console.log("error in 400>=");
      const message = await getErrorMessageSafely(response);
      toast(message, 'error');
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
  } catch (error) {
    throw error;
  }
}

/**
 * Takes a relative path and makes it a full URL to API server
 */
export function url(path: string) {
  const apiRoot = getConfiguration('API_ROOT');
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;
}

/**
 * Constructs and fires a HTTP request
 */

const APPLICATION_JSON_TYPE = 'application/json';
const shouldContentTypeNull = (path) => _.includes(['/users/me/kyc_records'], path);

async function sendRequest(method: string, path: string, body: ?{}|Array<any>) {
  try {
    const endpoint = url(path);
    console.log("sendRequest");
    const token = await getAuthenticationToken();
    console.log(token,"token");
    const forceBasic = path === TOKEN_URL;
    const accessToken = token ? token.accessToken : null;
    const forceJson = false;
    const contentType = shouldContentTypeNull(path) ? null : APPLICATION_JSON_TYPE;

    if(body && !accessToken && _.isPlainObject(body)) {
      let newBody = ((body: any): ?{});
      body = {...newBody, locale: deviceLocale}
    }

    const headers = await getRequestHeaders(accessToken, forceBasic, forceJson, contentType);
    const options = body
      ? {method, headers, body: contentType === APPLICATION_JSON_TYPE ? JSON.stringify(decamelizeKeys(body)): body}
      : {method, headers};

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
    if (body && schema) {
      body = normalize(body, schema);
    }

    return {
      status: response.status,
      headers: response.headers,
      body,
    };
  } catch (e) {
    throw e;
  }
}

async function getRequestHeaders(token, forceBasic = false, forceJson = false, contentType = '') {
  let headers = {'Accept': APPLICATION_JSON_TYPE};
  if (!_.isEmpty(forceJson)) {
    _.assign(headers, {'Content-Type': APPLICATION_JSON_TYPE});
  } else if (contentType) {
    _.assign(headers, {'Content-Type': contentType});
  }

  if (token && !forceBasic) {
    _.assign(headers, {Authorization: `Bearer ${token}`});
  } else {
    _.assign(headers, {Authorization: 'Basic ZWFzaTZhZG1pbjplYXNpNg=='});
  }
  const driverId = await getDriverId();
  if (driverId) {
    _.assign(headers, {Driver: `Driver ${driverId}`});
  }
  return headers;
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
    console.log(response.statusText,"statusText");
    // Unreadable body, return whatever the server returned
    return response.statusText;
  }
}

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return (response && response.body) || null;
  } catch (e) {
    throw e;
  }
}
