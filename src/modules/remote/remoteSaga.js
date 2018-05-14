import { call, take, fork, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {RemoteTypes, RemoteActions} from './remoteState';
import { makeBody, makeBssidBuffer, strBuffer, int16Buffer } from '../../utils/ClaroBuffer';
import Constants from '../../constants/constants';
import Storage, { KEYS } from '../../utils/ClaroStorage';
import _ from 'lodash';
const { API_ROOT } = Constants;

function* requestTogglePowerRequest({power}: {power: number}) {
  try {
    const body = {
      power,
    };
    const token = yield call(post, `${API_ROOT}/devices/add_command`, body);
    yield put(RemoteActions.togglePowerSuccess());
  } catch (e) {
    yield put(RemoteActions.togglePowerFailure(e));
  }
}

function* requestToggleAIRequest({AI}: {AI: number}) {
  try {
    const body = {
      AI,
    };
    const token = yield call(post, `${API_ROOT}/devices/add_command`, body);
    yield put(RemoteActions.toggleAISuccess());
  } catch (e) {
    yield put(RemoteActions.toggleAIFailure(e));
  }
}
function* requestToggleAirRequest({air}: {air: number}) {
  try {
    const body = {
      air,
    };
    const token = yield call(post, `${API_ROOT}/devices/add_command`, body);
    yield put(RemoteActions.toggleAirCleaningSuccess());
  } catch (e) {
    yield put(RemoteActions.toggleAirCleaningFailure(e));
  }
}
function* requestToggleSterilizingRequest({sterilizing}: {sterilizing: number}) {
  try {
    const body = {
      sterilizing,
    };
    const token = yield call(post, `${API_ROOT}/devices/add_command`, body);
    yield put(RemoteActions.toggleSterilizingSuccess());
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
