import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RentalsView from './RentalsView';
import * as RentalsStateActions from './RentalsState';
import i18n from '../../utils/i18n';
import _ from 'lodash';

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
)(RentalsView);
