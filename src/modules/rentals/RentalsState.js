// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import qs from 'qs';
import _ from 'lodash';
import {schema} from 'normalizr';
import {createSelector} from 'reselect';

import {get, post} from '../../utils/api';

const rentalSchema = new schema.Entity('rentals', {}, {idAttribute: 'rentalNumber'});
const rentalsWithPage = new schema.Object({
  items: [rentalSchema],
});

export type RentalType = {
  memberCount: number,
  contactInfo: {
    name: string,
    phone: string,
  },
  flightNumber: ?string,
  locationInfos: Array<Object>,
  orderDays: number,
  orderHours: number,
};

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

const RENTAL_STATUS_CHANGE_REQUEST = 'RentalsState/RENTAL_STATUS_CHANGE_REQUEST';
const RENTAL_STATUS_CHANGE_SUCCESS = 'RentalsState/RENTAL_STATUS_CHANGE_SUCCESS';
const RENTAL_STATUS_CHANGE_FAILURE = 'RentalsState/RENTAL_STATUS_CHANGE_FAILURE';

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

export function rentalDetailRequest(rentalNumber: string) {
  return {
    type: RENTAL_DETAIL_REQUEST,
    rentalNumber,
  };
}

function rentalDetailSuccess(payload) {
  return {
    type: RENTAL_DETAIL_SUCCESS,
    payload,
  };
}

function rentalDetailFailure(err) {
  return {
    type: RENTAL_DETAIL_FAILURE,
    err,
  };
}

function* requestRentalDetail({rentalNumber}: {rentalNumber: string}) {
  try {
    const rental = yield call(get, `/driver/rentals/${rentalNumber}`, rentalSchema);

    yield put(rentalDetailSuccess(rental));
  } catch (e) {
    yield put(rentalDetailFailure(e));
  }
}

export function rentalStatusChangeRequest(rentalNumber: string, status: number) {
  return {
    type: RENTAL_STATUS_CHANGE_REQUEST,
    rentalNumber,
    status,
  };
}

function rentalStatusChangeSuccess(payload) {
  return {
    type: RENTAL_STATUS_CHANGE_SUCCESS,
    payload,
  };
}

function rentalStatusChangeFailure(err) {
  return {
    type: RENTAL_STATUS_CHANGE_FAILURE,
    err,
  };
}

function* requestRentalStatusChange({rentalNumber, status}: {rentalNumber: string, status: number}) {
  try {
    if (status === 40 || status === 50 || status === 60) {
      const params = {
        status: status+10,
      };
      const rental = yield call(post, `/driver/rentals/${rentalNumber}/status`, params, rentalSchema);

      yield put(rentalStatusChangeSuccess(rental));
    } else {
      yield put(rentalStatusChangeFailure(e));
    }
  } catch (e) {
    yield put(rentalStatusChangeFailure(e));
  }
}

// Selectors

const getRentalsById = (state) => state.rentals.byId;

const getRentalIds = (state) => state.rentals.ids;

const getRentalNumber = (__, props) => props.rentalNumber;

export const makeGetVisibleRentals = () => createSelector([getRentalsById, getRentalIds], (rentalsById, ids) => {
  return _.map(ids, (id) => rentalsById[id]);
});

export const makeGetVisibleRental = () => createSelector([getRentalsById, getRentalNumber], (rentalsById, rentalNumber) => {
  return rentalsById[rentalNumber];
});

// Reducer
export default function RentalsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RENTALS_REQUEST:
    case RENTAL_DETAIL_REQUEST:
    case RENTAL_STATUS_CHANGE_REQUEST:
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

    case RENTAL_DETAIL_SUCCESS:
    case RENTAL_STATUS_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          ...action.payload.entities.rentals,
        },
      };

    case RENTALS_FAILURE:
    case RENTAL_DETAIL_FAILURE:
    case RENTAL_STATUS_CHANGE_FAILURE:
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
  takeLatest(RENTAL_DETAIL_REQUEST, requestRentalDetail),
  takeLatest(RENTAL_STATUS_CHANGE_REQUEST, requestRentalStatusChange),
];
