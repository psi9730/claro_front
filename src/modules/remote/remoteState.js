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
  filterUsingTime: 0,
  loading: false,
  power: 0,
  AI: 0,
  sterilizing: 0,
  url: 'https://www.google.com/',
  airCleaning: 0,
  backgroundColor: '#4c669f',
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
  turnOffHour: new Date(),
  sleepMode: 0,
  outerTotalGrade: 1,
  outerNo2Value : 0,
  outerO3Value : 0,
  outerPm10Value: 0,
  outerPm25Value : 0,
  outerCoValue: 0,
  outerSo2Value : 0,
  indoorAirGrade: '보통',
  Background : ['rgba(0, 176, 177, 1)', 'rgba(59, 185, 146, 1)'],
  StatusBackground : 'rgba(0,176, 177,1)',
  indoorPm10: '보통',
  indoorPm25: '보통',
  indoorVoc: '오염',
  indoorPm10Color: 'rgba(0, 176, 177, 1)',
  indoorVocColor: 'rgba(0, 176, 177, 1)',
  indoorPm25Color: 'rgba(0, 176, 177, 1)',
  pm10: 0,
  pm25: 0,
  vocs: 0,
};

// Action Creators

export const {Types: RemoteTypes, Creators: RemoteActions} = createActions(
  actionsGenerator({
    getDeviceInfoRequest: [],
    getOuterRequest: ['serialNumber','jibunAddr'],
    setDeviceInfoRequest: ['serial_number'],
    togglePowerRequest: ['power','serial_number'],
    toggleAIRequest: ['AI','serial_number'],
    toggleSterilizingRequest: ['sterilizing','serial_number'],
    toggleAirCleaningRequest: ['air','serial_number'],
    toggleSleepRequest: ['sleep','serial_number'],
    filterTimeResetRequest:['time','serialNumber'],
    setTurnOnDay: ['date'],
    setTurnOnHour: ['hour'],
    setTurnOffHour: ['hour'],
    setTurnOffTimer: ['isActive'],
    setTurnOnTimer: ['isActive'],
    getControlDeviceRequest: ['serialNumber'],
    setControlDevice2Request: ['serialNumber', 'power','sterilizing','airCleaning','AI','sleepMode','isTurnOnActive','isTurnOffActive','turnOnDay','turnOffHour','turnOnHour'],
    setTurnOnRequest: ['serialNumber','turnOnDay','turnOnHour','isTurnOnActive'],
    setTurnOffRequest: ['serialNumber','turnOffHour','isTurnOffActive']
  })
);

// Reducer
export default function RemoteReducer(state: RemoteState = initialState, action: Object = {}): RemoteState {
  switch (action.type) {
    case RemoteTypes.GET_OUTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RemoteTypes.GET_OUTER_SUCCESS:
      if(action.payload !== null && action.payload)
      return {
        ...state,
        outerTotalGrade: action.payload.khaiGrade,
        outerNo2Value : action.payload.no2Value,
        outerO3Value : action.payload.o3Value,
        outerPm10Value: action.payload.pm10Value,
        outerPm25Value : action.payload.pm25Value,
        outerSo2Value : action.payload.so2Value,
        outerCoValue : action.payload.coValue,
        loading: false,
      };
      else return {
        ...state,
        loading:false,
      }
    case RemoteTypes.GET_OUTER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case RemoteTypes.FILTER_TIME_RESET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RemoteTypes.FILTER_TIME_RESET_SUCCESS:
      return {
        ...state,
        filterUsingTime: action.payload.filterSum,
        loading: true,
      };
    case RemoteTypes.FILTER_TIME_RESET_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: true,
      };
    case RemoteTypes.SET_TURN_ON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RemoteTypes.SET_TURN_ON_SUCCESS:
      return {
        ...state,
        isTurnOnActive: action.payload.isActive,
        turnOnDay: JSON.parse(action.payload.turnOnDay),
        turnOnHour: new Date(action.payload.turnOnDate),
        loading: false,
      };
    case RemoteTypes.SET_TURN_ON_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case RemoteTypes.SET_TURN_OFF_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RemoteTypes.SET_TURN_OFF_SUCCESS:
      const status2 = action.payload;
      let turnOffHourDate2 = new Date(status2.turnOffDate);
      let now2 = new Date();
      let diff2 = Math.ceil((turnOffHourDate2.getTime()-now2)/(1000*60*60));
      return {
        ...state,
        isTurnOffActive: action.payload.isActive,
        turnOffHour: diff2,
        loading: false,
      };
    case RemoteTypes.SET_TURN_OFF_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case RemoteTypes.SET_TURN_ON_DAY:
      return {
        ...state,
        turnOnDay: action.date,
      };
    case RemoteTypes.SET_TURN_ON_HOUR:
      return {
        ...state,
        turnOnHour: action.hour,
      };
    case RemoteTypes.SET_TURN_OFF_HOUR:
      return {
        ...state,
        turnOffHour: action.hour,
      };
    case RemoteTypes.SET_TURN_OFF_TIMER:
      return {
        ...state,
        isTurnOffActive: action.isActive,
      };
    case RemoteTypes.SET_TURN_ON_TIMER:
      return {
        ...state,
        isTurnOnActive: action.isActive,
      };
    case RemoteTypes.TOGGLE_POWER_REQUEST:
    case RemoteTypes.TOGGLE_SLEEP_REQUEST:
    case RemoteTypes.GET_DEVICE_INFO_REQUEST:
    case RemoteTypes.SET_DEVICE_INFO_REQUEST:
    case RemoteTypes.TOGGLE_STERILIZING_REQUEST:
    case RemoteTypes.TOGGLE_A_I_REQUEST:
    case RemoteTypes.SET_CONTROL_DEVICE_REQUEST:
    case RemoteTypes.SET_CONTROL_DEVICE2_REQUEST:
    case RemoteTypes.GET_CONTROL_DEVICE_REQUEST:
    case RemoteTypes.TOGGLE_AIR_CLEANING_REQUEST://send serial number
      return {
        ...state,
        loading:true,
      }
    case RemoteTypes.GET_DEVICE_INFO_SUCCESS:
      return{
        ...state,
        filterUsingTime: 0,
        devices: action.payload,
      }
    case RemoteTypes.TOGGLE_SLEEP_SUCCESS:
      return{
        ...state,
        sleepMode: action.payload,
      };
    case RemoteTypes.SET_DEVICE_INFO_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.serialNumber,action.payload.serialNumber);
        if(action.payload.mode===0) {
          return {
            ...state,
            AI: 0,
            power: action.payload.power,
            sterilizing: 0,
            airCleaning: 0,
            loading: false,
          }
        } else if(action.payload.mode===1) {
          return {
            ...state,
            AI: 0,
            power: action.payload.power,
            sterilizing: 0,
            airCleaning: 0,
            loading: false,
          }
        }else if(action.payload.mode===2) {
          return {
            ...state,
            power: action.payload.power,
            AI: 0,
            sterilizing: 1,
            airCleaning: 0,
            loading: false,
          }

        }else if(action.payload.mode===3) {
          return {
            ...state,
            AI: 0,
            power: action.payload.power,
            sterilizing: 2,
            airCleaning: 0,
            loading: false,
          }
        }else if(action.payload.mode===4) {
          return {
            ...state,
            AI: 0,
            sterilizing: 0,
            power: action.payload.power,
            airCleaning: 1,
            loading: false,
          }
        }else {
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
    case RemoteTypes.SET_CONTROL_DEVICE2_SUCCESS:
      return {
        ...state,
        barcode: action.payload.serialNumber,
        power: action.payload.power,
        sterilizing: action.payload.sterilizing,
        airCleaning: action.payload.airCleaning,
        AI: action.payload.AI,
        isTurnOnActive: action.payload.isTurnOnActive,
        isTurnOffActive: action.payload.isTurnOffActive,
        turnOnDay: action.payload.turnOnDay,
        turnOffHour: action.payload.turnOffHour,
        turnOnHour: action.payload.turnOnHour,
        sleepMode: action.payload.sleepMode,
        filterSum: 0,
        loading: false,
      };

    case RemoteTypes.SET_CONTROL_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RemoteTypes.GET_CONTROL_DEVICE_SUCCESS:
          const status = action.payload;
          let turnOffHourDate = new Date(status.turnOffDate);
          let now = new Date();
          let diff = Math.ceil((turnOffHourDate.getTime()-now)/(1000*60*60));
          const VeryGoodBackground = ['rgba(0,162,230,1)','rgba(51, 143, 252, 1)'];
          const StatusVeryGoodBackground = 'rgba(0,162,230,1)';
          const BadBackground = ['rgba(255,180,41,1)','rgba(255, 207, 0, 1)'];
          const StatusBadBackground = 'rgba(255,180,41,1)';
          const VeryBadBackground = ['rgba(255, 105, 124,1)','rgba(255, 73, 96, 1)'];
          const StatusVeryBadBackground = 'rgba(255,105,124,1)';
          const NormalBackground = ['rgba(0, 176, 177, 1)', 'rgba(59, 185, 146, 1)'];
          const StatusNormalBackground = 'rgba(0,176, 177,1)';
          const indoorAirGrade = status.pm10>5 || status.pm25>5 || status.vocs>5 ? '나쁨' : '보통';
          const indoorPm10 = status.pm10>10 ? '매우나쁨': (status.pm10>5? '나쁨' : (status.pm>2 ? '보통' : '좋음'));
          const indoorPm10Color = status.pm10>10 ? StatusVeryBadBackground : (status.pm10>5? StatusBadBackground : (status.pm10>2 ? StatusNormalBackground : StatusVeryGoodBackground));
          const indoorPm25 = status.pm25>10 ? '매우나쁨': (status.pm25>5? '나쁨' : (status.pm25>2 ? '보통' : '좋음'));
          const indoorPm25Color = status.pm25>10 ? StatusVeryBadBackground : (status.pm25>5? StatusBadBackground : (status.pm25>2 ? StatusNormalBackground : StatusVeryGoodBackground));
          const indoorVoc = status.vocs>10 ? '매우나쁨': (status.vocs>5? '나쁨' : (status.vocs>2 ? '보통' : '좋음'));
          const indoorVocColor = status.vocs>10 ? StatusVeryBadBackground : (status.vocs>5? StatusBadBackground : (status.vocs>2 ? StatusNormalBackground : StatusVeryGoodBackground));
          let StatusBackground = "";
          let Background = "";
          if(indoorAirGrade === '매우나쁨')
          {
            StatusBackground = StatusVeryBadBackground;
            Background = VeryBadBackground;
          } else if(indoorAirGrade === '나쁨')
          {
            StatusBackground = StatusBadBackground;
            Background = BadBackground;
          } else if(indoorAirGrade === '좋음')
          {
            StatusBackground = StatusVeryGoodBackground;
            Background = VeryGoodBackground;
          } else if(indoorAirGrade === '보통')
          {
            StatusBackground = StatusNormalBackground;
            Background = NormalBackground;
          }

      return {
          ...state,
          indoorAirGrade,
          StatusBackground,
          Background,
          indoorPm10,
          indoorPm25,
          indoorVoc,
          barcode: status.serial_number,
          power: status.power,
          sterilizing: status.sterilizing,
          airCleaning: status.airCleaning,
          AI: status.aI,
          sleepMode: status.sleepMode,
          isTurnOnActive: status.isTurnOnActive,
          isTurnOffActive: status.isTurnOffActive,
          turnOnDay: JSON.parse(status.turnOnDay),
          turnOffHour: diff,
          filterUsingTime: status.filterSum,
          turnOnHour: new Date(status.turnOnDate),
          loading: false,
          pm10: status.pm10 ? status.pm10 : 0,
          pm25: status.pm25 ? status.pm25 : 0,
          voc: status.voc,
          indoorPm10Color,
          indoorPm25Color,
          indoorVocColor,
        };
    case RemoteTypes.FILTER_TIME_RESET:
      return {
        ...state,
        filterUsingTime: 0,
        loading:true,
      };

    case RemoteTypes.TOGGLE_POWER_SUCCESS:
      return {
        ...state,
        power: action.payload,
        loading:false,
      };
    case RemoteTypes.TOGGLE_A_I_SUCCESS:
      return {
        ...state,
        AI: action.payload,
        loading:false,
      };
    case RemoteTypes.TOGGLE_STERILIZING_SUCCESS:
      return {
        ...state,
        sterilizing: action.payload,
        loading:false,
      };
    case RemoteTypes.TOGGLE_AIR_CLEANING_SUCCESS:
      return {
        ...state,
        airCleaning: action.payload,
        loading:false,
      };
    case RemoteTypes.GET_CONTROL_DEVICE_FAILURE:
    case RemoteTypes.SET_CONTROL_DEVICE2_FAILURE:
    case RemoteTypes.SET_CONTROL_DEVICE_FAILURE:
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
