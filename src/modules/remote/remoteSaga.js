import { call, put, takeLatest } from 'redux-saga/effects'
import {get, post} from '../../utils/api';
import {RemoteTypes, RemoteActions} from './remoteState';
import {DeviceTypes, DeviceActions} from '../registerdevice/RegisterDeviceState';

function* requestTogglePowerRequest({power, serial_number}: {power: number, serial_number: string}) {
  try {
    let body;
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
    if (air === 0) {
      yield put(RemoteActions.toggleAirCleaningSuccess(air));
    }
    else if(air === 1){
      body = {
        serial_number,
        type: 5
      };
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
    if(sleep===1) {
      body = {
        serial_number,
        type: 7
      };
      yield call(post, `/devices/add_command`, body);
      yield put(RemoteActions.toggleSleepSuccess(sleep));
    }
    else {
      body = {                //non-sleep mode
        serial_number,
        type: 0
      };
      yield put(RemoteActions.toggleSleepSuccess(sleep));
    }
  } catch (e) {
    yield put(RemoteActions.toggleSleepFailure(e));
  }
}

function* requestToggleSterilizingRequest({sterilizing, serial_number}: {sterilizing: number, serial_number: string}) {
  try {
    let body;
    if (sterilizing === 0) {
      yield put(RemoteActions.toggleSterilizingSuccess(sterilizing));
    }
    else if(sterilizing === 1) {
      body = {
        serial_number,
        type: 3
      };
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

function* requestGetDeviceInfoRequest() {
  try {
      const token = yield call(get, `/devices/get_device_list`);
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
function* requestSetTimerOff({serialNumber, isTurnOffActive, turnOffHour}:  {serialNumber: string,
  isTurnOffActive: boolean,
  turnOffHour: any}) {
  try {
    var now  = new Date()
    var date = new Date(now.getTime() + (turnOffHour * 60 * 60 * 1000));
    const body={
      serial_number: serialNumber,
      is_turn_off_active: isTurnOffActive,
      turn_off_date: date,
    }
    const token = yield call(post, `/devices/timer_off/${serialNumber}/`,body);
    yield put(RemoteActions.setTurnOffSuccess(token));
  } catch (e) {
    yield put(RemoteActions.setTurnOffFailure(e));
  }
}
function* requestSetTimerOn({serialNumber, isTurnOnActive, turnOnDay, turnOnHour}:  {serialNumber: string,
  isTurnOnActive: boolean,
  turnOnDay: any,
  turnOnHour: Date}) {
  try {
    const body={
      serial_number: serialNumber,
      is_turn_on_active: isTurnOnActive,
      turn_on_day: JSON.stringify(turnOnDay),
      turn_on_date: turnOnHour,
    }
    const token = yield call(post, `/devices/timer_on/${serialNumber}/`,body);
    yield put(RemoteActions.setTurnOnSuccess(token));
  } catch (e) {
    yield put(RemoteActions.setTurnOnFailure(e));
  }
}

function* requestGetOuter({serialNumber, jibunAddr}:  {serialNumber: string, jibunAddr:string}) {
  try {
    const body={
      location:jibunAddr
    }
    const token = yield call(post, `/devices/outer/${serialNumber}/`,body);
    yield put(RemoteActions.getOuterSuccess(token));
  } catch (e) {
    yield put(RemoteActions.getOuterFailure(e));
  }
}

function* requestFilterReset({time,serialNumber}:  {time: number,serialNumber:string}) {
  try {
    const body={
    filter_sum: time
    }
    const token = yield call(post, `/devices/filter_set/${serialNumber}/`,body);
    yield put(RemoteActions.filterTimeResetSuccess(token));
  } catch (e) {
    yield put(RemoteActions.filterTimeResetFailure(e));
  }
}

export const RemoteSaga = [
  takeLatest(RemoteTypes.GET_OUTER_REQUEST, requestGetOuter),
  takeLatest(RemoteTypes.FILTER_TIME_RESET_REQUEST, requestFilterReset),
  takeLatest(RemoteTypes.SET_TURN_ON_REQUEST, requestSetTimerOn),
  takeLatest(RemoteTypes.SET_TURN_OFF_REQUEST, requestSetTimerOff),
  takeLatest(RemoteTypes.SET_CONTROL_DEVICE2_REQUEST, requestSetControlDevice2),
  takeLatest(RemoteTypes.GET_CONTROL_DEVICE_REQUEST, requestGetControlDevice),
  takeLatest(RemoteTypes.TOGGLE_POWER_REQUEST, requestTogglePowerRequest),
  takeLatest(RemoteTypes.TOGGLE_SLEEP_REQUEST, requestToggleSleepRequest),
  takeLatest(RemoteTypes.TOGGLE_A_I_REQUEST, requestToggleAIRequest),
  takeLatest(RemoteTypes.TOGGLE_AIR_CLEANING_REQUEST, requestToggleAirRequest),
  takeLatest(RemoteTypes.TOGGLE_STERILIZING_REQUEST, requestToggleSterilizingRequest),
  takeLatest(RemoteTypes.GET_DEVICE_INFO_REQUEST, requestGetDeviceInfoRequest),
  takeLatest(RemoteTypes.SET_DEVICE_INFO_REQUEST, requestSetDeviceInfoRequest),

];
