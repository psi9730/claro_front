// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import {createActions} from 'reduxsauce';

import Storage, {KEYS} from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';
type RemoteTypes = {
  TOGGLE_POWER_REQUEST: any,
  TOGGLE_STERILIZING_REQUEST: any,
  TOGGLE_A_I_REQUEST: any,
  TOGGLE_AIR_CLEANING_REQUEST: any,
}
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
    togglePowerRequest: ['power'],
    toggleAIRequest: ['AI'],
    toggleSterilizingRequest: ['sterilizing'],
    toggleAirCleaningRequest: ['air'],
  })
);

// Reducer
export default function RemoteReducer(state: RemoteState = initialState, action: Object = {}): RemoteState {
  switch (action.type) {
    case RemoteTypes.TOGGLE_POWER_REQUEST:
    case RemoteTypes.TOGGLE_STERILIZING_REQUEST:
    case RemoteTypes.TOGGLE_A_I_REQUEST:
    case RemoteTypes.TOGGLE_AIR_CLEANING_REQUEST://send serial number
      return {
        ...state,
        loading: true,
      }

    case RemoteTypes.TOGGLE_POWER_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.power, action.power);
      })();
            return {
              ...state,
              power: action.power,
              loading:false,
      };
    case RemoteTypes.TOGGLE_A_I_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.AI, action.AI);
      })();
      return {
        ...state,
        AI: action.AI,
        loading:false,
      };
    case RemoteTypes.TOGGLE_STERILIZING_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.sterilizing, action.sterilizing);
      })();
      return {
        ...state,
        sterilizing: action.sterilizing,
        loading:false,
      };
    case RemoteTypes.TOGGLE_AIR_CLEANING_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.airCleaning, action.air);
      })();
      return {
        ...state,
        airCleaning: action.air,
        loading:false,
      };
    case RemoteTypes.TOGGLE_POWER_FAILURE:
    case RemoteTypes.TOGGLE_A_I_FAILURE:
    case RemoteTypes.TOGGLE_STERILIZING_FAILURE:
    case RemoteTypes.TOGGLE_AIR_CLEANING_FAILURE:
      return {
        ...state,
        loading:false,
      }
    default:
      console.log(state);
      return state;
  }
}
