// @flow

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import DrawerScreen from './src/modules/drawer/DrawerViewContainer';
import LoginScreen from './src/modules/login/LoginViewContainer';
import RentalsScreen from './src/modules/rentals/RentalsViewContainer';
import RentalDetailScreen from './src/modules/rentals/RentalDetailViewContainer';
import {getAuthenticationToken} from './src/utils/authentication';

const DRAWER_SCREEN = 'easi6driver.DrawerScreen';
const LOGIN_SCREEN = 'easi6driver.LoginScreen';
const RENTALS_SCREEN = 'easi6driver.RentalsScreen';
const RENTAL_DETAIL_SCREEN = 'easi6driver.RentalDetailScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent(DRAWER_SCREEN, () => DrawerScreen, store, Provider);
  Navigation.registerComponent(RENTALS_SCREEN, () => RentalsScreen, store, Provider);
  Navigation.registerComponent(RENTAL_DETAIL_SCREEN, () => RentalDetailScreen, store, Provider);
  Navigation.registerComponent(LOGIN_SCREEN, () => LoginScreen, store, Provider);
}

export function startApp() {
  console.log('startApp');
  (async () => {
    console.log('startApp in async');
    const token = await getAuthenticationToken();
    let firstScreen = {
      screen: LOGIN_SCREEN,
      title: 'Login',
      navigatorStyle: {},
      navigatorButtons: {},
    };

    if (token && token.accessToken) {
      firstScreen = {
        screen: RENTALS_SCREEN,
        title: 'Rentals',
        navigatorStyle: {},
        navigatorButtons: {},
      };
    }

    Navigation.startSingleScreenApp({
      screen: firstScreen,
      drawer: { // optional, add this if you want a side menu drawer in your app
        left: { // optional, define if you want a drawer from the left
          screen: DRAWER_SCREEN, // unique ID registered with Navigation.registerScreen
          passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
          disableOpenGesture: false // can the drawer be opened with a swipe instead of button (optional, Android only)
        },
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
