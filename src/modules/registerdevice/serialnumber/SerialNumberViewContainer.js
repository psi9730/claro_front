import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import SerialNumberView from './SerialNumberView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    barcode: _.get(state, ['registerDevice', 'barcode']),
    deviceInfo:_.get(state, ['registerDevice','deviceInfo']),
    devices: _.get(state, ['registerDevice','devices']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    SerialNumberView
  )
);