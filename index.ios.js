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
import {pushNotifListener} from './src/utils/notifUtils';
import Constants from './src/constants/constants';
const {API_ROOT, API_ROOT_WIFI} = Constants
const isProd = process.env.NODE_ENV === 'production';
let defaultHost = API_ROOT;
if (Platform.OS === 'ios') {
  defaultHost = API_ROOT;
}
let apiRoot = process.env.API_ROOT || defaultHost;
if (isProd) {
  apiRoot = 'https://backend.vendor.easi6.com';
}

let apiRootWifi = API_ROOT_WIFI;
if (isProd) {
  apiRootWifi = 'https://backend.vendor.easi6.com';
}

setConfiguration('API_ROOT', apiRoot);
setConfiguration('API_ROOT_WIFI', apiRootWifi);

sagaMiddleware.run(mySaga);

registerScreens();

startApp();

console.log('fcm event listener attach');
// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  console.log('FCMEvent.Notification', notif);
  pushNotifListener(notif);
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if(notif.local_notification){
    //this is a local notification
  }
  if(notif.opened_from_tray){
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }

  if (Platform.OS === 'ios') {
    if (notif.finish) {
      notif.finish();
    }
  }

  // if(Platform.OS ==='ios'){
  //   //optional
  //   //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
  //   //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
  //   //notif._notificationType is available for iOS platfrom
  //   switch(notif._notificationType){
  //     case NotificationType.Remote:
  //       notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
  //       break;
  //     case NotificationType.NotificationResponse:
  //       notif.finish();
  //       break;
  //     case NotificationType.WillPresent:
  //       notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
  //       break;
  //   }
  // }

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
