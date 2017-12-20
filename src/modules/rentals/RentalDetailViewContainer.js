import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {lifecycle, compose, withHandlers} from 'recompose';
import View from './RentalDetailView';
import * as RentalsStateActions from './RentalsState';
import i18n from '../../utils/i18n';
import _ from 'lodash';

export default connect(
  (state, ownProps) => ({
    rental: _.filter(_.get(state, ['rentals', 'items']), {hash: ownProps.hash})[0],
    loading: _.get(state, ['rentals', 'loading']),
    t: i18n.getFixedT(),
  }),
  dispatch => {
    return {
      rentalsStateActions: bindActionCreators(RentalsStateActions, dispatch)
    };
  }
)(
  lifecycle({
    componentDidMount() {
      this.props.rentalsStateActions.rentalDetailRequest(this.props.hash);
    }
  })(
    View
  )
);
