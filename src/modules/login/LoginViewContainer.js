import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoginView from './LoginView';
import * as LoginStateActions from './LoginState';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, withHandlers} from 'recompose';

export default connect(
  state => ({
    user: _.get(state, ['login', 'user']),
    loading: _.get(state, ['login', 'loading']),
    t: i18n.getFixedT(),
  }),
  dispatch => {
    return {
      requestLogin: (username, password) => {
        return dispatch(LoginStateActions.loginRequest(username, password));
      }
    };
  }
)(
  compose(
    withHandlers({
      onLoginPressed: (props) => (username, password) => {
        props.requestLogin(username, password).then(() => {
          props.navigator.resetTo({
            screen: 'easi6driver.RentalsScreen',
          });
        });
      }
    })
  )(LoginView)
);
