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
  togglePower_: Function,
  toggleAI_: Function,
  toggleSterilizing_: Function,
  toggleAirCleaning_: Function,
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
const IconView = styled.View`
  flex-direction: row;
  align-items: center;
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
      const sterilizing_ = await Storage.getItem(KEYS.sterilizing);
      const AI_ = await Storage.getItem(KEYS.AI);
      const power_ = await Storage.getItem(KEYS.power);
      const airCleaning_ = await Storage.getItem(KEYS.airCleaning);
      this.props.toggleSterilizing_(sterilizing_);
      this.props.toggleAI_(AI_);
      this.props.togglePower_(power_);
      this.props.toggleAirCleaning_(airCleaning_);
    })();
  }
  state: State = {
  };

  componentWillMount() {
    console.log("componentWillMount is implemented");
    (async() => {
      const sterilizing = await Storage.getItem(KEYS.sterilizing);
      const AI = await Storage.getItem(KEYS.AI);
      const power = await Storage.getItem(KEYS.power);
      const airCleaning = await Storage.getItem(KEYS.airCleaning);
      this.props.toggleSterilizing_(sterilizing);
      this.props.toggleAI_(AI);
      this.props.togglePower_(power);
      this.props.toggleAirCleaning_(airCleaning);
    })();
    //get indoor, outside Air Info
  }

  turnOffSterilizing(){
    this.props.toggleSterilizing_(0);
  }
  turnOffAirCleaning(){
    this.props.toggleAirCleaning_(0);
  }
  turnOffAI(){
    this.props.toggleAI_(0);
  }
  toggleAI() {
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.AI === 0) {    //turn off state
      console.log("AI is 0");
      this.props.toggleAI_(1);
      this.turnOffSterilizing();
      this.turnOffAirCleaning();
    }
    else if (this.props.AI === 1) { //turn on state
      this.props.toggleAI_(0);
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
      this.props.toggleSterilizing_(1);
    }
    else if(this.props.sterilizing === 1){
      this.props.toggleSterilizing_(2);
    }
    else if(this.props.sterilizing === 2){
      this.props.toggleSterilizing_(0);
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
      this.props.toggleAirCleaning_(1);
    }
    else if(this.props.airCleaning === 1){
      this.props.toggleAirCleaning_(2);
    }
    else if(this.props.airCleaning === 2){
      this.props.toggleAirCleaning_(0);
    }
  }

  togglePower(){
    console.log("POWER");
    if(this.props.power === 0){
      this.props.togglePower_(1);
      this.props.toggleAI_(1);
    }
    else if(this.props.power === 1){
      this.turnOffAI();
      this.turnOffAirCleaning();
      this.turnOffSterilizing();
      this.props.togglePower_(0);
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
            <IconView >
              <Icon type='SimpleLineIcons'  color = {this.props.powerColor} name='power' onPress={() => this.togglePower()}/>
              <Icon type='entypo'  color = {this.props.AIColor} name= 'air' onPress={() => this.toggleAI()}/>
              <Icon type='entypo'   color = {this.props.sterilizingColor} name='bug' onPress={() => this.toggleSterilizing()}/>
              <Icon type='entypo'  color = {this.props.airCleaningColor} name='leaf' onPress={() => this.toggleAirCleaning()}/>
            </IconView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  RemoteView