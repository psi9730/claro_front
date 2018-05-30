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
  powerColor: string,
  AIColor: string,
  sterilizingColor: string,
  airCleaningColor: string,
  serialNumber: string,
  airCleaning: number,
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
 flex:1;
 height:100%;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;
const FunctionContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const TextContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const TextView = styled.Text`
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
    flex-basis: 70px;
    margin:20px;
    align-self: center;
`;


const IconView2 = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 30px;
`;
class RemoteDetailView extends Component<Props, State> {
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
  props: Props;
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
  toggleTimer(){

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
  goBack(){
    this.props.navigator.pop();
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={RemoteDetailView.dismissKeyboard}
        >
          <Container>
            <FunctionContainer>
              <IconView>
                <Icon type='SimpleLineIcons' size={40} color = {this.props.power===0 ? 'black' : 'blue'} name='power' onPress={() => this.togglePower()}/>
              </IconView>
              <TextContainer>
                {this.props.power===0?
                  (<Text style={{color : 'black'}}> 본체 전원: OFF </Text>) :
                  (<Text style={{color : 'blue'}}> 본체 전원: ON </Text>)}
                <TextView style={{color : this.props.powerColor}}> 네트워크:Connected</TextView>
              </TextContainer>
            </FunctionContainer>
            <FunctionContainer>
              <IconView>
                <Icon type='entypo'  size={40} color = {this.props.AI===0 ? 'black' : 'blue'} name= 'air' onPress={() => this.toggleAI()}/>
              </IconView>
              <TextContainer>
                {this.props.AI===0?
                  (<TextView style={{color : 'black'}}> AI 모드: OFF </TextView>) :
                  (<TextView style={{color : 'blue'}}> AI 모드: ON </TextView>)}
                <TextView style={{color :this.props.AI===0 ? 'black' : 'blue'}}> 미세먼지 오염도(PM10): 좋음</TextView>
                <TextView style={{color : this.props.AI===0 ? 'black' : 'blue'}}> 초미세먼지 오염도(PM2.5): 좋음</TextView>
                <TextView style={{color : this.props.AI===0 ? 'black' : 'blue'}}> VOCs 오염도: 좋음</TextView>
              </TextContainer>
            </FunctionContainer>
            <FunctionContainer>
              <IconView>
                <Icon type='entypo'  size={40}  color = {this.props.sterilizing===0 ? 'black' : (this.props.sterilizing===1 ? 'green' : 'blue')} name='bug' onPress={() => this.toggleSterilizing()}/>
              </IconView>
              <TextContainer>
                {this.props.sterilizing===0?
                  (<TextView style={{color : 'black'}}> 살균모드: OFF </TextView>) : (this.props.sterilizing===1 ? (<TextView style={{color : 'green'}}> 살균 모드: ON(약) </TextView>):(<TextView style={{color : 'blue'}}> 살균 모드: ON(강)</TextView>))
                  }
                <TextView style={{color : this.props.sterilizing===0 ? 'black' : (this.props.sterilizing===1 ? 'green' : 'blue')}}> VOCs 공기질: 오염</TextView>
              </TextContainer>
            </FunctionContainer>
            <FunctionContainer>
            <IconView>
              <Icon type='entypo'  size={40} color = {this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')} name='leaf' onPress={() => this.toggleAirCleaning()}/>
            </IconView>
            <TextContainer>
              {this.props.airCleaning===0?
                (<TextView style={{color : this.props.airCleaningColor}}> 공기 청정 모드: OFF </TextView>) : (this.props.airCleaning===1 ? (<TextView style={{color : this.props.airCleaningColor}}> 공기 청정 모드: ON(약) </TextView>):(<TextView> 공기 청정 모드: ON(강)</TextView>))
              }
              <TextView style={{color :this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')}}> 미세먼지 오염도(PM10): 좋음</TextView>
              <TextView style={{color : this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')}}> 초미세먼지 오염도(PM2.5): 좋음</TextView>
            </TextContainer>
          </FunctionContainer>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  RemoteDetailView
/*
<FunctionContainer>
<IconView>
<TouchableHighlight
onPress={() => this.toggleTimer()}
underlayColor="#f1f1f1">
  <Image
style={{width: 40, height: 40}}
source={timer}
/>
</TouchableHighlight>
</IconView>
<TextContainer>
  <TextView> Timer: OFF</TextView>
  <TextView> 꺼짐 예약 시간:</TextView>
  <TextView> 켜짐 예약 시간:</TextView>
</TextContainer>
</FunctionContainer>*/