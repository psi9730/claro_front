import { call, take, fork, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {RemoteTypes, RemoteActions} from './remoteState';
import {DeviceTypes, DeviceActions} from '../registerdevice/RegisterDeviceState';
import Constants from '../../constants/constants';
import Storage, { KEYS } from '../../utils/ClaroStorage';
const { API_ROOT } = Constants;

function* requestTogglePowerRequest({power, serial_number}: {power: number, serial_number: string}) {
  try {
    let body;
    console.log("power serial_number", serial_number);
    if(power===0)
      body = {
      serial_number,
      type: 0
    };
    else
      body = {
      serial_number,
        type:1
      };
    const token = yield call(post, `/devices/add_command`, body);
    yield put(RemoteActions.togglePowerSuccess(power));
  } catch (e) {
    yield put(RemoteActions.togglePowerFailure(e));
  }
}

function* requestToggleAIRequest({AI, serial_number}: {AI: number, serial_number: string}) {
  try {
    let body;
    if (AI === 0) {
      yield put(RemoteActions.toggleAISuccess(AI));
    }
    else{
      body = {
        serial_number,
        type: 2
      };
      const token = yield call(post, `/devices/add_command`, body);
      yield put(RemoteActions.toggleAISuccess(AI));
  }
  } catch (e) {
    yield put(RemoteActions.toggleAIFailure(e));
  }
}
function* requestToggleAirRequest({air, serial_number}: {air: number, serial_number: string}) {
  try {
    let body;
    console.log("air serial_number", serial_number);
    if (air === 0) {
      yield put(RemoteActions.toggleAirCleaningSuccess(air));
    }
    else if(air === 1){
      body = {
        serial_number,
        type: 5
      };
      console.log(body,"body");
      const token = yield call(post, `/devices/add_command`, body);
      yield put(RemoteActions.toggleAirCleaningSuccess(air));
    }
    else if(air===2){
      body = {
        serial_number,
        type: 6
      };
      const token = yield call(post, `/devices/add_command`, body);
      yield put(RemoteActions.toggleAirCleaningSuccess(air));
    }
  } catch (e) {
    yield put(RemoteActions.toggleAirCleaningFailure(e));
  }
}
function* requestToggleSleepRequest({sleep, serial_number}: {sleep: number, serial_number: string}) {
  try {
    let body;
    if(sleep===1)
    body = {
      serial_number,
      type: 6
    };
    else
      body = {                //non-sleep mode
        serial_number,
        type: 7
      };
    yield call(post, `/devices/add_command`, body);
    yield put(RemoteActions.toggleSleepSuccess(sleep));
  } catch (e) {
    yield put(RemoteActions.toggleSleepFailure(e));
  }
}

function* requestToggleSterilizingRequest({sterilizing, serial_number}: {sterilizing: number, serial_number: string}) {
  try {
    let body;
    console.log(sterilizing,"sterilizing in request");
    if (sterilizing === 0) {
      yield put(RemoteActions.toggleSterilizingSuccess(sterilizing));
    }
    else if(sterilizing === 1) {
      body = {
        serial_number,
        type: 3
      };
      console.log("body",body);
      const token = yield call(post, `/devices/add_command`, body);
      yield put(RemoteActions.toggleSterilizingSuccess(sterilizing));
    }
    else if(sterilizing === 2) {
      body = {
        serial_number,
        type: 4
      };
      const token = yield call(post, `/devices/add_command`, body);
      yield put(RemoteActions.toggleSterilizingSuccess(sterilizing));
    }
  } catch (e) {
    yield put(RemoteActions.toggleSterilizingFailure(e));
  }
}
function* requestSetDeviceInfoRequest({serial_number}: {serial_number:string}) {
  try {
    const token = yield call(get, `/devices/status/${serial_number}`);
    yield put(RemoteActions.setDeviceInfoSuccess(token));
  } catch (e) {
    yield put(RemoteActions.setDeviceInfoFailure(e));
  }
}

function* requestGetDeviceInfoRequest({username}: {username:string}) {
  try {
      const token = yield call(get, `/devices/get_device_list/${username}`);
      yield put(RemoteActions.getDeviceInfoSuccess(token));
  } catch (e) {
    yield put(RemoteActions.getDeviceInfoFailure(e));
  }
}

function* requestGetControlDevice({serialNumber}: {serialNumber:string}) {
  try {
    const token = yield call(get, `/devices/status/${serialNumber}/status`);
    yield put(RemoteActions.getControlDeviceSuccess(token));
    yield put(DeviceActions.updateBarcode(serialNumber));
    yield put(DeviceActions.updateNickname(token.nickname));
    yield put(DeviceActions.restoreDevice(JSON.parse(token.deviceInfo)));
  } catch (e) {
    yield put(RemoteActions.getControlDeviceFailure(e));
  }
}

function* requestSetControlDevice({serialNumber, power, sterilizing, airCleaning, AI, sleepMode,isTurnOnActive, isTurnOffActive, turnOnDay, turnOffHour, turnOnHour}:  {serialNumber: string, power: number,
  serialNumber: string,
  sterilizing: number,
  airCleaning: number,
  sleepMode: number,
  AI: number,
  isTurnOnActive: boolean,
  isTurnOffActive: boolean,
  turnOnDay: any,
  turnOnHour: Date,
  turnOffHour: number}) {
  try {
    const body={
      serialNumber, power, sterilizing, airCleaning, AI, sleepMode,isTurnOnActive, isTurnOffActive,   "turnOnDay": turnOnDay, turnOffHour, turnOnHour
    }
    const token = yield call(post, `/devices/status/${serialNumber}/status`,body);
    yield put(RemoteActions.setControlDeviceSuccess(token));
  } catch (e) {
    yield put(RemoteActions.setControlDeviceFailure(e));
  }
}
function* requestSetControlDevice2({serialNumber, power, sterilizing, airCleaning, AI, sleepMode, isTurnOnActive, isTurnOffActive, turnOnDay, turnOffHour, turnOnHour}:  {serialNumber: string, power: number,
  serialNumber: string,
  sterilizing: number,
  airCleaning: number,
  AI: number,
  isTurnOnActive: boolean,
  isTurnOffActive: boolean,
  turnOnDay: any,
  sleepMode: number,
  turnOnHour: Date,
  turnOffHour: number}) {
  const body = {
    power,
    sterilizing,
    serialNumber,
    airCleaning,
    AI,
    isTurnOnActive,
    sleepMode,
    isTurnOffActive,
    turnOnDay,
    turnOffHour,
    turnOnHour
  }
  yield put(RemoteActions.setControlDevice2Success(body));
  yield put(DeviceActions.updateBarcode(serialNumber));
}

export const RemoteSaga = [
  takeLatest(RemoteTypes.GET_CONTROL_DEVICE_REQUEST, requestGetControlDevice),
  takeLatest(RemoteTypes.SET_CONTROL_DEVICE_REQUEST, requestSetControlDevice),
  takeLatest(RemoteTypes.SET_CONTROL_DEVICE2_REQUEST, requestSetControlDevice2),
  takeLatest(RemoteTypes.TOGGLE_POWER_REQUEST, requestTogglePowerRequest),
  takeLatest(RemoteTypes.TOGGLE_SLEEP_REQUEST, requestToggleSleepRequest),
  takeLatest(RemoteTypes.TOGGLE_A_I_REQUEST, requestToggleAIRequest),
  takeLatest(RemoteTypes.TOGGLE_AIR_CLEANING_REQUEST, requestToggleAirRequest),
  takeLatest(RemoteTypes.TOGGLE_STERILIZING_REQUEST, requestToggleSterilizingRequest),
  takeLatest(RemoteTypes.GET_DEVICE_INFO_REQUEST, requestGetDeviceInfoRequest),
  takeLatest(RemoteTypes.SET_DEVICE_INFO_REQUEST, requestSetDeviceInfoRequest),

];
