import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import RegisterCompleteTempView from './RegisterCompleteTempView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    nicknameTemp: _.get(state, ['registerDevice', 'nicknameTemp']),
    barcodeTemp: _.get(state,['registerDevice','barcodeTemp']),
    deviceInfoTemp: _.get(state, ['registerDevice', 'deviceInfoTemp']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    RegisterCompleteTempView
  )
);