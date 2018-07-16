import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import RemoteView from './AirStatusView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';

import {KEYS} from '../../../utils/ClaroStorage';
import Storage from '../../../utils/ClaroStorage';

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
    outerTotalGrade: _.get(state,['remote','outerTotalGrade']),
    outerNo2Value : _.get(state,['remote','outerNo2Value']),
    outerO3Value : _.get(state,['remote','outerO3Value']),
    outerPm10Value: _.get(state,['remote','outerPm10Value']),
    outerPm25Value : _.get(state,['remote','outerPm25Value']),
    outerSo2Value : _.get(state,['remote','outerSo2Value']),
    turnOffHour: _.get(state,['remote','turnOffHour']),
    jibunAddr:_.get(state, ['login','jibunAddr']),
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