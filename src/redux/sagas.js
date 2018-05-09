// @flow

import {all} from 'redux-saga/effects';
//import {LoginSaga} from '../modules/driver/DriverState';
import {RegisterDeviceSaga} from '../modules/registerdevice/RegisterDeviceSaga';
import {RemoteSaga} from '../modules/remote/remoteSaga';
function* mySaga(): any {
  yield all([
    ...RegisterDeviceSaga,
    ...RemoteSaga,
  ]);
}

export default mySaga;
