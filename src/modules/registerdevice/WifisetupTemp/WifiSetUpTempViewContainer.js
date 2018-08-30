import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import WifiSetUpTempView from './WifiSetUpTempView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    ssidTemp: _.get(state, ['registerDevice', 'home', 'ssidTemp']),
    passwordTemp: _.get(state, ['registerDevice', 'home', 'passwordTemp']),
    ip: _.get(state, ['registerDevice', 'home', 'ip']),
    barcodeTemp: _.get(state,['registerDevice','barcodeTemp']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    WifiSetUpTempView
  )
);



