import {connect} from 'react-redux';
import actions from '../../redux/actions';
import LocationSearchView from './LocationSearchView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps} from 'recompose';
// import {} from '../../../../screens';

export default connect(
  state => ({
    name: _.get(state, ['login', 'name']),
    login:_.get(state, ['login','login']),
    password:_.get(state, ['login','password']),
    phoneNumber:_.get(state, ['login','phoneNumber']),
    homeNumber:_.get(state, ['login','homeNumber']),
    email:_.get(state, ['login','email']),
    location:_.get(state, ['login','location']),
    locations:_.get(state, ['login','locations']),
    postcode:_.get(state, ['login','postcode']),
    detail_location:_.get(state, ['login','detail_location']),
    devices: _.get(state, ['registerDevice','devices']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    LocationSearchView
  )
);