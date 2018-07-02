import {connect} from 'react-redux';
import actions from '../../redux/actions';
import BarcodeScanView from './NavBarView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';

export default connect(
  state => ({
    loading: _.get(state, ['registerDevice', 'loading']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
    }),
  )(
    BarcodeScanView
  )
);