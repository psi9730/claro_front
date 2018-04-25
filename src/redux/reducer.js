import {combineReducers} from 'redux';

import DriverStateReducer from '../modules/driver/DriverState';
import RentalsStateReducer from '../modules/rentals/RentalsState';
// ## Generator Reducer Imports
import RegisterDeviceReducer from '../modules/registerdevice/regitserDeviceState'

const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers
  registerDevice: RegisterDeviceReducer,
});

export default rootReducer;
