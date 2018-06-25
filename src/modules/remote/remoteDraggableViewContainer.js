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
    location: _.get(state,['remote','location'])
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