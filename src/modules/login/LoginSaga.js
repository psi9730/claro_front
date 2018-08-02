import { call, put, takeLatest } from 'redux-saga/effects'
import {setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {LoginTypes, LoginActions} from './LoginState';
import FBSDK, {LoginManager, AccessToken, LoginButton,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
function* requestLogin({username, password}: {username: string, password: number}) {
  try {
    let body;
    body = {
        username, password,
      grantType: 'password',
    };
    const token = yield call(post, `/auth/token`, body);
    yield setAuthenticationToken(token);
    yield put(LoginActions.loginSuccess(token));
  } catch (e) {
    yield put(LoginActions.loginFailure(e));
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
function* requestUpdateUserProfile({phoneNumber,homeNumber, jibunAddr, roadAddr,detailLocation, postcode, email}: {phoneNumber:string,homeNumber:string,jibunAddr: string, roadAddr: string,detailLocation:string,postcode:string,email:string}) {
  try {
    let body;
    body = {phone_number:phoneNumber,home_number: homeNumber,jibun_addr:jibunAddr, road_addr: roadAddr,detail_location: detailLocation,postcode,email, };
    const token = yield call(post, `/users/me/update`, body);
    yield put(LoginActions.updateUserProfileSuccess(token));
  } catch (e) {
    yield put(LoginActions.updateUserProfileFailure(e));
  }
}
function* requestUpdatePassword({password, new_password}: {password:string, new_password:string}) {
  try {
    let body;
    body = {password,new_password};
    const token = yield call(post, `/users/me/update_password`, body);
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
function* requestCheckPassword({password}: {password:string}) {
  try {
    let body= {password};
    const token = yield call(post, `/users/me/check_password`,body);
    yield put(LoginActions.checkPasswordSuccess(token));
  } catch (e) {
    yield put(LoginActions.checkPasswordFailure(e));
  }
}
function* requestLogout() {
  try {
    const token = yield call(post, '/auth/logout',{});
    LoginManager.logOut();
    yield put(LoginActions.logoutSuccess(token));
  } catch (e) {
    yield put(LoginActions.logoutFailure(e));
  }
}
function* requestFacebookLogin({id,accessToken}: {id: string, accessToken: string}) {
  try {
    const body={
      fbid:id, fb_access_token:accessToken, grantType:'fb'
    };
    const token = yield call(post, '/auth/token',body);
    yield setAuthenticationToken(token);
    yield put(LoginActions.facebookLoginSuccess(token));
  } catch (e) {
    yield put(LoginActions.facebookLoginFailure(e));
  }
}

function* requestFacebookSignup({id, accessToken, name, email, phoneNumber, homeNumber, postcode, roadAddr, jibunAddr, detailLocation}: {id:string, accessToken: string, name: string, email: string, phoneNumber:string, homeNumber:string, postcode:string, roadAddr:string, jibunAddr:string, detailLocation:string}) {
  try {
    const body={
      fbid:id, fb_access_token: accessToken, name, email, phone_number:phoneNumber, home_number:homeNumber, postcode, road_addr: roadAddr, jibun_addr: jibunAddr, detail_location: detailLocation
    };
    const token = yield call(post, '/users',body);
    yield put(LoginActions.facebookSignupSuccess(token));
  } catch (e) {
    yield put(LoginActions.facebookSignupFailure(e));
  }
}

export const LoginSaga = [
  takeLatest(LoginTypes.FACEBOOK_SIGNUP_REQUEST, requestFacebookSignup),
  takeLatest(LoginTypes.FACEBOOK_LOGIN_REQUEST, requestFacebookLogin),
  takeLatest(LoginTypes.LOGOUT_REQUEST, requestLogout),
  takeLatest(LoginTypes.GET_LOCATION_REQUEST, requestGetLocation),
  takeLatest(LoginTypes.CHECK_PASSWORD_REQUEST, requestCheckPassword),
  takeLatest(LoginTypes.UPDATE_USER_PROFILE_REQUEST, requestUpdateUserProfile),
  takeLatest(LoginTypes.GET_USER_PROFILE_REQUEST, requestGetUserProfile),
  takeLatest(LoginTypes.UPDATE_PASSWORD_REQUEST, requestUpdatePassword),
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(LoginTypes.CLARO_SIGNUP_REQUEST, requestClaroSignup),
  takeLatest(LoginTypes.NAVER_SIGNUP_REQUEST, requestNaverSignup)
];
