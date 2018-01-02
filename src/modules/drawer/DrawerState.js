// @flow
import {call, put, takeLatest} from 'redux-saga/effects';
import {WAIT_FOR_ACTION} from 'redux-wait-for-action';

import {setAuthenticationToken} from '../../utils/authentication';
import {post} from '../../utils/api';

// Initial state
const initialState = {
  loading: false,
};

// Actions
const LOGIN_REQUEST = 'DriverState/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'DriverState/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'DriverState/LOGIN_FAILURE';

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
  } catch (e) {
    yield put(loginFailure(e));
  }
}

// Reducer
export default function DriverStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };

    case LOGIN_FAILURE:
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
];
