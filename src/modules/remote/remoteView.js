/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import autoBind from 'react-autobind';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer';
import toast from '../../utils/toast';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import Plus from '../../assets/images/plus.png'
// import {SERIAL_NUMBER_SCREEN} from '../../../screens';

type Props = {
  restoreOutsideAirInfo: Function,
  restoreIndoorAirInfo: Function,
  togglePower_: Function,
  toggleAI_: Function,
  toggleSterilizing_: Function,
  toggleAirCleaning_: Function,
  AI: number,
  sterilizing: number,
  power: number,
  serialNumber: string,
  airCleaning: number,
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 15px;
  padding-bottom: 5px;
`;
const TextView = styled.View`
    flex-grow:1;
    flex-shrink:0;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NavView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 45px;
`;

const RemoteText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

const GrayLineContainer = styled.View`
    display:flex;
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 25px;
    height: 25px;
    flex-direction: row;
    justify-content:center;
    align-items:center;
`;
const GrayLine = styled.View`
    flex-grow:5;
    flex-shrink:1;
    flex-basis: auto;
    height: 4px; 
    background-color: gray;
`;

const IconView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 30px;
`;

class RemoteView extends Component<Props, State> {
  constructor(props) {
    console.log("Constructor is implemented");
    super(props);
    autoBind(this);
    (async() => {
      const sterilizing = await Storage.getItem(KEYS.sterilizing);
      const AI = await Storage.getItem(KEYS.AI);
      const power = await Storage.getItem(KEYS.power);
      const airCleaning = await Storage.getItem(KEYS.airCleaning);
      if (sterilizing==null) {
        console.log("!!!");
        await Storage.setItem(KEYS.sterilizing, 0);
      }
      if (AI==null) {
        console.log("!!!!");
        await Storage.setItem(KEYS.AI, 0);
      }
      if (power==null) {
        console.log("!!!!!");
        await Storage.setItem(KEYS.power, 0);
      }
      if (airCleaning==null) {
        console.log("!!!!!!");
        await Storage.setItem(KEYS.airCleaning, 0);
      }
      const serialNumber = await Storage.getItem(KEYS.serialNumber);
      this.setState({serialNumber: serialNumber});
      const sterilizing_ = await Storage.getItem(KEYS.sterilizing);
      const AI_ = await Storage.getItem(KEYS.AI);
      const power_ = await Storage.getItem(KEYS.power);
      const airCleaning_ = await Storage.getItem(KEYS.airCleaning);
      console.log("this.state.serialNumber",this.state.serialNumber);
      this.props.toggleSterilizing_(sterilizing_, this.state.serialNumber);
      this.props.toggleAI_(AI_, this.state.serialNumber);
      this.props.togglePower_(power_, this.state.serialNumber);
      this.props.toggleAirCleaning_(airCleaning_, this.state.serialNumber);
    })();
  }
  state: State = {
  };

  componentWillMount() {
    console.log("componentWillMount is implemented");
    (async() => {
      const serialNumber = await Storage.getItem(KEYS.serialNumber);
      this.setState({serialNumber: serialNumber});
      const sterilizing = await Storage.getItem(KEYS.sterilizing);
      const AI = await Storage.getItem(KEYS.AI);
      const power = await Storage.getItem(KEYS.power);
      const airCleaning = await Storage.getItem(KEYS.airCleaning);
      this.props.toggleSterilizing_(sterilizing, this.state.serialNumber);
      this.props.toggleAI_(AI, this.state.serialNumber);
      this.props.togglePower_(power, this.state.serialNumber);
      this.props.toggleAirCleaning_(airCleaning, this.state.serialNumber);
    })();
    //get indoor, outside Air Info
  }

  turnOffSterilizing(){
    this.props.toggleSterilizing_(0, this.state.serialNumber);
  }
  turnOffAirCleaning(){
    this.props.toggleAirCleaning_(0, this.state.serialNumber);
  }
  turnOffAI(){
    this.props.toggleAI_(0, this.state.serialNumber);
  }
  toggleAI() {
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.AI === 0) {    //turn off state
      console.log("AI is 0");
      this.props.toggleAI_(1, this.state.serialNumber);
      this.turnOffSterilizing();
      this.turnOffAirCleaning();
    }
    else if (this.props.AI === 1) { //turn on state
      this.props.toggleAI_(0, this.state.serialNumber);
    }
  }

  toggleSterilizing(){
    console.log("Sterilizing");
    console.log(this.props.sterilizing);
    console.log(this.props.sterilizingColor);
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.sterilizing === 0){
      console.log("sterilizing is 0");
      this.turnOffAI();
      this.turnOffAirCleaning();
      this.props.toggleSterilizing_(1, this.state.serialNumber);
    }
    else if(this.props.sterilizing === 1){
      this.props.toggleSterilizing_(2, this.state.serialNumber);
    }
    else if(this.props.sterilizing === 2){
      this.props.toggleSterilizing_(0, this.state.serialNumber);
    }
  }

  toggleAirCleaning(){
    console.log("AirCleaning");
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.airCleaning === 0){
      this.turnOffAI();
      this.turnOffSterilizing();
      this.props.toggleAirCleaning_(1, this.state.serialNumber);
    }
    else if(this.props.airCleaning === 1){
      this.props.toggleAirCleaning_(2, this.state.serialNumber);
    }
    else if(this.props.airCleaning === 2){
      this.props.toggleAirCleaning_(0, this.state.serialNumber);
    }
  }

  togglePower(){
    console.log("POWER");
    if(this.props.power === 0){
      this.props.togglePower_(1, this.state.serialNumber);
      this.props.toggleAI_(1, this.state.serialNumber);
    }
    else if(this.props.power === 1){
      this.turnOffAI();
      this.turnOffAirCleaning();
      this.turnOffSterilizing();
      this.props.togglePower_(0, this.state.serialNumber);
    }
  }


  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  props: Props;

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={RemoteView.dismissKeyboard}
        >
          <Container>
            <TextView>
              <RemoteText> {this.props.t('indoorAirInfo')} </RemoteText>
              <RemoteText> {this.props.t('totalAirClean')}</RemoteText>
              <RemoteText> {this.props.t('fineDust')}</RemoteText>
              <RemoteText> {this.props.t('ultraFineDust')}</RemoteText>
              <RemoteText> {this.props.t('GAS_VOCs')}</RemoteText>
              <RemoteText> {this.props.t('outsideAirInfo')} </RemoteText>
              <RemoteText> 금천구 가산동 </RemoteText>
              <RemoteText> 미세먼지PM10: 138ug/m' </RemoteText>
              <RemoteText> 오존: 0.035 ppm </RemoteText>
              <RemoteText> 이산화질소: 0.016 ppm </RemoteText>
              <RemoteText> 일산화탄소: 0.3 ppm </RemoteText>
              <RemoteText> 아황산가스: 0.004 ppm </RemoteText>
            </TextView>
            <GrayLineContainer>
              <GrayLine/>
              <IconView>
                <TouchableHighlight
                  onPress={()=> this.goToRemoteView()}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={Plus}
                  />
                </TouchableHighlight>
              </IconView>
              <GrayLine/>
            </GrayLineContainer>
            <NavView>
              <RemoteBarView />
            </NavView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  RemoteView