// @flow

import _ from 'lodash';

import {postGeo} from './api';

let watchId: ?number = null;
let locs = [];

const postGeoWithLocs = async () => {
  if (locs.length > 0) {
    try {
      await postGeo(locs);
    } catch (e) {}
  }
  locs = [];
};
const throttledPostGeoWithLocs = _.throttle(postGeoWithLocs, 20000);

export const checkStatus = () => {
  navigator.geolocation.requestAuthorization();
};

export const watchPosition = () => {
  if (watchId === null) {
    watchId = navigator.geolocation.watchPosition(async (loc) => {
      const param = {
        ...loc.coords,
        time: loc.timestamp,
      };
      await throttledPostGeoWithLocs();
      locs.push(param);
    }, (e) => console.log('watchPositino err: ', e), {
      distanceFilter: 30,
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 15000,
    });
  }
};

export const clearWatch = () => {
  if (watchId !== null && watchId !== undefined) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
};

export default {
  registerOn: () => {},
  checkStatus: () => {},
  configure: (driverId: any) => {console.log(driverId)},
  watchPosition,
  clearWatch,
}
