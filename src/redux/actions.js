import {DriverTypes, DriverActions} from '../modules/driver/DriverState';
import {RentalTypes, RentalActions} from '../modules/rentals/RentalsState';

export {
  DriverTypes,
  RentalTypes,
}

export default actions = {
  ...DriverActions,
  ...RentalActions,
};
