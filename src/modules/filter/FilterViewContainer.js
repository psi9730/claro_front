import {connect} from 'react-redux';
import actions from '../../redux/actions';
import FilterView from './FilterView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    filterMaxTime: _.get(state, ['remote', 'filterMaxTime']),
    filterUsingTime: _.get(state, ['remote', 'filterUsingTime']),
    url: _.get(state, ['remote', 'url']),
    barcode: _.get(state,['registerDevice','barcode']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    FilterView
  )
);