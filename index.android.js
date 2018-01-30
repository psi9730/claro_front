// @flow

import 'babel-polyfill';
import React from 'react';
import {Platform} from 'react-native';
import FCM, {FCMEvent} from 'react-native-fcm';

import mySaga from './src/redux/sagas';
import {sagaMiddleware} from './src/redux/store';
import './src/utils/i18n';
import {registerScreens, startApp} from './screens';
import {setConfiguration} from './src/utils/configuration';
import {postPushToken} from './src/utils/api';

const isProd = process.env.NODE_ENV === 'production';
let apiRoot = process.env.API_ROOT || 'http://127.0.0.1:9100';
if (isProd) {
  apiRoot = 'https://vendor.pyeongchangcarservice.com';
}

setConfiguration('API_ROOT', apiRoot);

sagaMiddleware.run(mySaga);

registerScreens();

startApp();

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  console.log('FCMEvent.Notification', notif);
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if(notif.local_notification){
    //this is a local notification
  }
  if(notif.opened_from_tray){
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  // await someAsyncCall();
});
FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log('FCMEvent.RefreshToken', token);
  return postPushToken(token).then((res) => {
    console.log('postPushToken res: ', res);
  }).catch((e) => {
    console.log('postPushToken error: ', e);
  });
});
