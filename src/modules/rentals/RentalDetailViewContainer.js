import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers, withProps} from 'recompose';
import View from './RentalDetailView';
import actions from '../../redux/actions';
import i18n from '../../utils/i18n';
import _ from 'lodash';
import {openMapApp} from '../../utils/naviUtils';

export default connect(
  (state, ownProps) => ({
    rental: _.filter(_.get(state, ['rentals', 'items']), {hash: ownProps.hash})[0],
    loading: _.get(state, ['rentals', 'loading']),
  }),
  actions
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
    withHandlers({
      openMap: (props) => openMapApp,
    }),
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
