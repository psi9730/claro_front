import {post} from './api';

const geoArr = [];

export const getPositionAndSave = () => {
  navigator.geolocation.getCurrentPosition((response) => {
    geoArr.push(response);
    post(`/driver/geo`, {g: geoArr}).then(null).catch(null);
  });
};
