// @flow

import {createActions} from 'reduxsauce';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';

type LoginState = {

}

// Initial state
const initialState = {

};

// Action Creators

export const {Types: LoginTypes, Creators: LoginActions} = createActions(
  actionsGenerator({
    loginRequest: ['username','password'],
    checkIdRequest: ['username'],
    claroSignupRequest: ['username', 'password','name', 'email','phoneNumber','postcode','roadAddr','jibunAddr','detailLocation'],
    naverSignupRequest: ['username', 'name', 'email','phoneNumber']
  })
);

// Reducer
export default function LoginReducer(state: LoginState = initialState, action: Object = {}): LoginState {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading:false,
      }
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.error,
      }
    case LoginTypes.CHECK_ID_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.CHECK_ID_SUCCESS:
      return {
        ...state,
        loading:false,
      }
    case LoginTypes.CHECK_ID_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.error,
      }
    case LoginTypes.CLARO_SIGNUP_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.CLARO_SIGNUP_SUCCESS:
      return {
        ...state,
        loading:false,
      }
    case LoginTypes.CLARO_SIGNUP_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.error,
      }
    case LoginTypes.NAVER_SIGNUP_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.NAVER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading:false,
      }
    case LoginTypes.NAVER_SIGNUP_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.error,
      }
    default:
      console.log(state);
      return state;
  }
}
