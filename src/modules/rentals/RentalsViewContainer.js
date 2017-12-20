import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {lifecycle, compose, withHandlers} from 'recompose';
import RentalsView from './RentalsView';
import * as RentalsStateActions from './RentalsState';
import i18n from '../../utils/i18n';
import _ from 'lodash';

const getPositionAndSave = () => {
  navigator.geolocation.getCurrentPosition((response) => {
    console.log('getCurrentPosition', response);
  })
};

export default connect(
  state => ({
    rentals: _.get(state, ['rentals', 'items']),
    loading: _.get(state, ['rentals', 'loading']),
    t: i18n.getFixedT(),
  }),
  dispatch => {
    return {
      rentalsStateActions: bindActionCreators(RentalsStateActions, dispatch)
    };
  }
)(
  compose(
    withHandlers({
      onDetailItemPressed: (props) => (hash) => {
        props.navigator.push({
          screen: 'easi6driver.RentalDetailScreen',
          passProps: {
            hash,
          },
        });
      }
    })
  )(lifecycle({
    componentDidMount() {
      this.props.rentalsStateActions.rentalsRequest();
      // navigator.geolocation.setRNConfiguration({skipPermissionRequests: false});
      // navigator.geolocation.requestAuthorization();
      navigator.geolocation.watchPosition(getPositionAndSave)
    }
  })(
    RentalsView
  ))
);
