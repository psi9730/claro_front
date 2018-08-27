import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import TimerView from './timerView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../../screens';

export default connect(
  state => ({
    nickname: _.get(state, ['registerDevice', 'nickname']),
    barcode: _.get(state,['registerDevice','barcode']),
    deviceInfo: _.get(state, ['registerDevice', 'deviceInfo']),
    power: _.get(state, ['remote', 'power']),
    sterilizing: _.get(state, ['remote', 'sterilizing']),
    airCleaning: _.get(state, ['remote', 'airCleaning']),
    AI: _.get(state, ['remote', 'AI']),
    isTurnOnActive: _.get(state,['remote','isTurnOnActive']),
    isTurnOffActive: _.get(state,['remote','isTurnOffActive']),
    turnOnDay: _.get(state,['remote','turnOnDay']),
    turnOnHour: _.get(state,['remote','turnOnHour']),
    minute: _.get(state,['remote','turnOnHour']).getMinutes(),
    hour: _.get(state,['remote','turnOnHour']).getHours() >= 12 ?  _.get(state,['remote','turnOnHour']).getHours()-12 :  _.get(state,['remote','turnOnHour']).getHours(),
    day: _.get(state,['remote','turnOnHour']).getHours() >= 12 ? '오후' : '오전',
    turnOffHour: _.get(state,['remote','turnOffHour']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    TimerView
  )
);
