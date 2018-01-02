import * as DriverStateActions from '../modules/driver/DriverState';
import * as RentalsStateActions from '../modules/rentals/RentalsState';

export default actions = {
  ...DriverStateActions,
  ...RentalsStateActions,
};
