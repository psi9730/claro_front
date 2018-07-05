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
    nicknameTemp: _.get(state, ['registerDevice', 'nicknameTemp']),
    barcode: _.get(state,['registerDevice','barcode']),
    deviceInfo: _.get(state, ['registerDevice', 'deviceInfo']),
    isActive: _.get(state, ['registerDevice','isActivePush']),
    devices: _.get(state, ['registerDevice','devices']),
    power: _.get(state, ['remote', 'power']),
    sterilizing: _.get(state, ['remote', 'sterilizing']),
    airCleaning: _.get(state, ['remote', 'airCleaning']),
    AI: _.get(state, ['remote', 'AI']),
    isTurnOnActive: _.get(state,['remote','isTurnOnActive']),
    sleepMode: _.get(state,['remote','sleepMode']),
    isTurnOffActive: _.get(state,['remote','isTurnOffActive']),
    turnOnDay: _.get(state,['remote','turnOnDay']),
    turnOnHour: _.get(state,['remote','turnOnHour']),
    turnOffHour: _.get(state,['remote','turnOffHour']),
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