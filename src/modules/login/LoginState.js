// @flow

import {createActions} from 'reduxsauce';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';

type LoginState = {

}

// Initial state
const initialState = {
  name:"",
  login:"",
  password:"",
  phoneNumber:"",
  homeNumber:"",
  email:"",
  location:"",
  roadAddr:"",
  jibunAddr:"",
  postcode:"",
  detailLocation:"",
};

// Action Creators

export const {Types: LoginTypes, Creators: LoginActions} = createActions(
  actionsGenerator({
    loginRequest: ['username','password'],
    checkIdRequest: ['username'],
    claroSignupRequest: ['username', 'password','name', 'email','phoneNumber','postcode','roadAddr','jibunAddr','detailLocation'],
    naverSignupRequest: ['username', 'name', 'email','phoneNumber'],
    updateUserProfileRequest: ['phoneNumber','homeNumber','jibunAddr','roadAddr','detailLocation','postcode','email'],
    getUserProfileRequest: [],
    updatePasswordRequest: ['password'],
    setLocation: ['rnAdres','lnmAdres','postcode'],
    getLocationRequest: ['search'],
    setLocationRequest: ['jibunAddr','roadAddr', 'postcode'],
  })
);

// Reducer
export default function LoginReducer(state: LoginState = initialState, action: Object = {}): LoginState {
  switch (action.type) {
    case LoginTypes.SET_LOCATION:
      return {
        ...state,
        jibunAddr: action.rnAdres,
        roadAddr: action.lnmAdres,
        postcode: action.postcode,
        loading:true,
      }
    case LoginTypes.GET_LOCATION_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case LoginTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        loading:true,
      }
    case LoginTypes.GET_LOCATION_FAILURE:
      return {
        ...state,
        error: action.error,
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
        jibunAddr: action.payload.jibunAddr,
        roadAddr: action.payload.roadAddr,
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
        jibunAddr: action.payload.jibunAddr,
        roadAddr: action.payload.roadAddr,
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
