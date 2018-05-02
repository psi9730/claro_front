import {combineReducers} from 'redux';
// ## Generator Reducer Imports
import RegisterDeviceReducer from '../modules/registerdevice/RegisterDeviceState'
import RemoteReducer from '../modules/remote/remoteState'
const rootReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers
  registerDevice: RegisterDeviceReducer,
  remote: RemoteReducer,
});

export default rootReducer;
