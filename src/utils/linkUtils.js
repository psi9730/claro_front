import {Platform} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';

export const openMapApp = (location) => {
  const isIos = Platform.OS === 'ios';
  if (isIos) {

  } else {
    SendIntentAndroid.openMaps(`${location.latitude},${location.longitude}`)
  }
};

const isValidPhone = (phone) => {
  return true;
};

export const openPhoneApp = (phone) => {
  const isIos = Platform.OS === 'ios';
  if (isIos) {

  } else {
    if (phone && isValidPhone(phone))
    SendIntentAndroid.sendPhoneDial(phone);
  }
};
