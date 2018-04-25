// @flow

import {all} from 'redux-saga/effects';
import {LoginSaga} from '../modules/driver/DriverState';
import {RegisterDeviceSaga} from '../modules/registerdevice/RegisterDeviceSaga';
function* mySaga(): any {
  yield all([
    ...RegisterDeviceSaga,
  ]);
}

export default mySaga;
