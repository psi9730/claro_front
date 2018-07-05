import {connect} from 'react-redux';
import actions from '../../redux/actions';
import UserProfileView from './UserProfileView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
import {RENTALS_SCREEN} from '../../../screens';

export default connect(
  state => ({
    name: _.get(state, ['user', 'name']),
    login:_.get(state, ['user','login']),
    password:_.get(state, ['user','password']),
    phoneNumber:_.get(state, ['user','phoneNumber']),
    homeNumber:_.get(state, ['user','homeNumber']),
    email:_.get(state, ['user','email']),
    location:_.get(state, ['user','location']),
    location:_.get(state, ['user','location']),
    location:_.get(state, ['user','location']),
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