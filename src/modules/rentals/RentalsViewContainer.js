// @flow

import {Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import FCM, {FCMEvent} from 'react-native-fcm';

import locationUtils from '../../utils/locationUtils';
import actions from '../../redux/actions';
import {RENTAL_DETAIL_SCREEN} from '../../../screens';
import RentalsView from './RentalsView';
import {makeGetVisibleRentals} from './RentalsState';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {postPushToken} from '../../utils/api';
import {getDriverId} from '../../utils/authentication';

export default connect(
  state => ({
    rentals: makeGetVisibleRentals()(state),
    loading: _.get(state, ['rentals', 'loading']),
  }),
  actions
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      onDetailItemPressed: (props) => (rentalNumber) => {
        props.navigator.push({
          ...RENTAL_DETAIL_SCREEN,
          passProps: {
            rentalNumber,
          },
        });
      },
      onRefreshCalled: (props) => () => {
        props.rentalsRequest('live');
      },
    }),
  )(lifecycle({
    componentDidMount() {
      const {navigator, rentalsRequest} = this.props;
      navigator.setDrawerEnabled({
        side: 'left',
        enabled: true,
      });
      rentalsRequest('live');
      this.notificationListener = FCM.on(FCMEvent.Notification, async () => {
        rentalsRequest('live');
      });

      FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
      Promise.all([FCM.getFCMToken(), FCM.getAPNSToken()]).then(tokens => {
        return postPushToken(...tokens);
      }).then((res) => {
        console.log('postPushToken res: ', res);
      }).catch((e) => {
        console.log('postPushToken error: ', e);
      });

      if (Platform.OS === 'android') {
        (async () => {
          const driverId = await getDriverId();
          if (!driverId) return null;
          locationUtils.configure(driverId);
          locationUtils.registerOn();
          locationUtils.checkStatus();
        })();
      }
    },
    componentWillUnmount() {
      this.notificationListener.remove();
    }
  })(
    RentalsView
  ))
);
