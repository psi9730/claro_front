import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers} from 'recompose';

import actions from '../../redux/actions';
import {RENTAL_DETAIL_SCREEN} from '../../../screens';
import RentalsView from './RentalsView';
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
  actions
)(
  compose(
    withHandlers({
      onDetailItemPressed: (props) => (hash) => {
        props.navigator.push({
          ...RENTAL_DETAIL_SCREEN,
          passProps: {
            hash,
          },
        });
      }
    })
  )(lifecycle({
    componentDidMount() {
      this.props.rentalsRequest();
      // navigator.geolocation.setRNConfiguration({skipPermissionRequests: false});
      // navigator.geolocation.requestAuthorization();
      navigator.geolocation.watchPosition(getPositionAndSave)
    }
  })(
    RentalsView
  ))
);
