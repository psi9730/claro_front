import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import RemoteBarView from './remoteBarView';
import i18n from '../../../utils/i18n/index';
import _ from 'lodash';
import {compose, withHandlers, withProps, withState} from 'recompose';
export default connect(
  state => ({
    nickname: _.get(state, ['registerDevice', 'nickname']),
    barcode: _.get(state,['registerDevice','barcode']),
    deviceInfo: _.get(state, ['registerDevice', 'deviceInfo']),
    isActive: _.get(state, ['registerDevice','isActivePush']),
    devices: _.get(state, ['registerDevice','devices']),
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
        props.togglePowerRequest(power,serialNumber).then(()=> props.getControlDeviceRequest(serialNumber).catch((e)=>console.log(e))).catch(()=> { console.log("claro can't toggle Power");});
      },
      toggleAI_: (props) => (AI,serialNumber) => {
        props.toggleAIRequest(AI,serialNumber).catch(()=>{console.log("claro can't toggle AI")})},
      toggleSterilizing_: (props) => (sterilizing,serialNumber) => {
        props.toggleSterilizingRequest(sterilizing,serialNumber).catch(()=>{console.log("claro can't toggle Sterilizing")})},
      toggleAirCleaning_: (props) => (airCleaning,serialNumber) => {
        props.toggleAirCleaningRequest(airCleaning,serialNumber).catch(()=>{console.log("claro can't toggle AirCleaning")})},
    }),
  )(
    RemoteBarView
  )
);
