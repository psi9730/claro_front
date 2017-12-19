// @flow

import {Map} from 'immutable';
import {loop, Cmd} from 'redux-loop';

import {post} from '../../utils/api';

// Initial state
const initialState = Map({
  loading: false,
});

// Actions
const LOGIN_REQUEST = 'LoginState/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LoginState/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LoginState/LOGIN_FAILURE';

// Action creators

export function loginRequest(login: string, password: string) {
  return {
    type: LOGIN_REQUEST,
    login,
    password,
  };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    err,
  }
}

function requestLogin(login: string, password: string) {
  const body = {
    login,
    password,
    grantType: 'password',
  };
  return post('/auth/driver_token', body);
}

// Reducer
export default function LoginStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return loop(
        state.set('loading', true),
        Cmd.run(requestLogin, {
          successActionCreator: loginSuccess,
          failActionCreator: loginFailure,
          args: [action.login, action.password]
        })
      );

    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('user', action.user);

    case LOGIN_FAILURE:
      return state
        .set('loading', false)
        .set('err', action.err);

    default:
      return state;
  }
}
