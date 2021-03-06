import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import _ from 'lodash';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';

import actions from '../../../redux/actions';
import ProfileView from './ProfileView';
import i18n from '../../../utils/i18n/index';

export default connect(
  state => ({
    loading: _.get(state, ['driver', 'loading']),
    user: _.get(state, ['driver', 'me']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      onEditPressed: (props) => (name, name_en, phone) => {
        props.editProfileRequest(name, name_en, phone);
        Keyboard.dismiss();
      }
    }),
  )(ProfileView)
);
