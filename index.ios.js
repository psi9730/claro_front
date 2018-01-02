// @flow

import 'babel-polyfill';
import React from 'react';

import mySaga from './src/redux/sagas';
import {sagaMiddleware} from './src/redux/store';
import './src/utils/i18n';
import {registerScreens, startApp} from './screens';
import {setConfiguration} from './src/utils/configuration';
import {Platform} from "react-native";

setConfiguration('API_ROOT', process.env.API_ROOT || 'http://localhost:9100');

sagaMiddleware.run(mySaga);

registerScreens();

startApp();

navigator.geolocation.requestAuthorization();
