import {connect} from 'react-redux';
import actions from '../../redux/actions';
import RemoteView from './remoteDraggableView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';

import {KEYS} from '../../utils/ClaroStorage';
import Storage from '../../utils/ClaroStorage';

export default connect(
  state => ({
    date: _.get(state,['remote','date']),
    backgroundColor: _.get(state,['remote','backgroundColor']),
    location: _.get(state,['remote','location']),
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
    RemoteView
  )
);