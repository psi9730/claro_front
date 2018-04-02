


import React from 'react';
import {Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import i18next from 'i18next';

import {RENTAL_DETAIL_SCREEN} from '../../screens';

export const pushNotifListener = (notif) => {
  let title;
  let body;
  if (notif.fcm) {
    title = notif.fcm.title;
    body = notif.fcm.body;
  } else if (notif.aps && notif.aps.alert) {
    const alert = notif.aps.alert || {};
    title = alert.title;
    body = alert.body || alert;
  }
  if (body) {
    Alert.alert(
      title || i18next.t('notification'),
      body,
      [
        {text: i18next.t('close'), style: 'cancel'},
        {text: i18next.t('move_to_order'), onPress: () => Navigation.handleDeepLink({link: RENTAL_DETAIL_SCREEN.screen, payload: {description: 'push', rn: notif.rn}})},
      ],
      { cancelable: false }
    );
  }
};
