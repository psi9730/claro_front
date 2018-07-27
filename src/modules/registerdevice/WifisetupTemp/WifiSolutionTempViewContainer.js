import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import WifiSolutionTempView from './WifiSolutionTempView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withProps} from 'recompose';

export default connect(
  state => ({
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),
  )(
    WifiSolutionTempView
  )
);