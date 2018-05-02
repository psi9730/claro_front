// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import {createActions} from 'reduxsauce';

import Storage from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';

type RemoteState = {
  loading: boolean,
  power: number,
  AI: number,
  sterilizing: number,
  airCleaning: number,
}

// Initial state
const initialState = {
  loading: false,
  power: 0,
  AI: 0,
  sterilizing: 0,
  airCleaning: 0,
};

// Action Creators

export const {Types: RemoteTypes, Creators: RemoteActions} = createActions(
  actionsGenerator({
    togglePower: ['payload'],
    toggleAI: ['payload'],
    toggleSterilizing: ['payload'],
    toggleAirCleaning: ['payload'],
  })
);

// Reducer
export default function RemoteReducer(state: RemoteState = initialState, action: Object = {}): RemoteState {
  switch (action.type) {
    case RemoteTypes.TOGGLE_POWER:             //send serial number
      return {
        ...state,
        power: action.payload,
      };
    case RemoteTypes.TOGGLE_A_I:
      return {
        ...state,
        AI: action.payload,
      };
    case RemoteTypes.TOGGLE_STERILIZING:
      return {
        ...state,
        sterilizing: action.payload,
      };
    case RemoteTypes.TOGGLE_AIR_CLEANING:
      return {
        ...state,
        airCleaning: action.payload,
      };
    default:
      console.log(state);
      return state;
  }
}
