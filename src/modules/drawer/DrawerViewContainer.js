import {connect} from 'react-redux';

import DrawerView from './DrawerView';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import {clearAuthenticationToken} from '../../utils/authentication';
import {REMOTE_SCREEN, SERIAL_NUMBER_SCREEN, WIDGET_SCREEN, SIGNUP_SCREEN, USER_PROFILE_SCREEN, AIR_STATUS_SCREEN, CHOICE_DEVICE_SCREEN, DEVICE_SELECT_SCREEN, LOGIN_SCREEN, FILTER_SCREEN} from '../../../screens';
import actions from '../../redux/actions';
import {LoginManager} from 'react-native-fbsdk';

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
    nickname: _.get(state,['registerDevice','nickname'])
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      hideDrawerView: (props) => () => {
        hideDrawer(props);
      },
      goToAirStatus: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: AIR_STATUS_SCREEN.screen});
      },
      goToRemote: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: REMOTE_SCREEN.screen});
      },
      goToUserProfile: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: USER_PROFILE_SCREEN.screen});
      },
      goToChoiceDevice: (props) => () => {
        hideDrawer(props);
        console.log("I go to device Select")
        props.navigator.handleDeepLink({link: DEVICE_SELECT_SCREEN.screen})
      },
      goToFilter: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: FILTER_SCREEN.screen})
      },
      goToSetting: (props) => () => {
        hideDrawer(props);
        props.navigator.handleDeepLink({link: WIDGET_SCREEN.screen})
      },
      logout: (props) => () => {
        (async () => {
          hideDrawer(props);
          props.logoutRequest().then(()=>   (async()=>{    LoginManager.logOut(); await clearAuthenticationToken()})()).then(()=>
          props.navigator.handleDeepLink({link: SIGNUP_SCREEN.screen})).catch((e)=>console.log(e))
        })();
      },
    })
  )(lifecycle({
    componentDidMount() {
    }
  })(
    DrawerView
  ))
);
