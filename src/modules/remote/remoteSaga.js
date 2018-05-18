import { call, take, fork, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {RemoteTypes, RemoteActions} from './remoteState';
import { makeBody, makeBssidBuffer, strBuffer, int16Buffer } from '../../utils/ClaroBuffer';
import Constants from '../../constants/constants';
import Storage, { KEYS } from '../../utils/ClaroStorage';
import _ from 'lodash';
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
    console.log("power!!", body);
    const token = yield call(post, `/devices/add_command`, body);
    console.log("token",token);
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


export const RemoteSaga = [
  takeLatest(RemoteTypes.TOGGLE_POWER_REQUEST, requestTogglePowerRequest),
  takeLatest(RemoteTypes.TOGGLE_A_I_REQUEST, requestToggleAIRequest),
  takeLatest(RemoteTypes.TOGGLE_AIR_CLEANING_REQUEST, requestToggleAirRequest),
  takeLatest(RemoteTypes.TOGGLE_STERILIZING_REQUEST, requestToggleSterilizingRequest),
];
