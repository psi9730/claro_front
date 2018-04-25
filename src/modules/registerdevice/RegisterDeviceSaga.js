import { call, fork, put, takeLatest } from 'redux-saga/effects'
import { Actions, Types } from './reducer'
import Storage from '../../utils/ClaroStorage';
import {getAuthenticationToken, setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {DeviceActions, DeviceTypes} from './RegisterDeviceState';
import {callApi} from '../../utils/tcpapi'
import { makeBody, makeBssidBuffer, strBuffer, int16Buffer } from '../../utils/ClaroBuffer';
function* requestSendWifiInfo({ssid, password}: {ssid: string, password: string}) {
  const body = {
    ssid,
    password,
  };
  try {
    const res = yield call(post, '/driver/me/update', body);
    yield put(DeviceActions.editProfileSuccess(me));
  } catch (e) {
    yield put(DeviceActions.editProfileFailure(e));
  }
}

function* requestSendAP() {
  const body = {
    ssid,
    password,
  };
  try {
    const res = yield call(post, '/driver/me/update', body);
    yield put(DeviceActions.editProfileSuccess(me));
  } catch (e) {
    yield put(DeviceActions.editProfileFailure(e));
  }
}

function* requestLogin({username, password}: {username: string, password: string}) {
  const body = {
    username,
    password,
    grantType: 'password',
  };

  try {
    const token = yield call(post, '/auth/driver_token', body);

    yield setAuthenticationToken(token);

    yield put(DriverActions.loginSuccess(token));
  } catch (e) {
    yield put(DriverActions.loginFailure(e));
  }
}

function* requestSendSerialNumber({barcode}: {ssid: string, password: string}) {
  try {
    const res = yield call(callapi, 0x0100, makeBody(strBuffer(serailNumber,32)));
    yield put(DeviceActions.sendSerialNumberSuccess());
  } catch (e) {
    yield put(DeviceActions.sendSerialNumberFailure(e));
  }
}






export const RegitserDeviceSaga = [
  takeLatest(Devicetypes.LOGIN_REQUEST, requestLogin),
  takeLatest(Devicetypes.SEND_AP_REQUEST, requestSendAP),
  takeLatest(DeviceTypes.SEND_SERIAL_NUMBER_REQUEST, requestSendSerialNumber),
  takeLatest(DeviceTypes.SEND_WIFI_INFO_REQUEST, requestSendWifiInfo),
];
