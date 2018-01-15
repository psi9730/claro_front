// @flow

import {DriverActions, DriverTypes} from '../modules/driver/DriverState';
import {RentalActions, RentalTypes} from '../modules/rentals/RentalsState';

export {
  DriverTypes,
  RentalTypes,
}

export default actions = {
  ...DriverActions,
  ...RentalActions,
};
