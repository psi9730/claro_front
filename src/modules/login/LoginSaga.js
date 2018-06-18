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
    yield put(LoginActions.loginRequestSuccess());
  } catch (e) {
    yield put(LoginActions.loginRequestFailure(e));
  }
}
export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
];
