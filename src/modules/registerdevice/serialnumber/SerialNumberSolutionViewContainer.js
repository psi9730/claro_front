import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import SerialNumberSolutionView from './SerialNumberSolutionView2';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    barcode: _.get(state, ['registerDevice', 'barcode']),
    deviceInfo:_.get(state, ['registerDevice','deviceInfo'])
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    SerialNumberSolutionView
  )
);