/* @flow */

import { AsyncStorage } from 'react-native';

const namespace = 'Claro';

export const KEYS = {
  deviceInfo: 'deviceInfo',
  serialNumber: 'serialNumber',
  refreshToken: 'refreshToken',
  ssid: 'ssid',
  password: 'password',
  accessToken: 'accessToken',
  login: 'login',
  wifi: 'wifi',
  ap: 'ap',
  sterilizing: 'sterilizing',
  AI: 'AI',
  power: 'power',
  nickname: 'nickname',
  airCleaning: 'airCleaning',
  isTurnOnActive: 'isTurnOnActive',
  isTurnOffActive: 'isTurnOffActive',
  turnOnDay: 'turnOnDay',
  turnOnHour: 'turnOnHour',
  sleepMode:'sleepMode',
  serialNumberTemp: 'serialNumberTemp',
  nicknameTemp: 'nicknameTemp',
  deviceInfoTemp: 'deviceInfoTemp',
  turnOffHour: 'turnOffHour',
  isActivePush:'isActivePush',
};

const getItem = async (key: string) => {
  try {
    const savedValue = await AsyncStorage.getItem(`@${namespace}:${key}`);

    return JSON.parse(savedValue);
  } catch (e) {
    return null;
  }
};

const setItem = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(`@${namespace}:${key}`, JSON.stringify(value));
  } catch (e) {
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(`@${namespace}:${key}`);
  } catch (e) {
    return null;
  }
};

export default {
  getItem,
  setItem,
  removeItem,
};
