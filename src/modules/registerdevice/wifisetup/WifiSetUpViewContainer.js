import {connect} from 'react-redux';
import actions from '../../redux/actions';
import WifiSetUpView from './WifiSetUpView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../screens';

export default connect(
  state => ({
    ssid: _.get(state, ['registerDevice', 'home', 'ssid']),
    password: _.get(state, ['registerDevice', 'home', 'password']),
    ip: _.get(state, ['registerDevice', 'home', 'ip']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    WifiSetUpView
  )
);