// @flow

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import Storage, {KEYS} from './src/utils/ClaroStorage';
import i18n from './src/utils/i18n';
import store from './src/redux/store';
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback, Platform
} from 'react-native';
import NavigationWrapper from './src/modules/navigation/NavigationWrapper';
import DrawerScreen from './src/modules/drawer/DrawerViewContainer';
import FilterScreen from './src/modules/filter/FilterDragView';
import BarcodeScanScreen from './src/modules/registerdevice/barcodescan/BarcodeScanViewContainer';
import SerialNumberScreen from './src/modules/registerdevice/serialnumber/SerialNumberViewContainer';
import WifiSetUpScreen from './src/modules/registerdevice/wifisetup/WifiSetUpViewContainer';
import WifiMainScreen from './src/modules/registerdevice/wifisetup/WifiMainViewContainer';
import WifiSolutionScreen from './src/modules/registerdevice/wifisetup/WifiSolutionViewContainer';
import WifiGuideScreen from './src/modules/registerdevice/wifisetup/WifiGuideViewContainer';
import RemoteScreen from './src/modules/remote/remoteDraggableViewContainer';
import ChoiceDeviceScreen from './src/modules/remote/choiceDevice/choiceDeviceViewContainer';
import RemoteDetailScreen from './src/modules/remote/remoteDetail/remoteDetailViewContainer';
import TimerScreen from './src/modules/remote/timer/timerViewContainer';
import NicknameScreen from './src/modules/registerdevice/NicknameViewContainer';
import RegisterCompleteScreen from './src/modules/registerdevice/RegisterCompleteViewContainer';
import SignupScreen from './src/modules/login/SignupViewContainer';
import LoginScreen from './src/modules/login/LoginViewContainer';
import ClaroSignupScreen from './src/modules/login/ClaroSignupViewContainer';
import NaverSignupScreen from './src/modules/login/NaverSignupViewContainer';
import AcceptSignupScreen from './src/modules/login/AcceptSignupViewContainer';
import PersonalInfoScreen from './src/modules/login/PersonalInfoViewContainer';
import TermOfUseScreen from './src/modules/login/TermOfUseViewContainer';
import {getAuthenticationToken} from './src/utils/authentication';
import SerialNumberSolutionScreen from './src/modules/registerdevice/serialnumber/SerialNumberSolutionViewContainer';
import burgerIcn from './src/assets/images/burger.png';
import goBackIcn from './src/assets/images/goBack.png';
import exitIcn from './src/assets/images/exit.png';
import blankIcn from './src/assets/images/Blank.png';
import easi_6 from './src/assets/images/easi_6.png';
const burgerBtn = {
  id: 'toggleDrawer',
  icon: burgerIcn,
  disableIconTint: false,
};
const blankBtn = {
  icon: blankIcn,
  disableIconTint: false,
};

const goBack = {
  id: 'goBack',
  icon: Platform.select({
    ios: goBackIcn,
    android: goBackIcn
  })}

const t = i18n.getFixedT();
export const DRAWER_SCREEN = {
  screen: 'claro.DrawerScreen',
};
/*
export const LOGIN_SCREEN = {
  screen: 'claro.LoginScreen',
  title: t('title_login'),
  navigatorStyle: {},
  navigatorButtons: {},
};*/

export const BARCODE_SCAN_SCREEN = {
  screen: 'claro.BarcodeScreen',
  navigatorStyle: {},
  navigatorButtons: {

  },
};
export const WIFI_SOLUTION_SCREEN = {
  screen: 'claro.WifiSolutionScreen',
  navigatorStyle: {},
  navigatorButtons: {
  },
};
export const SERIAL_NUMBER_SOLUTION_SCREEN = {
  screen: 'claro.SerialNumberSolutionScreen',
  navigatorStyle: {},
  navigatorButtons: {
  },
};
export const WIFI_GUIDE_SCREEN = {
  screen: 'claro.WifiGuideScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const TIMER_SCREEN = {
  screen: 'claro.TimerScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const REGISTER_COMPLETE_SCREEN = {
  screen: 'claro.RegisterCompleteScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const NICKNAME_SCREEN = {
  screen: 'claro.NicknameScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const TERM_OF_USE_SCREEN = {
  screen: 'claro.TermOfUseScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const CLARO_SIGNUP_SCREEN = {
  screen: 'claro.ClaroSignupScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const PERSONAL_INFO_SCREEN = {
  screen: 'claro.PersonalInfoScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const ACCEPT_SIGNUP_SCREEN = {
  screen: 'claro.AcceptSignupScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const SIGNUP_SCREEN = {
  screen: 'claro.SignupScreen',
  navigatorStyle: {},
  navigatorButtons: {
  },
};

export const LOGIN_SCREEN = {
  screen: 'claro.LoginScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};

export const NAVER_SIGNUP_SCREEN = {
  screen: 'claro.NaverSignupScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const CHOICE_DEVICE_SCREEN = {
  screen: 'claro.ChoiceDeviceScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};
export const SERIAL_NUMBER_SCREEN = {
  screen: 'claro.SerialNumberScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};
export const WIFI_SET_UP_SCREEN = {
  screen: 'claro.WifiSetUpScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
}
export const WIFI_MAIN_SCREEN = {
  screen: 'claro.WifiMainScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [goBack],
  },
};


export const REMOTE_SCREEN = {
  screen: 'claro.RemoteScreen',
  navigatorStyle: {
    navBarTextColor:'white',
  },
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

export const REMOTE_DETAIL_SCREEN = {
  screen: 'claro.RemoteDetailScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

export const FILTER_SCREEN = {
  screen: 'claro.FilterScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent(TIMER_SCREEN.screen, () => NavigationWrapper(TimerScreen), store, Provider);
  Navigation.registerComponent(SERIAL_NUMBER_SOLUTION_SCREEN.screen, () => NavigationWrapper(SerialNumberSolutionScreen), store, Provider);
  Navigation.registerComponent(WIFI_SOLUTION_SCREEN.screen, () => NavigationWrapper(WifiSolutionScreen), store, Provider);
  Navigation.registerComponent(TERM_OF_USE_SCREEN.screen, () => NavigationWrapper(TermOfUseScreen), store, Provider);
  Navigation.registerComponent(WIFI_GUIDE_SCREEN.screen, () => NavigationWrapper(WifiGuideScreen), store, Provider);
  Navigation.registerComponent(NICKNAME_SCREEN.screen, () => NavigationWrapper(NicknameScreen), store, Provider);
  Navigation.registerComponent(REGISTER_COMPLETE_SCREEN.screen, () => NavigationWrapper(RegisterCompleteScreen), store, Provider);
  Navigation.registerComponent(PERSONAL_INFO_SCREEN.screen, () => NavigationWrapper(PersonalInfoScreen), store, Provider);
  Navigation.registerComponent(CLARO_SIGNUP_SCREEN.screen, () => NavigationWrapper(ClaroSignupScreen), store, Provider);
  Navigation.registerComponent(NAVER_SIGNUP_SCREEN.screen, () => NavigationWrapper(NaverSignupScreen), store, Provider);
  Navigation.registerComponent(FILTER_SCREEN.screen, () => NavigationWrapper(FilterScreen), store, Provider);
  Navigation.registerComponent(ACCEPT_SIGNUP_SCREEN.screen, () => NavigationWrapper(AcceptSignupScreen), store, Provider);
  Navigation.registerComponent(DRAWER_SCREEN.screen, () => NavigationWrapper(DrawerScreen), store, Provider);
  Navigation.registerComponent(WIFI_SET_UP_SCREEN.screen, () => NavigationWrapper(WifiSetUpScreen), store, Provider);
  Navigation.registerComponent(WIFI_MAIN_SCREEN.screen, () => NavigationWrapper(WifiMainScreen), store, Provider);
  Navigation.registerComponent(BARCODE_SCAN_SCREEN.screen, () => NavigationWrapper(BarcodeScanScreen), store, Provider);
  Navigation.registerComponent(SERIAL_NUMBER_SCREEN.screen, () => NavigationWrapper(SerialNumberScreen), store, Provider);
  Navigation.registerComponent(REMOTE_SCREEN.screen, () => NavigationWrapper(RemoteScreen), store, Provider);
  Navigation.registerComponent(REMOTE_DETAIL_SCREEN.screen, () => NavigationWrapper(RemoteDetailScreen), store, Provider);
  Navigation.registerComponent(CHOICE_DEVICE_SCREEN.screen, () => NavigationWrapper(ChoiceDeviceScreen), store, Provider);
  Navigation.registerComponent(LOGIN_SCREEN.screen, () => NavigationWrapper(LoginScreen), store, Provider);
  Navigation.registerComponent(SIGNUP_SCREEN.screen, () => NavigationWrapper(SignupScreen), store, Provider);
}

export function startApp() {
  (async () => {
    const accessToken = await Storage.getItem(KEYS.accessToken);
    console.log(accessToken, "accToken");
    const token = await getAuthenticationToken();
    let firstScreen = {...REMOTE_SCREEN};

    if (token && token.accessToken) {
      firstScreen = {...REMOTE_SCREEN};
    }

    Navigation.startSingleScreenApp({
      appStyle: {
        statusBarTextColorScheme: 'dark',
        keepStyleAcrossPush: false,
        navBarButtonColor: 'black',
        navBarNoBorder: true,
        statusBarColor:'white',
        navBarBackgroundColor: 'white',
        navigationBarColor: 'black',
        topBarElevationShadowEnabled: false,
      },
      screen: firstScreen,
      drawer: { // optional, add this if you want a side menu drawer in your app
        left: {...DRAWER_SCREEN},
        style: { // ( iOS only )
          drawerShadow: true, // optional, add this if you want a side menu drawer shadow
          contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
          leftDrawerWidth: 80, // optional, add this if you want a define left drawer width (50=percent)
          rightDrawerWidth: 50, // optional, add this if you want a define right drawer width (50=percent)
          navBarButtonColor: 'black',
        },
        type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
        animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
        // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
        disableOpenGesture: true, // optional, can the drawer, both right and left, be opened with a swipe instead of button
      },
      animationType: 'slide-down', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  })();
}
