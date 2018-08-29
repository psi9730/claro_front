import {connect} from 'react-redux';
import actions from '../../redux/actions';
import UserProfileView from './UserProfileView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';
export default connect(
  state => ({
    name: _.get(state, ['login', 'name']),
    login:_.get(state, ['login','login']),
    password:_.get(state, ['login','password']),
    phoneNumber:_.get(state, ['login','phoneNumber']),
    homeNumber:_.get(state, ['login','homeNumber']),
    email:_.get(state, ['login','email']),
    jibunAddr:_.get(state, ['login','jibunAddr']),
    roadAddr:_.get(state, ['login','roadAddr']),
    postcode:_.get(state, ['login','postcode']),
    facebookId:_.get(state, ['login','facebookId']),
    naverId:_.get(state, ['login','naverId']),
    detailLocation:_.get(state, ['login','detailLocation']),
    devices: _.get(state, ['registerDevice','devices']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    UserProfileView
  )
);
