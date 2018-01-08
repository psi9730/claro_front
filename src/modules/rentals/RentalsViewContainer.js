// @flow

import {Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import Storage from '../../utils/easi6Storage';
import actions from '../../redux/actions';
import {RENTAL_DETAIL_SCREEN} from '../../../screens';
import RentalsView from './RentalsView';
import {makeGetVisibleRentals} from './RentalsState';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {url} from '../../utils/api';

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
      }
    }),
  )(lifecycle({
    componentDidMount() {
      const {t} = this.props;
      this.props.navigator.setDrawerEnabled({
        side: 'left',
        enabled: true,
      });
      this.props.rentalsRequest();

      Storage.getItem('driverId').then((driverId) => {
        if (!driverId) return null;
        BackgroundGeolocation.configure({
          desiredAccuracy: 10,
          stationaryRadius: 50,
          distanceFilter: 30,
          debug: process.env.NODE_ENV === 'development',
          startOnBoot: true,
          stopOnTerminate: false,
          locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
          interval: 10000,
          fastestInterval: 7000,
          activitiesInterval: 10000,
          stopOnStillActivity: false,
          url: url('/driver/geo'),
          httpHeaders: {
            Driver: `Driver ${driverId}`,
            Authorization: 'Basic ZWFzaTZhZG1pbjplYXNpNg==',
          },
        });

        BackgroundGeolocation.on('start', () => {
          console.log('[DEBUG] BackgroundGeolocation has been started');
        });
        BackgroundGeolocation.on('stop', () => {
          console.log('[DEBUG] BackgroundGeolocation has been stopped');
        });

        const requestAlert = () => {
          Alert.alert(
            t('Location services disabled'),
            t('Would you like to open location settings?'),
            [
              {
                text: t('Yes'),
                onPress: () => BackgroundGeolocation.showLocationSettings()
              },
              {
                text: t('No'),
                onPress: () => console.log('No Pressed'),
                style: 'cancel'
              }
            ]
          );
        };

        BackgroundGeolocation.on('authorization', status => {
          if (status !== BackgroundGeolocation.auth.AUTHORIZED) {
            requestAlert();
          }
        });

        BackgroundGeolocation.checkStatus(({ isRunning, authorization }) => {
          if (authorization === BackgroundGeolocation.auth.AUTHORIZED) {
            BackgroundGeolocation.start();
          } else {
            requestAlert();
          }
        });
      });
    }
  })(
    RentalsView
  ))
);
