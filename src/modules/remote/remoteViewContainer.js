import {connect} from 'react-redux';
import actions from '../../redux/actions';
import RemoteView from './remoteView';
import i18n from '../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';

export default connect(
  state => ({
    power: _.get(state, ['remote', 'power']),
    pm10: _.get(state, ['remote', 'pm10']),
    pm25: _.get(state, ['remote', 'pm25']),
    vocs: _.get(state, ['remote', 'vocs']),
    indoorPm10: _.get(state, ['remote', 'indoorPm10']),
    indoorPm25: _.get(state, ['remote', 'indoorPm25']),
    indoorVoc: _.get(state, ['remote', 'indoorVoc']),
    indoorPm10Color: _.get(state, ['remote', 'indoorPm10Color']),
    indoorPm25Color: _.get(state, ['remote', 'indoorPm25Color']),
    indoorVocColor: _.get(state, ['remote', 'indoorVocColor']),
    StatusBackground: _.get(state, ['remote', 'StatusBackground']),
    Background: _.get(state, ['remote', 'Background']),
    indoorAirGrade: _.get(state, ['remote', 'indoorAirGrade']),
    sterilizing: _.get(state, ['remote', 'sterilizing']),
    airCleaning: _.get(state, ['remote', 'airCleaning']),
    AI: _.get(state, ['remote', 'AI']),
    date: _.get(state,['remote','date']),
    barcode: _.get(state,['registerDevice','barcode']),
    backgroundColor: _.get(state,['remote','backgroundColor']),
    location: _.get(state,['remote','location']),
    jibunAddr:_.get(state, ['login','jibunAddr']),
    outerTotalGrade: _.get(state,['remote','outerTotalGrade']),
    outerNo2Value : _.get(state,['remote','outerNo2Value']),
    outerO3Value : _.get(state,['remote','outerO3Value']),
    outerCoValue: _.get(state, ['remote','outerCoValue']),
    outerPm10Value: _.get(state,['remote','outerPm10Value']),
    outerPm25Value : _.get(state,['remote','outerPm25Value']),
    outerSo2Value : _.get(state,['remote','outerSo2Value']),
  }),
  actions,
)(
  compose(
    withProps({
      t: i18n.getFixedT(),
    }),

    withState('powerColor', 'setPower', 'black'),
    withState('AIColor', 'setAI', 'black'),
    withState('sterilizingColor', 'setSterilizing', 'black'),
    withState('airCleaningColor', 'setAirCleaning', 'black'),
    withHandlers({
    }),
  )(
    RemoteView
  )
);
