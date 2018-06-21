import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import WifiMainView from './WifiMainView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../../screens';

export default connect(
  state => ({
    barcode: _.get(state, ['registerDevice', 'barcode']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    WifiMainView
  )
);