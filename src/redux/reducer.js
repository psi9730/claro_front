import {combineReducers} from 'redux';

import DriverStateReducer from '../modules/driver/DriverState';
import RentalsStateReducer from '../modules/rentals/RentalsState';
// ## Generator Reducer Imports

const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers

  driver: DriverStateReducer,

  rentals: RentalsStateReducer,
});

export default rootReducer;
