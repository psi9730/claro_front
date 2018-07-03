import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import DeviceInfoView from './deviceInfoView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../../screens';

export default connect(
  state => ({
    nickname: _.get(state, ['registerDevice', 'nickname']),
    barcode: _.get(state,['registerDevice','barcode']),
    deviceInfo: _.get(state, ['registerDevice', 'deviceInfo']),
    isActive: _.get(state, ['registerDevice','isActivePush']),
    devices: _.get(state, ['registerDevice','devices'])
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    DeviceInfoView
  )
);