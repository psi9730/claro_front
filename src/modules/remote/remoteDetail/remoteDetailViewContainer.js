import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import RemoteDetailView from './remoteDetailView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {KEYS} from '../../../utils/ClaroStorage';
import Storage from '../../../utils/ClaroStorage';

export default connect(
  state => ({
    power: _.get(state, ['remote', 'power']),
    sterilizing: _.get(state, ['remote', 'sterilizing']),
    airCleaning: _.get(state, ['remote', 'airCleaning']),
    AI: _.get(state, ['remote', 'AI']),
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
      togglePower_: (props) => (power,serialNumber) => {
        props.togglePowerRequest(power,serialNumber).then(()=>{
          if (power === 0)
            props.setPower('black');
          else if (power=== 1) {
            props.setPower('blue');
          }}). catch(()=> { console.log("claro can't toggle Power");});
      },
      toggleAI_: (props) => (AI,serialNumber) => {
        props.toggleAIRequest(AI,serialNumber).then(()=>{
          if (AI === 0)
            props.setAI('black');
          else if (AI === 1)
            props.setAI('green');
          else if (AI === 2)
            props.setAI('blue');
        }).catch(()=>{console.log("claro can't toggle AI")})},
      toggleSterilizing_: (props) => (sterilizing,serialNumber) => {
        props.toggleSterilizingRequest(sterilizing,serialNumber).then(()=>{
          if (sterilizing === 0) {
            props.setSterilizing('black');
          }
          else if (sterilizing === 1) {
            props.setSterilizing('green');
          }
          else if (sterilizing === 2)
            props.setSterilizing('blue');
        }).catch(()=>{console.log("claro can't toggle Sterilizing")})},
      toggleAirCleaning_: (props) => (airCleaning,serialNumber) => {
        props.toggleAirCleaningRequest(airCleaning,serialNumber).then(()=>{
          if (airCleaning === 0)
            props.setAirCleaning('black');
          else if (airCleaning === 1)
            props.setAirCleaning('green');
          else if (airCleaning === 2)
            props.setAirCleaning('blue');
        }).catch(()=>{console.log("claro can't toggle AirCleaning")})},
    }),
  )(
    RemoteDetailView
  )
);