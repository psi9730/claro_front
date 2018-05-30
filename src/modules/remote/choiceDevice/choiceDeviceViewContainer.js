import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import ChoiceDeviceView from './choiceDeviceView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';

import {KEYS} from '../../../utils/ClaroStorage';
import Storage from '../../../utils/ClaroStorage';

export default connect(
  state => ({
    devices: _.get(state, ['remote', 'devices']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    ChoiceDeviceView
  )
);