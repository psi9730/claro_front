// @flow

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {url} from './api';
import {Alert} from 'react-native';
import i18n from './i18n';

const t = i18n.getFixedT();

export const configure = (driverId: any) => {
  BackgroundGeolocation.configure({
    desiredAccuracy: 100,
    stationaryRadius: 50,
    distanceFilter: 30,
    notificationTitle: null,
    notificationText: null,
    // debug: process.env.NODE_ENV === 'development',
    debug: false,
    startOnBoot: true,
    stopOnTerminate: false,
    locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    interval: 10000,
    fastestInterval: 7000,
    activitiesInterval: 10000,
    stopOnStillActivity: false,
    activityType: 'AutomotiveNavigation',
    url: url('/driver/geo'),
    httpHeaders: {
      Driver: `Driver ${driverId}`,
      Authorization: 'Basic ZWFzaTZhZG1pbjplYXNpNg==',
    },
  });
};

const requestAlert = () => {
  Alert.alert(
    t('Location services disabled'),
    t('Would you like to open location settings?'),
    [
      {
        text: t('Yes'),
        onPress: () => BackgroundGeolocation.showLocationSettings()
      },
      {
        text: t('No'),
        onPress: () => console.log('No Pressed'),
        style: 'cancel'
      }
    ]
  );
};

export const registerOn = () => {
  BackgroundGeolocation.on('authorization', status => {
    if (status !== BackgroundGeolocation.auth.AUTHORIZED) {
      requestAlert();
    }
  });
};

export const checkStatus = () => {
  BackgroundGeolocation.checkStatus(({ isRunning, authorization }) => {
    if (authorization === BackgroundGeolocation.auth.AUTHORIZED) {
      BackgroundGeolocation.start();
    } else {
      requestAlert();
    }
  });
};

export default {
  registerOn,
  checkStatus,
  configure,
  watchPosition: () => {},
  clearWatch: () => {},
}
