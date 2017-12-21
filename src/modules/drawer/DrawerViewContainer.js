import {connect} from 'react-redux';

import DrawerView from './DrawerView';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, withHandlers} from 'recompose';
import {clearAuthenticationToken} from '../../utils/authentication';
import {LOGIN_SCREEN, RENTALS_SCREEN} from '../../../screens';

const hideDrawer = (props) => {
  props.navigator.toggleDrawer({
    side: 'left',
    animated: true,
    to: 'closed'
  });
};

export default connect(
  state => ({
    user: _.get(state, ['login', 'user']),
    t: i18n.getFixedT(),
  }),
  null,
)(
  compose(
    withHandlers({
      goToRentals: (props) => () => {
        hideDrawer(props);
        props.navigator.push(RENTALS_SCREEN);
      },
      logout: (props) => () => {
        (async () => {
          hideDrawer(props);
          await clearAuthenticationToken();
          props.navigator.resetTo(LOGIN_SCREEN);
        })();
      },
    })
  )(DrawerView)
);
