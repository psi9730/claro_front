import {connect} from 'react-redux';

import DrawerView from './DrawerView';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import {clearAuthenticationToken} from '../../utils/authentication';
import {LOGIN_SCREEN, RENTALS_SCREEN, PROFILE_SCREEN, PAST_RENTALS_SCREEN} from '../../../screens';
import actions from '../../redux/actions';

const hideDrawer = (props) => {
  props.navigator.toggleDrawer({
    side: 'left',
    animated: true,
    to: 'closed'
  });
};

export default connect(
  state => ({
    me: _.get(state, ['driver', 'me']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      goToProfile: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: PROFILE_SCREEN.screen});
      },
      goToRentals: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: RENTALS_SCREEN.screen});
      },
      goToPastRentals: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: PAST_RENTALS_SCREEN.screen});
      },
      logout: (props) => () => {
        (async () => {
          hideDrawer(props);
          await clearAuthenticationToken();
          props.navigator.handleDeepLink({link: LOGIN_SCREEN.screen});
        })();
      },
    })
  )(lifecycle({
    componentDidMount() {
      this.props.fetchMeRequest().then(() => {}).catch(() => {});
    }
  })(
    DrawerView
  ))
);
