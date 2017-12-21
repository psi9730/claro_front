import {connect} from 'react-redux';

import actions from '../../redux/actions';
import LoginView from './LoginView';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, withHandlers} from 'recompose';
import {RENTALS_SCREEN} from '../../../screens';

export default connect(
  state => ({
    user: _.get(state, ['login', 'user']),
    loading: _.get(state, ['login', 'loading']),
    t: i18n.getFixedT(),
  }),
  actions,
)(
  compose(
    withHandlers({
      onLoginPressed: (props) => (username, password) => {
        props.loginRequest(username, password).then(() => {
          props.navigator.resetTo(RENTALS_SCREEN);
        });
      }
    })
  )(LoginView)
);
