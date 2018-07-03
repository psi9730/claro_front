// @flow

import {createActions} from 'reduxsauce';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';

type RemoteState = {
  filterMaxTime: number,
  filterUsingTime: number,
  loading: boolean,
  power: number,
  AI: number,
  sterilizing: number,
  airCleaning: number,
  url: string,
  devices: Array,
}

// Initial state
const initialState = {
  filterMaxTime: 1024,
  filterUsingTime: 600,
  loading: false,
  power: 0,
  AI: 0,
  sterilizing: 0,
  url: 'https://www.google.com/',
  airCleaning: 0,
  backgroundColor: 'steelblue',
  devices: [],
  date: new Date(),
  location: '금천구 가산동',
  isTurnOnActive: false,
  isTurnOffActive: false,
  turnOnDay: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  turnOnHour: new Date(),
  turnOffHour: 1,
  sleep: 0,
};

// Action Creators

export const {Types: RemoteTypes, Creators: RemoteActions} = createActions(
  actionsGenerator({
    getDeviceInfoRequest: ['username'],
    setDeviceInfoRequest: ['serial_number'],
    togglePowerRequest: ['power','serial_number'],
    toggleAIRequest: ['AI','serial_number'],
    toggleSterilizingRequest: ['sterilizing','serial_number'],
    toggleAirCleaningRequest: ['air','serial_number'],
    toggleSleepRequest: ['sleep','serial_number'],
    filterTimeReset:[],
    setTurnOnDay: ['date'],
    setTurnOnHour: ['hour'],
    setTurnOffHour: ['hour'],
    setTurnOffTimer: ['isActive'],
    setTurnOnTimer: ['isActive'],
  })
);

// Reducer
export default function RemoteReducer(state: RemoteState = initialState, action: Object = {}): RemoteState {
  switch (action.type) {
    case RemoteTypes.SET_TURN_ON_DAY:
      (async() => {
        await Storage.setItem(KEYS.turnOnDay, action.date);
      })();

      return {
        ...state,
        turnOnDay: action.date,
  }
    case RemoteTypes.SET_TURN_ON_HOUR:
      (async() => {
        console.log(action.hour,'checkhour');
        await Storage.setItem(KEYS.turnOnHour, action.hour);
      })();
      return {
        ...state,
        turnOnHour: action.hour,
      }
    case RemoteTypes.SET_TURN_OFF_HOUR:
      (async() => {
        await Storage.setItem(KEYS.turnOffHour, action.hour);
      })();
      return {
        ...state,
        turnOffHour: action.hour,
      }
    case RemoteTypes.SET_TURN_OFF_TIMER:
      (async() => {
        await Storage.setItem(KEYS.isTurnOffActive, action.isActive);
      })();
      return {
        ...state,
        isTurnOffActive: action.isActive,
      }
    case RemoteTypes.SET_TURN_ON_TIMER:
      (async() => {
        await Storage.setItem(KEYS.isTurnOnActive, action.isActive);
      })();
      return {
        ...state,
        isTurnOnActive: action.isActive,
      }
    case RemoteTypes.TOGGLE_POWER_REQUEST:
    case RemoteTypes.TOGGLE_SLEEP_REQUEST:
    case RemoteTypes.GET_DEVICE_INFO_REQUEST:
    case RemoteTypes.SET_DEVICE_INFO_REQUEST:
    case RemoteTypes.TOGGLE_STERILIZING_REQUEST:
    case RemoteTypes.TOGGLE_A_I_REQUEST:
    case RemoteTypes.TOGGLE_AIR_CLEANING_REQUEST://send serial number
      return {
        ...state,
        loading:true,
      }
    case RemoteTypes.GET_DEVICE_INFO_SUCCESS:
      return{
        ...state,
        devices: action.payload,
      }
    case RemoteTypes.TOGGLE_SLEEP_SUCCESS:
      (async() => {
          await Storage.setItem(KEYS.sleep,action.payload);
          console.log(action.payload,'sleep');
      })();
      return{
        ...state,
        sleep: action.payload,
      };
    case RemoteTypes.SET_DEVICE_INFO_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.serialNumber,action.payload.serialNumber);
        await Storage.setItem(KEYS.power, action.payload.power);
        if(action.payload.mode===0) {
          await Storage.setItem(KEYS.AI,0);
          await Storage.setItem(KEYS.sterilizing,0);
          await Storage.setItem(KEYS.airCleaning,0);
          return {
            ...state,
            AI: 0,
            power: action.payload.power,
            sterilizing: 0,
            airCleaning: 0,
            loading: false,
          }
        } else if(action.payload.mode===1) {
          await Storage.setItem(KEYS.AI,1);
          await Storage.setItem(KEYS.sterilizing,0);
          await Storage.setItem(KEYS.airCleaning,0);
          return {
            ...state,
            AI: 0,
            power: action.payload.power,
            sterilizing: 0,
            airCleaning: 0,
            loading: false,
          }
        }else if(action.payload.mode===2) {
          await Storage.setItem(KEYS.AI,0);
          await Storage.setItem(KEYS.sterilizing,1);
          await Storage.setItem(KEYS.airCleaning,0);
          return {
            ...state,
            power: action.payload.power,
            AI: 0,
            sterilizing: 1,
            airCleaning: 0,
            loading: false,
          }

        }else if(action.payload.mode===3) {
          await Storage.setItem(KEYS.AI,0);
          await Storage.setItem(KEYS.sterilizing,2);
          await Storage.setItem(KEYS.airCleaning,0);
          return {
            ...state,
            AI: 0,
            power: action.payload.power,
            sterilizing: 2,
            airCleaning: 0,
            loading: false,
          }
        }else if(action.payload.mode===4) {
          await Storage.setItem(KEYS.AI,0);
          await Storage.setItem(KEYS.sterilizing,0);
          await Storage.setItem(KEYS.airCleaning,1);
          return {
            ...state,
            AI: 0,
            sterilizing: 0,
            power: action.payload.power,
            airCleaning: 1,
            loading: false,
          }
        }else {
          await Storage.setItem(KEYS.AI,0);
          await Storage.setItem(KEYS.sterilizing,0);
          await Storage.setItem(KEYS.airCleaning,2);
          return {
            ...state,
            AI: 0,
            sterilizing: 0,
            power: action.payload.power,
            airCleaning: 2,
            loading: false,
          }
        }
      })();
      return{
        ...state,
        loading:false,
      }
    case RemoteTypes.FILTER_TIME_RESET:
      return {
        ...state,
        filterUsingTime: 0,
        loading:true,
      };

    case RemoteTypes.TOGGLE_POWER_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.power, action.payload);
      })();
            return {
              ...state,
              power: action.payload,
              loading:false,
      };
    case RemoteTypes.TOGGLE_A_I_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.AI, action.payload);
      })();
      return {
        ...state,
        AI: action.payload,
        loading:false,
      };
    case RemoteTypes.TOGGLE_STERILIZING_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.sterilizing, action.payload);
      })();
      return {
        ...state,
        sterilizing: action.payload,
        loading:false,
      };
    case RemoteTypes.TOGGLE_AIR_CLEANING_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.airCleaning, action.payload);
      })();
      return {
        ...state,
        airCleaning: action.payload,
        loading:false,
      };
    case RemoteTypes.TOGGLE_SLEEP_FAILURE:
    case RemoteTypes.TOGGLE_POWER_FAILURE:
    case RemoteTypes.TOGGLE_A_I_FAILURE:
    case RemoteTypes.TOGGLE_STERILIZING_FAILURE:
    case RemoteTypes.TOGGLE_AIR_CLEANING_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.error,
      }
    default:
      return state;
  }
}
