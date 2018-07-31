import {connect} from 'react-redux';
import actions from '../../redux/actions';
import DeviceSelectView from './WidgetView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    nickname: _.get(state, ['registerDevice', 'nickname']),
    barcode: _.get(state,['registerDevice','barcode']),
    deviceInfo: _.get(state, ['registerDevice', 'deviceInfo']),
    isActive: _.get(state, ['registerDevice','isActivePush']),
    devices: _.get(state, ['registerDevice','devices']),
    power: _.get(state, ['remote', 'power']),
    sterilizing: _.get(state, ['remote', 'sterilizing']),
    airCleaning: _.get(state, ['remote', 'airCleaning']),
    AI: _.get(state, ['remote', 'AI']),
    isTurnOnActive: _.get(state,['remote','isTurnOnActive']),
    isTurnOffActive: _.get(state,['remote','isTurnOffActive']),
    turnOnDay: _.get(state,['remote','turnOnDay']),
    sleepMode: _.get(state,['remote','sleepMode']),
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
    DeviceSelectView
  )
);