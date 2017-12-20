// @flow

import 'babel-polyfill';
import React from 'react';

import mySaga from './src/redux/sagas';
import {sagaMiddleware} from './src/redux/store';
import './src/utils/i18n';
import {registerScreens, startApp} from './screens';
import {setConfiguration} from './src/utils/configuration';

setConfiguration('API_ROOT', process.env.API_ROOT || 'http://10.0.1.8:9100');

sagaMiddleware.run(mySaga);

registerScreens();

startApp();
