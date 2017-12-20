import {combineReducers} from 'redux';

import SessionStateReducer from '../modules/session/SessionState';
import LoginStateReducer from '../modules/login/LoginState';
import RentalsStateReducer from '../modules/rentals/RentalsState';
// ## Generator Reducer Imports

const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers

  login: LoginStateReducer,

  rentals: RentalsStateReducer,

  // Navigator states

  session: SessionStateReducer,
});

export default rootReducer;
