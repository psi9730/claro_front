import {combineReducers} from 'redux';
// ## Generator Reducer Imports
import RegisterDeviceReducer from '../modules/registerdevice/RegisterDeviceState'

const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers
  registerDevice: RegisterDeviceReducer,
});

export default rootReducer;
