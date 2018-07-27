import {connect} from 'react-redux';
import actions from '../../redux/actions';
import RemoteView from './remoteDraggableView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    backgroundColor: _.get(state,['remote','backgroundColor']),
    jibunAddr:_.get(state, ['login','jibunAddr']),
    devices: _.get(state, ['registerDevice','devices']),
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