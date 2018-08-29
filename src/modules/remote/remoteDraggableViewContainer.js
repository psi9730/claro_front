import {connect} from 'react-redux';
import actions from '../../redux/actions';
import RemoteView from './remoteDraggableView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
    jibunAddr:_.get(state, ['login','jibunAddr']),
    devices: _.get(state, ['registerDevice','devices']),
    StatusBackground: _.get(state, ['remote', 'StatusBackground']),
    Background: _.get(state, ['remote', 'Background']),
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
