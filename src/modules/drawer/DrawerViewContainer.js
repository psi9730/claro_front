import {connect} from 'react-redux';

import DrawerView from './DrawerView';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import {clearAuthenticationToken} from '../../utils/authentication';
import {REMOTE_SCREEN, SERIAL_NUMBER_SCREEN, SIGNUP_SCREEN, CHOICE_DEVICE_SCREEN, DEVICE_SELECT_SCREEN, LOGIN_SCREEN, FILTER_SCREEN} from '../../../screens';
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
    barcode: _.get(state, ['registerDevice', 'barcode']),
    deviceInfo:_.get(state, ['registerDevice','deviceInfo']),
    nickname: _.get(state,['registerDevice','deviceInfo'])
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
     /* goToProfile: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: PROFILE_SCREEN.screen});
      },*/
      hideDrawerView: (props) => () => {
        hideDrawer(props);
      },
      goToRemote: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: REMOTE_SCREEN.screen});
      },
      goToRegisterDevice: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: SERIAL_NUMBER_SCREEN.screen})
      },
      goToChoiceDevice: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: DEVICE_SELECT_SCREEN.screen})
      },
      goToFilter: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: FILTER_SCREEN.screen})
      },
      goToLogin: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: SIGNUP_SCREEN.screen})
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
      // this.props.fetchMeRequest().then((
      // ) => {}).catch(() => {});
    }
  })(
    DrawerView
  ))
);
