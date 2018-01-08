import {connect} from 'react-redux';

import DrawerView from './DrawerView';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {compose, lifecycle, withHandlers} from 'recompose';
import {clearAuthenticationToken} from '../../utils/authentication';
import {LOGIN_SCREEN, RENTALS_SCREEN, PROFILE_SCREEN} from '../../../screens';
import actions from '../../redux/actions';

const hideDrawer = (props) => {
  props.navigator.toggleDrawer({
    side: 'left',
    animated: true,
    to: 'closed'
  });
};

export default connect(
  state => ({
    me: _.get(state, ['driver', 'me']),
    t: i18n.getFixedT(),
  }),
  actions,
)(
  compose(
    withHandlers({
      goToRentals: (props) => () => {
        hideDrawer(props);
        props.navigator.push({...RENTALS_SCREEN});
      },
      goToProfile: (props) => () => {
        hideDrawer(props);
        props.navigator.push({...PROFILE_SCREEN});
      },
      logout: (props) => () => {
        (async () => {
          hideDrawer(props);
          await clearAuthenticationToken();
          props.navigator.resetTo({...LOGIN_SCREEN});
        })();
      },
    })
  )(
    lifecycle({
      componentDidMount() {
        this.props.fetchMeRequest();
      }
    })(
      DrawerView
    )
  )
);
