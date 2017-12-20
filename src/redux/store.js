import {applyMiddleware, createStore, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createReduxWaitForMiddleware from 'redux-wait-for-action';

import loggerMiddleware from './middleware/loggerMiddleware';
import reducer from './reducer';

export const sagaMiddleware = createSagaMiddleware();
export const waitForMiddleware = createReduxWaitForMiddleware();

const enhancers = [
  applyMiddleware(
    promiseMiddleware,
    thunkMiddleware,
	  sagaMiddleware,
    waitForMiddleware,
    loggerMiddleware,
  ),
];

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const composeEnhancers = (
	__DEV__ &&
	typeof (window) !== 'undefined' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	) || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

// create the store
const store = createStore(
  reducer,
  undefined,
  enhancer
);

export default store;
