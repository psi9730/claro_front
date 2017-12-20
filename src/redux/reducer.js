import {combineReducers} from 'redux';

import SessionStateReducer from '../modules/session/SessionState';
import LoginStateReducer from '../modules/login/LoginState';
// ## Generator Reducer Imports

const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers

  login: LoginStateReducer,

  // Navigator states

  session: SessionStateReducer
});

export default rootReducer;
