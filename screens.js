// @flow

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import i18n from './src/utils/i18n';
import store from './src/redux/store';
import DrawerScreen from './src/modules/drawer/DrawerViewContainer';
import LoginScreen from './src/modules/driver/login/LoginViewContainer';
import RentalsScreen from './src/modules/rentals/RentalsViewContainer';
import RentalDetailScreen from './src/modules/rentals/RentalDetailViewContainer';
import ProfileScreen from './src/modules/driver/profile/ProfileViewContainer';
import {getAuthenticationToken} from './src/utils/authentication';

const t = i18n.getFixedT();

export const DRAWER_SCREEN = {
  screen: 'easi6driver.DrawerScreen',
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
};
export const LOGIN_SCREEN = {
  screen: 'easi6driver.LoginScreen',
  title: t('title_login'),
  navigatorStyle: {},
  navigatorButtons: {},
};
export const RENTALS_SCREEN = {
  screen: 'easi6driver.RentalsScreen',
  title: t('title_rentals'),
  navigatorStyle: {},
  navigatorButtons: {},
};
export const RENTAL_DETAIL_SCREEN = {
  screen: 'easi6driver.RentalDetailScreen',
  title: t('title_rental'),
  navigatorStyle: {},
  navigatorButtons: {},
};
export const PROFILE_SCREEN = {
  screen: 'easi6driver.ProfileScreen',
  title: t('title_rental'),
  navigatorStyle: {},
  navigatorButtons: {},
}

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent(DRAWER_SCREEN.screen, () => DrawerScreen, store, Provider);
  Navigation.registerComponent(RENTALS_SCREEN.screen, () => RentalsScreen, store, Provider);
  Navigation.registerComponent(RENTAL_DETAIL_SCREEN.screen, () => RentalDetailScreen, store, Provider);
  Navigation.registerComponent(LOGIN_SCREEN.screen, () => LoginScreen, store, Provider);
  Navigation.registerComponent(PROFILE_SCREEN.screen, () => ProfileScreen, store, Provider);
}

export function startApp() {
  (async () => {
    const token = await getAuthenticationToken();
    let firstScreen = {...LOGIN_SCREEN};

    if (token && token.accessToken) {
      firstScreen = {...RENTALS_SCREEN};
    }

    Navigation.startSingleScreenApp({
      screen: firstScreen,
      drawer: { // optional, add this if you want a side menu drawer in your app
        left: {...DRAWER_SCREEN},
        style: { // ( iOS only )
          drawerShadow: true, // optional, add this if you want a side menu drawer shadow
          contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
          leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
          rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
        },
        type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
        animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
        // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
        disableOpenGesture: false // optional, can the drawer, both right and left, be opened with a swipe instead of button
      },
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  })();
}
