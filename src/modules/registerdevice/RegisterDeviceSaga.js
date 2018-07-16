import { call, take, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {post,get, del, put as puts} from '../../utils/api';
import {DeviceActions, DeviceTypes} from './RegisterDeviceState';
import {callApi} from '../../utils/tcpapi'
import { makeBody, makeBssidBuffer, strBuffer, int16Buffer } from '../../utils/ClaroBuffer';
import Constants from '../../constants/constants';
import _ from 'lodash';
const { API_ROOT } = Constants;

function* requestSendWifiInfo({ssid, password}: {ssid: string, password: string}) {
  try {
    yield call(callApi, 0x0300, makeBody(int16Buffer(ssid.length),
      strBuffer(ssid),
      int16Buffer(password == null ? 0: password.length),
      password == null? Buffer.alloc(0): strBuffer(password),
      int16Buffer(''), makeBssidBuffer('')));
    const action = yield take([DeviceActions.tcpRequestSuccess, DeviceActions.tcpRequestFailure]);
    if(action.type === DeviceTypes.TCP_REQUEST_SUCCESS) {
      yield put(DeviceActions.sendWifiInfoSuccess(action.payload));
    }
  } catch (error) {
    yield put(DeviceActions.sendWifiInfoFailure(error));
  }
}

function* requestSendAP() {
  const urls = [
    `${API_ROOT}/devices/get_command/`,
  ];
  const bufContentArr = [];
  _.forEach(urls, (url) => {
    bufContentArr.push(int16Buffer(url.length));
    bufContentArr.push(strBuffer(url));
});

  try {
    yield call(callApi, 0x0200,
      makeBody(
      int16Buffer(urls.length),
      ...bufContentArr,
    ));
    const action = yield take([DeviceActions.tcpRequestSuccess, DeviceActions.tcpRequestFailure]);
    if(action.type === DeviceTypes.TCP_REQUEST_SUCCESS)
      yield put(DeviceActions.sendApSuccess(action.payload));
    else
      yield put(DeviceActions.sendApFailure(action.error));
  } catch (error) {
    yield put(DeviceActions.sendApFailure(error));
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
    console.log(makeBody(strBuffer(barcode,32)));
    yield call(callApi, 0x0100, makeBody(strBuffer(barcode,32)));
    const action = yield take([DeviceActions.tcpRequestSuccess, DeviceActions.tcpRequestFailure]);
    if(action.type === DeviceTypes.TCP_REQUEST_SUCCESS) {
      yield put(DeviceActions.sendSerialNumberSuccess(action.payload));
    }
    else {
      yield put(DeviceActions.sendSerialNumberFailure(action.error));
    }
  } catch (e) {
    console.log("sendSerialNumber",action.error);
    yield put(DeviceActions.sendSerialNumberFailure(e));
  }
}


function* requestRegisterDevice({barcode,nickname,deviceInfo}: {barcode: string,nickname: string,deviceInfo:any}) {
  try {
    const body = {
      "serial_number": barcode,
      "nickname": nickname,
      "latitude": 12,
      "longitude": 90,
      "device_info": JSON.stringify(deviceInfo)
    };
    console.log(body);
    console.log(`${API_ROOT}/devices/register/`);
    yield call(post, `/devices/register/`, body, null);
    yield put(DeviceActions.registerDeviceSuccess());
  } catch (e) {
    yield put(DeviceActions.registerDeviceFailure(e));
  }
}
function* requestUpdateDevice({barcode,nickname}: {barcode: string,nickname: string}) {
  try {
    const body = {
      "serial_number": barcode,
      "nickname": nickname,
      "latitude": 12,
      "longitude": 90
    };
    console.log(body);
    console.log(`${API_ROOT}/devices/register/`);
    yield call(puts, `/devices/register/`, body, null);
    yield put(DeviceActions.updateDeviceSuccess(nickname));
  } catch (e) {
    yield put(DeviceActions.updateDeviceFailure(e));
  }
}
function* requestIsActive({isActive}: {isActive:boolean}) {
  try {
    const body ={
      isActivePush: isActive
      }
    ;
    //yield call(puts, `/devices/register/`, body, null);
    yield put(DeviceActions.isActiveSuccess(isActive));
  } catch (e) {
    yield put(DeviceActions.isActiveFailure(e));
  }
}
function* requestDeleteDevice({serialNumber}: {serialNumber:string}) {
  try {
    const token = yield call(del, `/devices/register/${serialNumber}`);
    yield put(DeviceActions.deleteDeviceSuccess(token));
  } catch (e) {
    yield put(DeviceActions.deleteDeviceFailure(e));
  }
}
function* requestGetDevices() {
  try {
    const username= "sss";
    const token = yield call(get, `/devices/get_device_list/${username}`);
    yield put(DeviceActions.getDevicesSuccess(token));
  } catch (e) {
    yield put(DeviceActions.getDevicesFailure(e));
  }
}

export const RegisterDeviceSaga = [
  takeLatest(DeviceTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(DeviceTypes.DELETE_DEVICE_REQUEST, requestDeleteDevice),
  takeLatest(DeviceTypes.GET_DEVICES_REQUEST, requestGetDevices),
  takeLatest(DeviceTypes.IS_ACTIVE_REQUEST, requestIsActive),
  takeLatest(DeviceTypes.SEND_AP_REQUEST, requestSendAP),
  takeLatest(DeviceTypes.SEND_SERIAL_NUMBER_REQUEST, requestSendSerialNumber),
  takeLatest(DeviceTypes.SEND_WIFI_INFO_REQUEST, requestSendWifiInfo),
  takeLatest(DeviceTypes.REGISTER_DEVICE_REQUEST, requestRegisterDevice),
  takeLatest(DeviceTypes.UPDATE_DEVICE_REQUEST, requestUpdateDevice),
];
