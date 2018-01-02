// @flow

import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';

import actions from '../../redux/actions';
import {RENTAL_DETAIL_SCREEN} from '../../../screens';
import RentalsView from './RentalsView';
import {makeGetVisibleRentals} from './RentalsState';
import i18n from '../../utils/i18n';
import _ from 'lodash';

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
      onDetailItemPressed: (props) => (hash) => {
        props.navigator.push({
          ...RENTAL_DETAIL_SCREEN,
          passProps: {
            hash,
          },
        });
      }
    }),
  )(lifecycle({
    componentDidMount() {
      this.props.rentalsRequest();
    }
  })(
    RentalsView
  ))
);
