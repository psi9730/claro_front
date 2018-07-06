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
    naverSignupRequest: ['username', 'name', 'email','phoneNumber'],
    updateUserProfileRequest: ['phoneNumber','homeNumber','location','detailLocation','postcode','email'],
    getUserProfileRequest: [],
    updatePasswordRequest: ['password'],
    getLocationRequest: ['search']
  })
);

// Reducer
export default function LoginReducer(state: LoginState = initialState, action: Object = {}): LoginState {
  switch (action.type) {
    case LoginTypes.GET_LOCATION_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.GET_LOCATION_FAILURE:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        login: action.payload.login,
        phoneNumber: action.payload.phoneNumber,
        homeNumber: action.payload.homeNumber,
        email: action.payload.email,
        location: action.payload.location,
        postcode: action.payload.postcode,
        detailLocation: action.payload.detailLocation,
        loading:true,
      }
    case LoginTypes.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading:true,
        error: action.error,
      }
    case LoginTypes.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        login: action.payload.login,
        phoneNumber: action.payload.phoneNumber,
        homeNumber: action.payload.homeNumber,
        email: action.payload.email,
        location: action.payload.location,
        postcode: action.payload.postcode,
        detailLocation: action.payload.detailLocation,
        password: action.payload.password,
        loading:true,
      }
    case LoginTypes.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload.password,
        loading:true,
      }
    case LoginTypes.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading:true,
      }
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
      return state;
  }
}
