import {Platform} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';

export const openMapApp = (location) => {
  console.log(location);
  const isIos = Platform.OS === 'ios';
  if (isIos) {

  } else {
    // const SendIntentAndroid = require('react-native-send-intent');
    SendIntentAndroid.openMaps(`${location.latitude},${location.longitude}`)
  }
};
