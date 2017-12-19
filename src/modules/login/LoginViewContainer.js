import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginView from './LoginView';
import * as LoginStateActions from './LoginState';
import i18n from '../../utils/i18n';

export default connect(
  state => ({
    user: state.getIn(['login', 'user']),
    loading: state.getIn(['login', 'loading']),
    t: i18n.getFixedT(),
  }),
  dispatch => {
    return {
      loginStateActions: bindActionCreators(LoginStateActions, dispatch)
    };
  }
)(LoginView);
