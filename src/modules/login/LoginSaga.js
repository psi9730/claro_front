import { call, take, fork, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {LoginTypes, LoginActions} from './LoginState';
import Constants from '../../constants/constants';
import Storage, { KEYS } from '../../utils/ClaroStorage';
const { API_ROOT } = Constants;

function* requestLogin({username, password}: {username: string, password: number}) {
  try {
    let body;
    body = {
        username, password
    };
   // const token = yield call(post, `/devices/add_command`, body);
    yield put(LoginActions.loginSuccess());
  } catch (e) {
    yield put(LoginActions.loginFailure(e));
  }
}

function* requestCheckId({username}: {username: string}) {
  try {
    let body;
    body = {
      username
    };
    // const token = yield call(post, `/devices/add_command`, body);
    yield put(LoginActions.checkIdSuccess());
  } catch (e) {
    yield put(LoginActions.checkIdFailure(e));
  }
}
function* requestClaroSignup({username, password,name, email,phoneNumber,postcode,roadAddr,jibunAddr,detailLocation}: {username: string, password: string, name: string, email: string, phoneNumber:string, poostcode:string, roadAddr:string, jibunAddr:string, detailLocation:string}) {
  try {
    let body;
    body = {
     username,password,email, phoneNumber, postcode, roadAddr, jibunAddr, detailLocation
    };
    // const token = yield call(post, `/devices/add_command`, body);
    yield put(LoginActions.claroSignupSuccess());
  } catch (e) {
    yield put(LoginActions.claroSignupFailure(e));
  }
}
function* requestNaverSignup({username, name, email,phoneNumber}: {username: string, name: string, email: string, phoneNumber:string}) {
  try {
    let body;
    body = {
      username,name, email, phoneNumber
    };
    // const token = yield call(post, `/devices/add_command`, body);
    yield put(LoginActions.naverSignupSuccess());
  } catch (e) {
    yield put(LoginActions.naverSignupFailure(e));
  }
}
export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(LoginTypes.CHECK_ID_REQUEST, requestCheckId),
  takeLatest(LoginTypes.CLARO_SIGNUP_REQUEST, requestClaroSignup),
  takeLatest(LoginTypes.NAVER_SIGNUP_REQUEST, requestNaverSignup)
];
