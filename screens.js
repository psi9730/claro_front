// @flow

import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import LoginScreen from './src/modules/login/LoginViewContainer';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('easi6driver.LoginScreen', () => LoginScreen, store, Provider);
}
