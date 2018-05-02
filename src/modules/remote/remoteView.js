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
import toast from '../../utils/toast';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
// import {SERIAL_NUMBER_SCREEN} from '../../../screens';

type Props = {
  restoreOutsideAirInfo: Function,
  restoreIndoorAirInfo: Function,
  togglePower: Function,
  toggleAI: Function,
  toggleSterilizing: Function,
  toggleAirCleaning: Function,
  AI: number,
  sterilizing: number,
  power: number,
  airCleaning: number,
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 15px;
  padding-bottom: 35px;
`;

const RemoteText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

const GrayLine = styled.View`
  height: 2px;
  width: 70%;
  background-color: gray;
`;


class RemoteView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    (async() => {
      await Storage.setItem(KEYS.sterilizing, 0);
      await Storage.setItem(KEYS.AI,0);
      await Storage.setItem(KEYS.power, 0);
      await Storage.setItem(KEYS.airCleaning,0);
    })();
  }
  state: State = {
  };

  componentWillMount() {
    this.props.toggleSterilizing(Storage.getItem(KEYS.sterilizing));
    this.props.toggleAI(Storage.getItem(KEYS.AI));
    this.props.togglePower(Storage.getItem(KEYS.power));
    this.props.toggleAirCleaning(Storage.getItem(KEYS.airCleaning));
    //get indoor, outside Air Info
  }

  turnOffSterilizing(){
    this.props.toggleSterilizing(0);
  }
  turnOffAirCleaning(){
    this.props.toggleAirCleaning(0);
  }
  turnOffAI(){
    this.props.toggleAI(0);
  }
  toggleAI() {
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.AI === 0) {    //turn off state
      console.log("AI is 0");
      this.props.toggleAI(1);
      this.turnOffSterilizing();
      this.turnOffAirCleaning();
    }
    else if (this.props.AI === 1) { //turn on state
      this.props.toggleAI(0);
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
      this.props.toggleSterilizing(1);
    }
    else if(this.props.sterilizing === 1){
      this.props.toggleSterilizing(2);
    }
    else if(this.props.sterilizing === 2){
      this.props.toggleSterilizing(0);
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
      this.props.toggleAirCleaning(1);
    }
    else if(this.props.airCleaning === 1){
      this.props.toggleAirCleaning(2);
    }
    else if(this.props.airCleaning === 2){
      this.props.toggleAirCleaning(0);
    }
  }

  togglePower(){
    console.log("POWER");
    if(this.props.power === 0){
      this.props.togglePower(1);
      this.props.toggleAI(1);
    }
    else if(this.props.power === 1){
      this.turnOffAI();
      this.turnOffAirCleaning();
      this.turnOffSterilizing();
      this.props.togglePower(0);
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
              <GrayLine/>
              <Icon type='SimpleLineIcons'  color = {this.props.powerColor} name='power' onPress={() => this.togglePower()}/>
              <Icon type='entypo'  color = {this.props.AIColor} name= 'air' onPress={() => this.toggleAI()}/>
              <Icon type='entypo'   color = {this.props.sterilizingColor} name='bug' onPress={() => this.toggleSterilizing()}/>
              <Icon type='entypo'  color = {this.props.airCleaningColor} name='leaf' onPress={() => this.toggleAirCleaning()}/>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  RemoteView