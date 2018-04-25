import { apiMiddleware, isRSAA, RSAA, CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import createLogger, { LEVEL } from '../utils/ClaroLogger';

const logger = createLogger(LEVEL.VERBOSE);

export const CLEAR_REFRESH_TOKEN_PROMISE = 'CLEAR_REFRESH_TOKEN_PROMISE';
export const SAVE_REFRESH_TOKEN_PROMISE = 'SAVE_REFRESH_TOKEN_PROMISE';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_FAILURE = 'TOKEN_REFRESH_FAILURE';

const defaultConfig = {
  refreshReducerKey: 'tokenRefresh',
  saveRefreshTokenPromise: promise => ({
    type: SAVE_REFRESH_TOKEN_PROMISE,
    promise,
  }),
  clearRefreshTokenPromise: () => ({
    type: CLEAR_REFRESH_TOKEN_PROMISE,
  }),
}; // TODO implement

const requestNewAccessToken = ({
                                 store, next,
                                 getRefreshToken, refreshTokenAction,
                                 clearRefreshTokenPromise,
                                 saveRefreshToken, saveAccessToken,
                               }) => store.dispatch(refreshTokenAction(getRefreshToken())).then((response) => {
  next(clearRefreshTokenPromise());

  if (!response.error) {
    saveRefreshToken(response.payload);
    saveAccessToken(response.payload);

    return { error: false };
  }

  return { error: true };
});

export { CALL_API, RSAA };
export default function tokenAPIMiddleware(config = {}) {
  const {
    getAccessToken,
    getRefreshToken,
    baseURL,
    refreshReducerKey,
    saveRefreshTokenPromise,
    clearRefreshTokenPromise,

    refreshTokenAction,
    saveRefreshToken,
    saveAccessToken,

    refreshFailure,
  } = { ...defaultConfig, ...config };

  return store => next => (originalAction) => {
    // before injection
    // inject access token for bearer auth
    const callApi = originalAction[RSAA];
    if (typeof callApi === 'undefined') {
      return next(originalAction);
    }
    const schema = originalAction.apiSchema;
    if (!isRSAA(originalAction)) {
      return next(originalAction);
    }

    const copiedAction = { ...originalAction };
    // set access token

    return Promise.resolve().then(() => getAccessToken()).then((accessToken) => {
      if (copiedAction.authenticated && accessToken) {
        callApi.headers = Object.assign({}, callApi.headers, {
          Authorization: `Bearer ${accessToken}`,
        });
      }

      delete copiedAction.authenticated;
      delete copiedAction.apiSchema;

      if (callApi.endpoint.startsWith('/')) {
        let resolvedBaseURL = baseURL;
        if (typeof resolvedBaseURL === 'function') {
          resolvedBaseURL = resolvedBaseURL();
        }
        callApi.endpoint = `${resolvedBaseURL}${callApi.endpoint}`;
      }

      const serialNumber = store.getState().serialNumber;
      if (callApi.body && serialNumber) {
        const originalBody = JSON.parse(callApi.body);
        if (!originalBody.serial_number) {
          callApi.body = JSON.stringify({
            ...originalBody,
            serial_number: serialNumber,
          });
        }
      }

      // call middleware
      const nextWrapper = (action) => { // this is for apiMiddleware's next monkey patch
        logger.log('inside nextWrapper');
        logger.log(action);
        if (action.error) {
          if (action.payload.status === 401) {
            next(action);
            let refreshPromise = store.getState()[refreshReducerKey].refreshTokenPromise;

            if (!refreshPromise) {
              refreshPromise = requestNewAccessToken({
                store,
                next,
                getRefreshToken,
                refreshTokenAction,
                clearRefreshTokenPromise,
                saveRefreshToken,
                saveAccessToken,
              });
              next(saveRefreshTokenPromise(refreshPromise));
            }

            return refreshPromise.then((response) => {
              if (!response.error) {
                return store.dispatch(originalAction);
              }

              // even the refresh token failed
              return store.dispatch(refreshFailure()).then(() => ({ error: true }));
            });
          }
          return next(action);
        }

        const resAction = { ...action };
        if (resAction.payload && schema) {
          resAction.payload = normalize(action.payload, schema);
        }

        return next(resAction);
      };

      const apiNext = apiMiddleware(store)(nextWrapper);
      return apiNext(copiedAction);
    });
  };
}
