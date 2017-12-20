import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginView from './LoginView';
import * as LoginStateActions from './LoginState';
import i18n from '../../utils/i18n';
import _ from 'lodash';

export default connect(
  state => ({
    user: _.get(state, ['login', 'user']),
    loading: _.get(state, ['login', 'loading']),
    t: i18n.getFixedT(),
  }),
  dispatch => {
    return {
      loginStateActions: bindActionCreators(LoginStateActions, dispatch)
    };
  }
)(LoginView);
