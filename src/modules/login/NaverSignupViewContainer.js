import {connect} from 'react-redux';
import actions from '../../redux/actions';
import NaverSignupView from './NaverSignupView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';

export default connect(
  state => ({
    loading: _.get(state, ['registerDevice', 'loading']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      onLoginPressed: (props) => (username, password) => {
        /*props.loginRequest(username, password).then(() => {
           props.navigator.resetTo({...RENTALS_SCREEN});
         }).catch((err) => {
           console.log('err', err);
         }); */
      }
    }),
  )(
    NaverSignupView
  )
);