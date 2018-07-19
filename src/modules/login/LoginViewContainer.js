import {connect} from 'react-redux';
import actions from '../../redux/actions';
import LoginView from './LoginView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../screens';

export default connect(
  state => ({
    loading: _.get(state, ['registerDevice', 'loading']),
    devices: _.get(state, ['registerDevice','devices']),
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
    LoginView
  )
);
