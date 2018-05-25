import {connect} from 'react-redux';
import actions from '../../redux/actions';
import RemoteView from './remoteDraggableView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';

import {KEYS} from '../../utils/ClaroStorage';
import Storage from '../../utils/ClaroStorage';
/*type withState = (
  stateName: string,
  stateUpdaterName: string,
  initialState: any | (props: Object) => any
) => HigherOrderComponent
*/
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
    RemoteView
  )
);