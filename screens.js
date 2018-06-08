// @flow

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import Storage, {KEYS} from './src/utils/ClaroStorage';
import i18n from './src/utils/i18n';
import store from './src/redux/store';
import NavigationWrapper from './src/modules/navigation/NavigationWrapper';
import DrawerScreen from './src/modules/drawer/DrawerViewContainer';
import FilterScreen from './src/modules/filter/FilterDragView';
import BarcodeScanScreen from './src/modules/registerdevice/barcodescan/BarcodeScanViewContainer';
import SerialNumberScreen from './src/modules/registerdevice/serialnumber/SerialNumberViewContainer';
import WifiSetUpScreen from './src/modules/registerdevice/wifisetup/WifiSetUpViewContainer';
import RemoteScreen from './src/modules/remote/remoteDraggableViewContainer';
import ChoiceDeviceScreen from './src/modules/remote/choiceDevice/choiceDeviceViewContainer';
import RemoteDetailScreen from './src/modules/remote/remoteDetail/remoteDetailViewContainer';
import SignupScreen from './src/modules/login/SignupViewContainer';
import LoginScreen from './src/modules/login/LoginViewContainer';
import {getAuthenticationToken} from './src/utils/authentication';
import burgerIcn from './src/assets/images/burger.png';
import easi_6 from './src/assets/images/easi_6.png';
const burgerBtn = {
  id: 'toggleDrawer',
  icon: burgerIcn,
  disableIconTint: false,
};

const home = {
  id: 'gotoHome',
  icon: easi_6,
};

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
  title: t('title_barcode_scan'),
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};
export const SIGNUP_SCREEN = {
  screen: 'claro.SignupScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

export const LOGIN_SCREEN = {
  screen: 'claro.LoginScreen',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};
export const CHOICE_DEVICE_SCREEN = {
  screen: 'claro.ChoiceDeviceScreen',
  title: '기기선택',
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};
export const SERIAL_NUMBER_SCREEN = {
  screen: 'claro.SerialNumberScreen',
  title: t('title_serial_number'),
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};
export const WIFI_SET_UP_SCREEN = {
  screen: 'claro.WifiSetUpScreen',
  title: t('title_wifi_set_up'),
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

export const REMOTE_SCREEN = {
  screen: 'claro.RemoteScreen',
  title: t('title_remote_screen'),
  navigatorStyle: {
    navBarTextColor:'white',
  },
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

export const REMOTE_DETAIL_SCREEN = {
  screen: 'claro.RemoteDetailScreen',
  title: t('title_remote_screen'),
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

export const FILTER_SCREEN = {
  screen: 'claro.FilterScreen',
  title: t('title_filter_screen'),
  navigatorStyle: {},
  navigatorButtons: {
    leftButtons: [burgerBtn],
  },
};

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent(FILTER_SCREEN.screen, () => NavigationWrapper(FilterScreen), store, Provider);
  Navigation.registerComponent(DRAWER_SCREEN.screen, () => NavigationWrapper(DrawerScreen), store, Provider);
  Navigation.registerComponent(WIFI_SET_UP_SCREEN.screen, () => NavigationWrapper(WifiSetUpScreen), store, Provider);
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
    await Storage.setItem(KEYS.accessToken, "okok");
    await Storage.setItem(KEYS.refreshToken, "ookook");
    const accessToken = await Storage.getItem(KEYS.accessToken);
    console.log(accessToken, "accToken");
    const token = await getAuthenticationToken();
    let firstScreen = {...SIGNUP_SCREEN};

    if (token && token.accessToken) {
      firstScreen = {...SERIAL_NUMBER_SCREEN};
    }

    Navigation.startSingleScreenApp({
      appStyle: {
        keepStyleAcrossPush: false,
        navBarButtonColor: 'black',
        navBarNoBorder: true,
      },
      screen: firstScreen,
      drawer: { // optional, add this if you want a side menu drawer in your app
        left: {...DRAWER_SCREEN},
        style: { // ( iOS only )
          drawerShadow: true, // optional, add this if you want a side menu drawer shadow
          contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
          leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
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
