// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import {createActions} from 'reduxsauce';

import Storage from '../../utils/easi6Storage';
import {getAuthenticationToken, setAuthenticationToken} from '../../utils/authentication';
import {get, post} from '../../utils/api';
import {actionsGenerator} from '../../redux/reducerUtils';
import {deviceLocale} from '../../utils/i18n';

type DriverState = {
  loading: boolean,
  me: ?{
    name: string,
    nameEn: ?string,
    phone: string,
  }
}

// Initial state
const initialState = {
  loading: false,
  me: null,
};

// Action Creators

export const {Types: DriverTypes, Creators: DriverActions} = createActions(
  actionsGenerator({
    loginRequest: ['username', 'password'],
    fetchMeRequest: [],
    editProfileRequest: ['name', 'name_en', 'phone'],
    updateLocaleRequest: ['locale'],
  })
);

//sagas

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
    yield put(DriverActions.fetchMeRequest());
  } catch (e) {
    yield put(DriverActions.loginFailure(e));
  }
}

function* requestFetchMe() {
  try {
    const token = yield getAuthenticationToken();
    if (token && token.accessToken) {
      const me = yield call(get, '/driver/me');
      yield call(Storage.setItem, 'driverId', `${me.id}`);

      yield put(DriverActions.fetchMeSuccess(me));
      yield put(DriverActions.updateLocaleRequest(deviceLocale));
    } else {
      yield put(DriverActions.fetchMeFailure('fetch me fail'));
    }
  } catch (e) {
    yield put(DriverActions.fetchMeFailure(e));
  }
}

function* requestEditProfile({name, name_en, phone}: {name: string, name_en: string, phone: string}) {
  const body = {
    name,
    name_en,
    phone,
  };
  try {
    const me = yield call(post, '/driver/me/update', body);

    yield put(DriverActions.editProfileSuccess(me));
  } catch (e) {
    yield put(DriverActions.editProfileFailure(e));
  }
}

function* requestUpdateLocale({locale}: {locale: string}) {
  const body = {
    locale,
  };
  try {
    const me = yield call(post, '/driver/me/update', body);

    yield put(DriverActions.updateLocaleSuccess(me));
  } catch (e) {
    yield put(DriverActions.updateLocaleFailure(e));
  }
}

// Reducer
export default function DriverStateReducer(state: DriverState = initialState, action = {}): DriverState {
  switch (action.type) {
    case DriverTypes.LOGIN_REQUEST:
    case DriverTypes.FETCH_ME_REQUEST:
    case DriverTypes.EDIT_PROFILE_REQUEST:
    case DriverTypes.UPDATE_LOCALE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DriverTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DriverTypes.UPDATE_LOCALE_SUCCESS:
    case DriverTypes.EDIT_PROFILE_SUCCESS:
    case DriverTypes.FETCH_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.payload,
      };

    case DriverTypes.UPDATE_LOCALE_FAILURE:
    case DriverTypes.EDIT_PROFILE_FAILURE:
    case DriverTypes.LOGIN_FAILURE:
    case DriverTypes.FETCH_ME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export const LoginSaga = [
  takeLatest(DriverTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(DriverTypes.FETCH_ME_REQUEST, requestFetchMe),
  takeLatest(DriverTypes.EDIT_PROFILE_REQUEST, requestEditProfile),
  takeLatest(DriverTypes.UPDATE_LOCALE_REQUEST, requestUpdateLocale),
];
