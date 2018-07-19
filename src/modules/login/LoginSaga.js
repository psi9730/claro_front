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
        username, password,
      grantType: 'password',
    };
    const token = yield call(post, `/auth/token`, body);
    yield setAuthenticationToken(token);
    console.log("here");
    yield put(LoginActions.loginSuccess(token));
  } catch (e) {

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
function* requestClaroSignup({username, password,name, email,phoneNumber,homeNumber,postcode,roadAddr,jibunAddr,detailLocation}: {username: string, password: string, name: string, email: string, phoneNumber:string, homeNumber:string, postcode:string, roadAddr:string, jibunAddr:string, detailLocation:string}) {
  try {
    let body;
    body = {
     login:username,password,email,name, phone_number: phoneNumber, home_number: homeNumber, postcode, road_addr: roadAddr, jibun_addr: jibunAddr, detail_location: detailLocation
    };
    const token = yield call(post, `/users`, body);
    yield put(LoginActions.claroSignupSuccess(token));
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
function* requestUpdateUserProfile({phoneNumber,homeNumber,location,detailLocation,postcode,email}: {phoneNumber:string,homeNumber:string,location:string,detailLocation:string,postcode:string,email:string}) {
  try {
    let body;
    body = {phone_number:phoneNumber,home_number: homeNumber,location,detail_location: detailLocation,postcode,email};
    const token = yield call(post, `/users/me/update`, body);
    yield put(LoginActions.updateUserProfileSuccess(token));
  } catch (e) {
    yield put(LoginActions.updateUserProfileFailure(e));
  }
}
function* requestUpdatePassword({password}: {password:string}) {
  try {
    let body;
    body = {password};
    const token = yield call(post, `/users/password`, body);
    yield put(LoginActions.updatePasswordSuccess(token));
  } catch (e) {
    yield put(LoginActions.updatePasswordFailure(e));
  }
}
function* requestGetLocation({search}:{search: string}) {
  try {
    const token = yield call(get, `/users/location?search_location=${search}`);
    yield put(LoginActions.getLocationSuccess(token));
  } catch (e) {
    yield put(LoginActions.getLocationFailure(e));
  }
}
function* requestGetUserProfile() {
  try {
    const token = yield call(get, `/users/me`);
    yield put(LoginActions.getUserProfileSuccess(token));
  } catch (e) {
    yield put(LoginActions.getUserProfileFailure(e));
  }
}
export const LoginSaga = [
  takeLatest(LoginTypes.GET_LOCATION_REQUEST, requestGetLocation),
  takeLatest(LoginTypes.UPDATE_USER_PROFILE_REQUEST, requestUpdateUserProfile),
  takeLatest(LoginTypes.GET_USER_PROFILE_REQUEST, requestGetUserProfile),
  takeLatest(LoginTypes.UPDATE_PASSWORD_REQUEST, requestUpdatePassword),
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(LoginTypes.CHECK_ID_REQUEST, requestCheckId),
  takeLatest(LoginTypes.CLARO_SIGNUP_REQUEST, requestClaroSignup),
  takeLatest(LoginTypes.NAVER_SIGNUP_REQUEST, requestNaverSignup)
];
