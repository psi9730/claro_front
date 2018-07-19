// @flow
import {createActions} from 'reduxsauce';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {actionsGenerator} from '../../redux/reducerUtils';
import _ from 'lodash';
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
  nickname: "",
  home: {
    ssid: "",
    ip: "",
    password: "",
    ssidTemp: "",
    ipTemp: "",
    passwordTemp: "",
  },
  deviceInfo: "",
  isActivePush: true,
  isChangeDevice: false,
};

// Action Creators

export const {Types: DeviceTypes, Creators: DeviceActions} = createActions(
  actionsGenerator({
    tcpRequestSuccess: ['payload'],
    isActiveRequest: ['isActive'],
    tcpRequestFailure: ['error'],
    registerDeviceRequest: ['barcode','nickname','deviceInfo'],
    updateDeviceRequest: ['barcode','nickname'],
    updateDeviceTemp: ['barcode','nickname','deviceInfo'],
    restoreDevice: ['deviceInfo'],
    restoreDeviceInfo: ['barcode','nickname','deviceInfo'],
    restoreSerialNumber: ['barcode'],
    restoreWifiInfo: ['ssid','password'],
    sendSerialNumberRequest: ['barcode'],
    sendWifiInfoRequest: ['ssid','password'],
    sendApRequest: [],
    getDevicesRequest:[],
    deleteDeviceRequest:['serialNumber'],
    updateNicknameTemp: ['nickname'],
    updateWifiSsid:['ssid'],
    updateWifiPassword:['password'],
    updateWifiSsidTemp:['ssid'],
    updateWifiPasswordTemp:['password'],
    updateBarcode: ['barcode'],
    updateNickname: ['nickname'],
  })
);

// Reducer
export default function DeviceStateReducer(state: DeviceState = initialState, action: Object = {}): DeviceState {
  switch (action.type) {
    case DeviceTypes.SEND_SERIAL_NUMBER_REQUEST:             //send serial number
    case DeviceTypes.SEND_AP_REQUEST:
    case DeviceTypes.GET_DEVICES_REQEUST:
    case DeviceTypes.IS_ACTIVE_REQUEST:
    case DeviceTypes.SEND_WIFI_INFO_REQUEST:
    case DeviceTypes.REGISTER_DEVICE_REQUEST:
    case DeviceTypes.UPDATE_DEVICE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DeviceTypes.GET_DEVICES_SUCCESS:
      if(action.payload.isFulfilled!==false){
      const first_devices =  _.forEach(action.payload.devices, (value)=> _.update(value, 'deviceInfo', (device_info) => { return JSON.parse(device_info)}))
      const devices =  _.forEach(first_devices, (value)=> _.update(value, 'status', (status) => { return JSON.parse(status)}))
      console.log(devices,'devices');
      return{
        ...state,
        devices: devices
      }}
      else return{
        ...state,
        loading: false
      }
    case DeviceTypes.IS_ACTIVE_SUCCESS:
      (async() => {
        await Storage.setItem(KEYS.isActivePush,action.payload);
      })();
      return {
        ...state,
        isActivePush: action.payload
      };
    case DeviceTypes.UPDATE_DEVICE_SUCCESS:
      return {
        ...state,
        nickname: action.payload,
        loading: false,
      };
    case DeviceTypes.UPDATE_NICKNAME_TEMP:
      return {
        ...state,
        nicknameTemp: action.nickname,
        loading: false,
      };
    case DeviceTypes.UPDATE_DEVICE_TEMP:
      return {
        ...state,
        barcodeTemp: action.barcode,
        nicknameTemp: action.nickname,
        deviceInfoTemp: action.deviceInfo,
        loading: false,
      };
    case DeviceTypes.RESTORE_DEVICE_INFO:
      return {
        ...state,
        barcode: action.barcode,
        nickname: action.nickname,
        deviceInfo: action.deviceInfo,
        loading: false,
      };
    case DeviceTypes.DELETE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DeviceTypes.UPDATE_DEVICE_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case DeviceTypes.UPDATE_NICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      }
    case DeviceTypes.RESTORE_WIFI_INFO:
      return {
        ...state,
        home: {
          ssid: action.ssid,
          password: action.password
        },
      };
    case DeviceTypes.UPDATE_WIFI_SSID:
        return {
          ...state,
          home: {
            ...state.home,
            ssid: action.ssid
          },
        };
    case DeviceTypes.UPDATE_WIFI_PASSWORD:
      return {
        ...state,
        home:{
          ...state.home,
          password: action.password
        },
      };
    case DeviceTypes.UPDATE_WIFI_SSID_TEMP:
      return {
        ...state,
        home: {
          ...state.home,
          ssidTemp: action.ssid
        },
      };
    case DeviceTypes.UPDATE_WIFI_PASSWORD_TEMP:
      return {
        ...state,
        home:{
          ...state.home,
          passwordTemp: action.password
        },
      };
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

    case DeviceTypes.RESTORE_DEVICE:
      return {
        ...state,
        loading:false,
        deviceInfo: action.deviceInfo,
      };
    case DeviceTypes.RESTORE_SERIAL_NUMBER:
      return {
        ...state,
        loading: false,
        barcode: action.barcode,
      };
    case DeviceTypes.TCP_REQUEST_FAILURE:
      return {
        ...state,
      };
    case DeviceTypes.TCP_REQUEST_SUCCESS:
      return {
        ...state,
      };
    case DeviceTypes.GET_CONTROL_DEVICE_SUCCESS:
      return {

      }
    case DeviceTypes.SEND_AP_SUCCESS:
    case DeviceTypes.SEND_WIFI_INFO_SUCCESS:
    case DeviceTypes.REGISTER_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DeviceTypes.SET_CONTROL_DEVICE2_FAILURE:
    case DeviceTypes.SET_CONTROL_DEVICE_FAILURE:
    case DeviceTypes.GET_CONTROL_DEVICE_FAILURE:
    case DeviceTypes.DELETE_DEVICE_FAILURE:
    case DeviceTypes.SEND_AP_FAILURE:
    case DeviceTypes.GET_DEVICES_FAILURE:
    case DeviceTypes.IS_ACTIVE_FAILURE:
    case DeviceTypes.SEND_WIFI_INFO_FAILURE:
    case DeviceTypes.SEND_SERIAL_NUMBER_FAILURE:
    case DeviceTypes.REGISTER_DEVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
