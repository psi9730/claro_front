// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import qs from 'qs';
import _ from 'lodash';
import {schema} from 'normalizr';
import {createSelector} from 'reselect';

import {get} from '../../utils/api';

const rentalSchema = new schema.Entity('rentals', {}, {idAttribute: 'hash'});
const rentalsWithPage = new schema.Object({
  items: [rentalSchema],
});

// Initial state
const initialState = {
  loading: false,
  byId: {},
  ids: [],
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

const RENTAL_DETAIL_REQUEST = 'RentalsState/RENTAL_DETAIL_REQUEST';
const RENTAL_DETAIL_SUCCESS = 'RentalsState/RENTAL_DETAIL_SUCCESS';
const RENTAL_DETAIL_FAILURE = 'RentalsState/RENTAL_DETAIL_FAILURE';

// Action creators
export function rentalsRequest(status: ?number, startDate: ?string) {
  return {
    type: RENTALS_REQUEST,
    status,
    startDate,
  };
}

function rentalsSuccess(payload) {
  return {
    type: RENTALS_SUCCESS,
    payload,
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
    const res = yield call(get, `/driver/rentals?${qs.stringify(params)}`, rentalsWithPage);

    yield put(rentalsSuccess(res));
  } catch (e) {
    yield put(rentalsFailure(e));
  }
}

export function rentalDetailRequest(hash: string) {
  return {
    type: RENTAL_DETAIL_REQUEST,
    hash,
  };
}

function rentalDetailSuccess(rental) {
  return {
    type: RENTAL_DETAIL_SUCCESS,
    rental,
  };
}

function rentalDetailFailure(err) {
  return {
    type: RENTAL_DETAIL_FAILURE,
    err,
  };
}

function* requestRentalDetail({hash}: {hash: string}) {
  try {
    const rental = yield call(get, `/driver/rentals/${hash}`);

    yield put(rentalDetailSuccess(rental));
  } catch (e) {
    yield put(rentalDetailFailure(e));
  }
}

// Selectors

const getRentalsById = (state) => state.rentals.byId;

const getRentalIds = (state) => state.rentals.ids;

const getRentalHash = (__, props) => props.hash;

export const makeGetVisibleRentals = () => createSelector([getRentalsById, getRentalIds], (rentalsById, ids) => {
  return _.map(ids, (id) => rentalsById[id]);
});

export const makeGetVisibleRental = () => createSelector([getRentalsById, getRentalHash], (rentalsById, hash) => {
  return rentalsById[hash];
});

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
        ids: action.payload.result.items,
        byId: {
          ...state.byId,
          ...action.payload.entities.rentals,
        },
        page: {
          ...state.page,
          ...action.payload.result.page,
        },
        totalCnt: action.payload.result.totalCnt,
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
  takeLatest(RENTAL_DETAIL_REQUEST, requestRentalDetail)
];
