// @flow

import {all} from 'redux-saga/effects';
import {LoginSaga} from '../modules/login/LoginState';

function* mySaga(): any {
  yield all([
    ...LoginSaga
  ]);
}

export default mySaga;
