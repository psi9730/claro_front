// @flow

import {call, put, takeLatest} from 'redux-saga/effects';
import qs from 'qs';
import _ from 'lodash';
import {schema} from 'normalizr';
import {createSelector} from 'reselect';
import {createActions} from 'reduxsauce';

import {get, post} from '../../utils/api';
import {actionsGenerator} from "../../redux/reducerUtils";

const rentalSchema = new schema.Entity('rentals', {}, {idAttribute: 'hash'});
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

// Action Creators

export const {Types: RentalTypes, Creators: RentalActions} = createActions(
  actionsGenerator({
    rentalsRequest: ['status', 'startDate'],
    rentalDetailRequest: ['hash'],
    rentalStatusChangeRequest: ['hash', 'status'],
  })
);

function* requestRentals({status, startDate}: {status: ?number, startDate: ?string}) {
  const params = {
    status,
    startDate,
  };

  try {
    const res = yield call(get, `/driver/rentals?${qs.stringify(params)}`, rentalsWithPage);

    yield put(RentalActions.rentalsSuccess(res));
  } catch (e) {
    yield put(RentalActions.rentalsFailure(e));
  }
}

function* requestRentalDetail({hash}: {hash: string}) {
  try {
    const rental = yield call(get, `/driver/rentals/${hash}`, rentalSchema);

    yield put(RentalActions.rentalDetailSuccess(rental));
  } catch (e) {
    yield put(RentalActions.rentalDetailFailure(e));
  }
}

function* requestRentalStatusChange({hash, status}: {hash: string, status: number}) {
  try {
    if (status === 40 || status === 50 || status === 60) {
      const params = {
        status: status+10,
      };
      const rental = yield call(post, `/driver/rentals/${hash}/status`, params, rentalSchema);

      yield put(RentalActions.rentalStatusChangeSuccess(rental));
    } else {
      yield put(RentalActions.rentalStatusChangeFailure(e));
    }
  } catch (e) {
    yield put(RentalActions.rentalStatusChangeFailure(e));
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
    case RentalTypes.RENTALS_REQUEST:
    case RentalTypes.RENTAL_DETAIL_REQUEST:
    case RentalTypes.RENTAL_STATUS_CHANGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RentalTypes.RENTALS_SUCCESS:
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

    case RentalTypes.RENTAL_DETAIL_SUCCESS:
    case RentalTypes.RENTAL_STATUS_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          ...action.payload.entities.rentals,
        },
      };

    case RentalTypes.RENTALS_FAILURE:
    case RentalTypes.RENTAL_DETAIL_FAILURE:
    case RentalTypes.RENTAL_STATUS_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export const RentalsSaga = [
  takeLatest(RentalTypes.RENTALS_REQUEST, requestRentals),
  takeLatest(RentalTypes.RENTAL_DETAIL_REQUEST, requestRentalDetail),
  takeLatest(RentalTypes.RENTAL_STATUS_CHANGE_REQUEST, requestRentalStatusChange),
];
