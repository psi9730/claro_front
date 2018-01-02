import {combineReducers} from 'redux';

import SessionStateReducer from '../modules/session/SessionState';
import DriverStateReducer from '../modules/driver/DriverState';
import RentalsStateReducer from '../modules/rentals/RentalsState';
// ## Generator Reducer Imports

const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers

  driver: DriverStateReducer,

  rentals: RentalsStateReducer,

  // Navigator states

  session: SessionStateReducer,
});

export default rootReducer;
