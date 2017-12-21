import * as LoginStateActions from '../modules/login/LoginState';
import * as RentalsStateActions from '../modules/rentals/RentalsState';

export default actions = {
  ...LoginStateActions,
  ...RentalsStateActions,
};
