// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import {WAIT_FOR_ACTION} from 'redux-wait-for-action';

import Storage from '../../utils/easi6Storage';
import {getAuthenticationToken, setAuthenticationToken} from '../../utils/authentication';
import {post, get} from '../../utils/api';

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

// Actions
const LOGIN_REQUEST = 'DriverState/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'DriverState/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'DriverState/LOGIN_FAILURE';

const FETCH_ME_REQUEST = 'DriverState/FETCH_ME_REQUEST';
const FETCH_ME_SUCCESS = 'DriverState/FETCH_ME_SUCCESS';
const FETCH_ME_FAILURE = 'DriverState/FETCH_ME_FAILURE';

// Action creators

export function loginRequest(username: string, password: string) {
  return {
    type: LOGIN_REQUEST,
    [WAIT_FOR_ACTION]: LOGIN_SUCCESS,
    username,
    password,
  };
}

function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    err,
  };
}

function* requestLogin({username, password}: {username: string, password: string}) {
  const body = {
    username,
    password,
    grantType: 'password',
  };

  try {
    const token = yield call(post, '/auth/driver_token', body);

    yield setAuthenticationToken(token);

    yield put(loginSuccess(token));
    yield put(fetchMeRequest());
  } catch (e) {
    yield put(loginFailure(e));
  }
}

export function fetchMeRequest() {
  return {
    type: FETCH_ME_REQUEST,
  };
}

function fetchMeSuccess(me) {
  return {
    type: FETCH_ME_SUCCESS,
    me,
  };
}

function fetchMeFailure(err) {
  return {
    type: FETCH_ME_FAILURE,
    err,
  };
}

function* requestFetchMe() {
  try {
    const token = yield getAuthenticationToken();
    if (token && token.accessToken) {
      const me = yield call(get, '/driver/me');
      yield call(Storage.setItem, 'driverId', `${me.id}`);

      yield put(fetchMeSuccess(me));
    } else {
      yield put(fetchMeFailure(null));
    }
  } catch (e) {
    yield put(fetchMeFailure(e));
  }
}

// Reducer
export default function DriverStateReducer(state: DriverState = initialState, action = {}): DriverState {
  switch (action.type) {
    case LOGIN_REQUEST:
    case FETCH_ME_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
    case FETCH_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.me,
      };

    case LOGIN_FAILURE:
    case FETCH_ME_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.err,
      };

    default:
      return state;
  }
}

export const LoginSaga = [
  takeLatest(LOGIN_REQUEST, requestLogin),
  takeLatest(FETCH_ME_REQUEST, requestFetchMe),
];
