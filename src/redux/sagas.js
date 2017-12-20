// @flow

import {all} from 'redux-saga/effects';
import {LoginSaga} from '../modules/login/LoginState';
import {RentalsSaga} from '../modules/rentals/RentalsState';

function* mySaga(): any {
  yield all([
    ...LoginSaga,
    ...RentalsSaga,
  ]);
}

export default mySaga;
