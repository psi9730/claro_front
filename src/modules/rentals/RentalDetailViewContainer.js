import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import View from './RentalDetailView';
import actions from '../../redux/actions';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {openMapApp, openPhoneApp} from '../../utils/linkUtils';
import {makeGetVisibleRental} from './RentalsState';

export default connect(
  (state, ownProps) => ({
    rental: makeGetVisibleRental()(state, ownProps),
    loading: _.get(state, ['rentals', 'loading']),
  }),
  actions
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      openMap: () => openMapApp,
      openPhone: () => openPhoneApp,
    }),
  )(
    lifecycle({
      componentDidMount() {
        this.props.rentalDetailRequest(this.props.hash);
      }
    })(
      View
    )
  )
);
