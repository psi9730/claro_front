// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import qs from 'qs';
import _ from 'lodash';

import {get} from '../../utils/api';

// Initial state
const initialState = {
  loading: false,
  items: [],
  page: {
    total: 0,
    current: 0,
  },
  totalCnt: 0,
};

// Actions
const RENTALS_REQUEST = 'RentalsState/RENTALS_REQUEST';
const RENTALS_SUCCESS = 'RentalsState/RENTALS_SUCCESS';
const RENTALS_FAILURE = 'RentalsState/RENTALS_FAILURE';

// Action creators
export function rentalsRequest(status: ?number, startDate: ?string) {
  return {
    type: RENTALS_REQUEST,
    status,
    startDate,
  };
}

function rentalsSuccess(rentalsWithCount) {
  return {
    type: RENTALS_SUCCESS,
    ...rentalsWithCount,
  };
}

function rentalsFailure(err) {
  return {
    type: RENTALS_FAILURE,
    err,
  };
}

function* requestRentals({status, startDate}: {status: ?number, startDate: ?string}) {
  const params = {
    status,
    startDate,
  };

  try {
    const rentalsWithCount = yield call(get, `/driver/rentals?${qs.stringify(params)}`);

    yield put(rentalsSuccess(rentalsWithCount));
  } catch (e) {
    yield put(rentalsFailure(e));
  }
}

// Reducer
export default function RentalsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RENTALS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RENTALS_SUCCESS:
      return {
        ...state,
        loading: false,
        ..._.pick(action, ['items', 'page', 'totalCnt']),
      };

    case RENTALS_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.err,
      };

    default:
      return state;
  }
}

export const RentalsSaga = [
  takeLatest(RENTALS_REQUEST, requestRentals),
];
