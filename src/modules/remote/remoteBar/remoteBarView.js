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
  View,
  Platform,
  Animated
} from 'react-native';
import autoBind from 'react-autobind';
import toast from '../../../utils/toast';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import up from '../../../assets/images/Arrowhead-01-128.png'
import down from '../../../assets/images/Arrowhead-Down-01-128.png'
import circleIcn from '../../../assets/images/circle.png'
import ElevatedView from 'react-native-elevated-view'
import {BorderShadow} from 'react-native-shadow'
import circleShadowIcn from '../../../assets/images/Circle-Shadow.jpg';
import powerIcn from '../../../assets/images/powerIcn.png';
import powerIcnGreen from '../../../assets/images/powerIcnGreen.png';
import upIcn from '../../../assets/images/upIcn.png';
import AIIcn from '../../../assets/images/AIIcn.png';
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
  height: number,
  _deltaY: number,
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
  flex:1;
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 20;
`;
const OuterContainer = styled.View`
 height:100%;
  flex:1;
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  `;

const IconText = styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis:auto;
    font-size: 10px;
    color: gray;
`;
const IconView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const IconViewContainer = styled.View`
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
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 1px;
    width: 100%;
    background-color: black;
    opacity:1;
    top:  0px;
`;





class RemoteBarView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.icons = {
      'up'    : up,
      'down'  : down
    };
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
    console.log("this.props.delta",this.props._deltaY);
    let icon = this.icons['up'];
    const shadowOpt = {
      color:"#000",
      border:2,
      height: 70,
      width:100,
      opacity:0.2,
      side: 'top',
    }
    return (
      Platform.OS ==='ios' ?(
            <Container style={{  shadowOffset: {width: 0, height: 2}}}>
              <Image source={upIcn} style={{position: 'absolute',alignSelf: 'center', top:-15,height:40, width:60, resizeMode:'stretch'}} />
            <IconViewContainer >
              <TouchableOpacity onPress={() => this.togglePower()}>
                <IconView>
                  {this.props.power===0 ?  <Image source={powerIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:40, width:40,marginBottom: 4, resizeMode:'stretch'}} /> :  <Image source={powerIcnGreen} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:40, width:40,marginBottom: 4, resizeMode:'stretch'}} />}
                  <IconText>전원</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleAI()}>
                <IconView>
                  <Image source={AIIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:40, width:40,marginBottom: 4, tintColor: 'black', resizeMode:'stretch'}} />
                  <IconText>AI</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSterilizing()}>
                <IconView>
                 <Icon type='entypo'  size={40}  color = {this.props.sterilizing===0 ? 'black' : (this.props.sterilizing===1 ? 'green' : 'blue')} name='bug' />
                  <IconText>살균</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
                <IconView>
                  <Icon type='entypo'  size={40} color = {this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')} name='leaf' />
                  <IconText>공기 청정</IconText>
                </IconView>
              </TouchableOpacity>
            </IconViewContainer>
          </Container>) :(
        <Container >
          <GrayLine style={{ opacity:0.1}}/>
          <GrayLine style={{opacity:0.2}}/>
          <GrayLine style={{opacity:0.3}}/>
          <GrayLine style={{opacity:0.4}}/>
          <GrayLine  style={{opacity:0.5}}/>
        <Animated.Image source={icon} style={{width: 30, height: 30, alignSelf:'center'}} />
        <IconViewContainer >
          <TouchableOpacity onPress={() => this.togglePower()}>
            <IconView>
              <Image source={powerIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:40, width:40,tintColor: 'black', resizeMode:'stretch'}} />
              <IconText>전원</IconText>
            </IconView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleAI()}>
            <IconView>
              <Icon type='entypo'  size={40} color = {this.props.AI===0 ? 'black' : 'blue'} name= 'air' />
              <IconText>AI</IconText>
            </IconView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleSterilizing()}>
            <IconView>
              <Icon type='entypo'  size={40}  color = {this.props.sterilizing===0 ? 'black' : (this.props.sterilizing===1 ? 'green' : 'blue')} name='bug' />
              <IconText>살균</IconText>
            </IconView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
            <IconView>
              <Icon type='entypo'  size={40} color = {this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')} name='leaf' />
              <IconText>공기 청정</IconText>
            </IconView>
          </TouchableOpacity>
        </IconViewContainer>
        </Container>
      )
    );
  }
}

export default  RemoteBarView