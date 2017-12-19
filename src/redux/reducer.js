import {fromJS} from 'immutable';
import {combineReducers, loop} from 'redux-loop';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';
import LoginStateReducer from '../modules/login/LoginState';
// ## Generator Reducer Imports

const namespacedReducer = combineReducers({
  // Counter sample app state. This can be removed in a live application
  // rentals: RentalStateReducer,
  // ## Generator Reducers

  login: LoginStateReducer,

  // Navigator states

  session: SessionStateReducer
});

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
