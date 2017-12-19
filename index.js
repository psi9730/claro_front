// @flow

import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import store from './src/redux/store';
import App from './src/App';

const Easi6ForDriver = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('easi6driver', () => Easi6ForDriver);
