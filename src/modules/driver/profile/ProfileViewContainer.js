import {connect} from 'react-redux';

import actions from '../../../redux/actions';
import ProfileView from './ProfileView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../../screens';

export default connect(
  state => ({
    loading: _.get(state, ['driver', 'loading']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      onEditPressed: (props) => (username, password) => {
        props.editProfileRequest(username, password).then(() => {
          props.navigator.resetTo({...RENTALS_SCREEN});
        });
      }
    }),
  )(ProfileView)
);
