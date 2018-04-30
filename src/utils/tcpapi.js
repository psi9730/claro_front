import net from 'react-native-tcp';
import _ from 'lodash';
import store from '../redux/store';
import Constants from '../constants/constants';
import { makeCommonHeader, parseBufferData } from './ClaroBuffer';
import Storage, { KEYS }  from './ClaroStorage';
import {put} from 'redux-saga/effects';
import {DeviceActions, DeviceTypes} from '../modules/registerdevice/RegisterDeviceState';
const { TCP_HOST_NAME, TCP_PORT_NUMBER } = Constants;

export const callApi: Function = async (dataType: number, body) => {
  try {
    console.log(dataType);
    console.log(body);
    const client = net.connect({ port: TCP_PORT_NUMBER, host: TCP_HOST_NAME }, () => {
      const header = makeCommonHeader(dataType, body.length);
      const buf = Buffer.concat([header, body]);
      client.write(buf);
    });
    client.on('error', (error) => {
      throw new Error('error')
    });
    client.on('data', (data) => {
      client.destroy();
      const response = parseBufferData(data);
      console.log("response",response);
      store.dispatch({
        type: DeviceTypes.TCP_REQUEST_SUCCESS,
        payload: response
      });
      if(response.dataType === 0x0101){
        Storage.setItem(KEYS.deviceInfo, response);
      }
      if(response.dataType === 0x0301){
        Storage.setItem(KEYS.wifi, 1);
      }
      if(response.dataType === 0x0201){
        Storage.setItem(KEYS.ap, 1);
      }
      else {
        store.dispatch({
          type: DeviceTypes.TCP_REQUEST_FAILURE,
          error: "TCP_REQUEST_FAIL"
        });
      }
    });
    client.on('close', () => {
    });
  } catch (e) {
    throw new Error('error')
  }
};