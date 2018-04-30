// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import {createActions} from 'reduxsauce';

import Storage from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';

type DeviceState = {
  loading: boolean,
  barcode: string,
  home: ?{
    ssid: string,
    ip: string,
    password: string,
  },
  deviceInfo: string,
}

// Initial state
const initialState = {
  loading: false,
  barcode: "",
  home: {
    ssid: "",
    ip: "",
    password: "",
  },
  deviceInfo: "",
};

// Action Creators

export const {Types: DeviceTypes, Creators: DeviceActions} = createActions(
  actionsGenerator({
    loginRequest: ['username', 'password'],
    restoreDevice: ['deviceInfo'],
    restoreSerialNumber: ['barcode'],
    sendSerialNumberRequest: ['barcode'],
    sendWifiInfoRequest: ['ssid','password'],
    sendAPRequest: [],
    updateBarcode: ['barcode'],
  })
);

// Reducer
export default function DeviceStateReducer(state: DeviceState = initialState, action: Object = {}): DeviceState {
  switch (action.type) {
    case DeviceTypes.SEND_SERIAL_NUMBER_REQUEST:             //send serial number
    case DeviceTypes.LOGIN_REQUEST:
    case DeviceTypes.SEND_AP_REQUEST:
    case DeviceTypes.SEND_WIFI_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DeviceTypes.UPDATE_BARCODE:
      return{
        ...state,
        barcode:action.barcode,
      }
    case DeviceTypes.SEND_SERIAL_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        deviceInfo: action.payload,
      }
    case DeviceTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DeviceTypes.RESTORE_DEVICE:
      return {
        ...state,
        loading:false,
        deviceInfo: action.deviceInfo,
      }
    case DeviceTypes.RESTORE_SERIAL_NUMBER:
      return {
        ...state,
        loading: false,
        barcode: action.barcode,
      };
    case DeviceTypes.SEND_AP_SUCCESS:
    case DeviceTypes.SEND_WIFI_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case DeviceTypes.SEND_AP_FAILURE:
    case DeviceTypes.SEND_WIFI_INFO_FAILURE:
    case DeviceTypes.LOGIN_FAILURE:
    case DeviceTypes.SEND_SERIAL_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
