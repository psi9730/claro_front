import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {lifecycle, compose, withHandlers} from 'recompose';
import View from './RentalDetailView';
import actions from '../../redux/actions';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {openMapApp} from '../../utils/naviUtils';

export default connect(
  (state, ownProps) => ({
    rental: _.filter(_.get(state, ['rentals', 'items']), {hash: ownProps.hash})[0],
    loading: _.get(state, ['rentals', 'loading']),
    t: i18n.getFixedT(),
  }),
  actions
)(
  compose(
    withHandlers({
      openMap: (props) => openMapApp,
    })
  )(
    lifecycle({
      componentDidMount() {
        this.props.rentalDetailRequest(this.props.hash);
      }
    })(
      View
    )
  )
);
