import {Platform, Linking} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';

const openUrlIos = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
};

export const openMapApp = (location) => {
  const isIos = Platform.OS === 'ios';
  if (isIos) {
    const url = `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`;
    openUrlIos(url);
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
    const url = `tel:${phone}`;
    openUrlIos(url);
  } else {
    if (phone && isValidPhone(phone))
    SendIntentAndroid.sendPhoneDial(phone);
  }
};
