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
  TouchableHighlight,
  View
} from 'react-native';
import autoBind from 'react-autobind';
import toast from '../../../utils/toast';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import Plus from '../../../assets/images/plus.png'
import {REMOTE_SCREEN, REMOTE_DETAIL_SCREEN} from '../../../../screens';
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
  height: 100%
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;
const IconView = styled.View`
    flex-grow:1;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const GrayLineContainer = styled.View`
    display:flex;
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 30px;
    height: 30px;
    align-self: center; 
`;
const GrayLine = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    width: 30%;
    height: 4px; 
    background-color: gray;
`;





class RemoteBarView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    (async() => {
      const sterilizing = await Storage.getItem(KEYS.sterilizing);
      const AI = await Storage.getItem(KEYS.AI);
      const power = await Storage.getItem(KEYS.power);
      const airCleaning = await Storage.getItem(KEYS.airCleaning);
      if (sterilizing==null) {
        await Storage.setItem(KEYS.sterilizing, 0);
      }
      if (AI==null) {
        await Storage.setItem(KEYS.AI, 0);
      }
      if (power==null) {
        await Storage.setItem(KEYS.power, 0);
      }
      if (airCleaning==null) {
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
          onPress={RemoteBarView.dismissKeyboard}
          >
          <Container>
            <IconView >
              <Icon type='SimpleLineIcons' size={40} color = {this.props.powerColor} name='power' onPress={() => this.togglePower()}/>
              <Icon type='entypo'  size={40} color = {this.props.AIColor} name= 'air' onPress={() => this.toggleAI()}/>
              <Icon type='entypo'  size={40}  color = {this.props.sterilizingColor} name='bug' onPress={() => this.toggleSterilizing()}/>
              <Icon type='entypo'  size={40} color = {this.props.airCleaningColor} name='leaf' onPress={() => this.toggleAirCleaning()}/>
            </IconView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  RemoteBarView