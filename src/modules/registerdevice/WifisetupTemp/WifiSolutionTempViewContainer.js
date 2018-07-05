import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import WifiSolutionTempView from './WifiSolutionTempView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../../screens';

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
    WifiSolutionTempView
  )
);