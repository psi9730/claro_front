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
  })
);

// Reducer
export default function LoginReducer(state: LoginState = initialState, action: Object = {}): LoginState {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
    case LoginTypes.LOGIN_SUCCESS:
    case LoginTypes.LOGIN_FAILURE:
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
