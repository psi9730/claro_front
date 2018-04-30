import { call, fork, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {DeviceActions, DeviceTypes} from './RegisterDeviceState';
import {callApi} from '../../utils/tcpapi'
import { makeBody, makeBssidBuffer, strBuffer, int16Buffer } from '../../utils/ClaroBuffer';
import Constants from '../../constants/constants';
import Storage, { KEYS } from '../../utils/ClaroStorage';
const { API_ROOT } = Constants;

function* requestSendWifiInfo({ssid, password, bssid=null, wepKeyIndex=null}: {ssid: string, password: string}) {
  try {
    const res = yield call(callApi, 0x0300, makeBody(int16Buffer(ssid.length),
      strBuffer(ssid),
      int16Buffer(password == null ? 0: password.length),
      password == null? Buffer.alloc(0): strBuffer(password),
      int16Buffer(wepKeyIndex), makeBssidBuffer(bssid)));
    if(res.dataType === 0x0301){
      Storage.setItem(KEYS.wifi, 1);
      yield put(DeviceActions.sendWifiInfoSuccess());
    }
    else {
      yield put(DeviceActions.sendWifiInfoFailure());
    }
  } catch (error) {
    yield put(DeviceActions.sendWifiInfoFailure(error));
  }
}

function* requestSendAP() {
  const urls = [
    `${API_ROOT}/devices/get_command`,
  ]
  const bufContentArr = [];
  _.forEach(urls, (url) => {
    bufContentArr.push(int16Buffer(url.length));
    bufContentArr.push(strBuffer(url));
});

  try {
    const res = yield call(callApi, 0x0200,
      makeBody(
      int16Buffer(urls.length),
      ...bufContentArr,
    ));

    if(res.dataType === 0x0201){
      Storage.setItem(KEYS.ap, 1);
      yield put(DeviceActions.sendAPSuccess());
    }
    else {
      yield put(DeviceActions.sendAPFailure());
    }
  } catch (error) {
    yield put(DeviceActions.sendAPFailure(error));
  }
}

function* requestLogin({username, password}: {username: string, password: string}) {
  const body = {
    username,
    password,
    grantType: 'password',
  };

  try {
    const token = yield call(post, '/auth/device_token', body);
    yield setAuthenticationToken(token);
    yield put(DeviceActions.loginSuccess(token));
  } catch (e) {
    yield put(DeviceActions.loginFailure(e));
  }
}

function* requestSendSerialNumber({barcode}: {barcode: string}) {
  try {
    const res = yield call(callapi, 0x0100, makeBody(strBuffer(barcode,32)));
    if(res.dataType === 0x0101){
      Storage.setItem(KEYS.deviceInfo, res);
      yield put(DeviceActions.sendSerialNumberSuccess(res));
    }
    else {
      yield put(DeviceActions.sendSerailNumberFailure());
    }
  } catch (e) {
    yield put(DeviceActions.sendSerialNumberFailure(e));
  }
}

export const RegisterDeviceSaga = [
  takeLatest(DeviceTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(DeviceTypes.SEND_AP_REQUEST, requestSendAP),
  takeLatest(DeviceTypes.SEND_SERIAL_NUMBER_REQUEST, requestSendSerialNumber),
  takeLatest(DeviceTypes.SEND_WIFI_INFO_REQUEST, requestSendWifiInfo),
];
