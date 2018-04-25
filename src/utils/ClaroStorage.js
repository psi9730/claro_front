/* @flow */

import { AsyncStorage } from 'react-native';

import createLogger, { LEVEL } from './ClaroLogger';

const logger = createLogger(LEVEL.VERBOSE);
const namespace = 'Claro';

export const KEYS = {
  deviceInfo: 'deviceInfo',
  serialNumber: 'serialNumber',
  refreshToken: 'refreshToken',
  accessToken: 'accessToken',
  login: 'login',
  wifi: 'wifi',
  ap: 'ap',
};

const getItem = async (key: string) => {
  try {
    const savedValue = await AsyncStorage.getItem(`@${namespace}:${key}`);
    logger.log('getItem ', key, ': ', savedValue);
    return JSON.parse(savedValue);
  } catch (e) {
    logger.warn(e);
    return null;
  }
};

const setItem = async (key: string, value: any) => {
  try {
    logger.log('setItem ', key, ': ', value);
    return await AsyncStorage.setItem(`@${namespace}:${key}`, JSON.stringify(value));
  } catch (e) {
    logger.warn(e);
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    logger.log('removeItem ', key);
    return await AsyncStorage.removeItem(`@${namespace}:${key}`);
  } catch (e) {
    logger.warn(e);
    return null;
  }
};

export default {
  getItem,
  setItem,
  removeItem,
};
