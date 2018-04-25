/* @flow */

import net from 'react-native-tcp';
import _ from 'lodash';

import Constants from '../constants/constants';
import { makeCommonHeader, parseBufferData } from '../utils/ClaroBuffer.js';
import Storage, { KEYS } from '../utils/ClaroStorage';
import createLogger, { LEVEL } from '../utils/ClaroLogger';

const logger = createLogger(LEVEL.VERBOSE);

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_TCP_API = 'CALL_TCP_API';
export const SEND_TCP_REQUEST = 'SEND_TCP_REQUEST';
export const TCP_REQUEST_SUCCESS = 'TCP_REQUEST_SUCCESS';
export const TCP_REQUEST_FAIL = 'TCP_REQUEST_FAIL';

const { TCP_HOST_NAME, TCP_PORT_NUMBER } = Constants;

const callApi: Function = (isFan: boolean, dataType: number, body: Buffer, dispatch: Function) => {
  try {
    const client = net.connect({ port: TCP_PORT_NUMBER, host: TCP_HOST_NAME }, () => {
      const header = makeCommonHeader(dataType, body.length);
      const buf = Buffer.concat([header, body]);

      client.write(buf);
    });
    client.on('error', (error) => {
      logger.warn('tcp socket error');
      dispatch({
        type: TCP_REQUEST_FAIL,
        dataType,
        body,
        error,
      });
      logger.warn(error);
    });
    client.on('data', async (data) => {
      client.destroy();
      const response = parseBufferData(data);
      dispatch({
        type: TCP_REQUEST_SUCCESS,
        dataType,
        body,
        response,
        isFan,
      });
      if (response.dataType === 0x0101) {
        if (isFan) {
          await Storage.setItem(KEYS.fanInfo, response);
        } else {
          await Storage.setItem(KEYS.deviceInfo, response);
        }
      }
      if (response.dataType === 0x0301) {
        if (isFan) {
          const deviceInfo = await Storage.getItem(KEYS.fanInfo);
          await Storage.setItem(KEYS.fanInfo, _.assign({}, deviceInfo, { registered: true }));
        } else {
          const deviceInfo = await Storage.getItem(KEYS.deviceInfo);
          await Storage.setItem(KEYS.deviceInfo, _.assign({}, deviceInfo, { registered: true }));
        }
      }
    });
    client.on('close', () => {
      logger.log('socket close');
    });
  } catch (e) {
    logger.warn(e);
  }
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store: any) => (next: (action: Object) => void) => (action: any) => {
  const tcpCallApi = action[CALL_TCP_API];
  if (typeof tcpCallApi === 'undefined') {
    return next(action);
  }

  let { dataType } = tcpCallApi;
  const { body, isFan } = tcpCallApi;

  if (typeof dataType === 'function') {
    dataType = dataType(store.getState());
  }

  if (typeof dataType !== 'number') {
    throw new Error('dataType should be a hex number');
  }
  if (!body) {
    throw new Error('there should be a tcp packet body');
  }

  const actionWith = (data: Object): Object => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_TCP_API];
    return finalAction;
  };

  callApi(isFan, dataType, body, next);
  return next(actionWith({
    type: SEND_TCP_REQUEST,
    dataType,
  }));
};
