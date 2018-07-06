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
import powerIcn from '../../../assets/images/powerIcn.png';
import upIcn from '../../../assets/images/upIcn.png';
import AIIcn from '../../../assets/images/AIIcn.png';
import downIcn from '../../../assets/images/downIcn.png';
import AIIcnBlue from '../../../assets/images/AIIcnBlue.png';
import powerIcnGreen from '../../../assets/images/powerIcnGreen.png';
import sleepIcnBlue from '../../../assets/images/sleepIcnBlue.png';
import sleepIcn from '../../../assets/images/sleepIcn.png';
import timerIcnBlue from '../../../assets/images/timerIcnBlue.png';
import timerIcn from '../../../assets/images/timerIcn.png';
import {TIMER_SCREEN} from '../../../../screens';
type Props = {
  restoreOutsideAirInfo: Function,
  restoreIndoorAirInfo: Function,
  togglePower_: Function,
  toggleAI_: Function,
  toggleSterilizing_: Function,
  toggleAirCleaning_: Function,
  toggleSleepRequest: Function,
  AI: number,
  sterilizing: number,
  power: number,
  powerColor: string,
  AIColor: string,
  sterilizingColor: string,
  airCleaningColor: string,
  serialNumber: string,
  airCleaning: number,
  sleepMode:number,
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
const CenterContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`
const BottomFunctionContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-self: stretch;
    marginTop: 5px;
    marginBottom:5px;
`

const TextContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    marginRight:10px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
const TextRowContainer = styled.View`
     flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    margin-bottom:4px;
    margin-right:30px;
    align-items:center;
`
const TextView = styled.Text`
    flex:1;
    text-align:left;
    text-align-vertical;
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
  height: 2px;
  background-color: gray;
  opacity:0.5;
  align-self:stretch;
  marginRight:20px;
  marginLeft:20px;
`;
const IconView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 70px;
    margin:15px;
    align-self: center;
`;
const IconText = styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis:auto;
    font-size: 16px;
    color: gray;
    font-weight: bold;
`;
const RemoteText = styled.Text`
`
const TextRightView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
    margin-right:10px;
`;
const RemoteContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    marginBottom:10px;
    marginLeft:10px;
    marginRight:0px;
`;
const TextLeftView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const IconView2 = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
class RemoteDetailView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  state: State = {
  };
  props: Props;
  componentWillMount() {
    (async() => {
      if(this.props.isChange===false) {
        const sterilizing = await Storage.getItem(KEYS.sterilizing);
        const AI = await Storage.getItem(KEYS.AI);
        const power = await Storage.getItem(KEYS.power);
        const airCleaning = await Storage.getItem(KEYS.airCleaning);
        this.props.toggleSterilizing_(sterilizing, this.state.serialNumber);
        this.props.toggleAI_(AI, this.state.serialNumber);
        this.props.togglePower_(power, this.state.serialNumber);
        this.props.toggleAirCleaning_(airCleaning, this.state.serialNumber);
      }
    })();
  }

  turnOffSterilizing(){
    this.props.toggleSterilizing_(0, this.props.barcode).catch();
  }
  turnOffAirCleaning(){
    this.props.toggleAirCleaning_(0,this.props.barcode).catch();
  }
  turnOffAI(){
    this.props.toggleAI_(0,this.props.barcode).catch();
  }
  turnOffSleep(){
    this.props.toggleSleepRequest(0,this.props.barcode).catch();
  }
  toggleTimer(){
    this.props.navigator.push({
      ...TIMER_SCREEN,
    });

  }
  toggleSleep(){
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.sleepMode === 1) { //turn on state
    } else {
      this.props.toggleSleepRequest(1, this.props.barcode).catch();
      this.turnOffSterilizing();
      this.turnOffAirCleaning();
      this.turnOffAI();
    }
  }
  toggleAI() {
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.AI === 0) {    //turn off state
      console.log("AI is 0");
      this.props.toggleAI_(1, this.props.barcode);
      this.turnOffSterilizing();
      this.turnOffSleep();
      this.turnOffAirCleaning();
    }
    else if (this.props.AI === 1) { //turn on state
      this.props.toggleAI_(0, this.props.barcode);
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
      this.turnOffSleep();
      this.turnOffAirCleaning();
      this.props.toggleSterilizing_(1, this.props.barcode);
    }
    else if(this.props.sterilizing === 1){
      this.props.toggleSterilizing_(2, this.props.barcode);
    }
    else if(this.props.sterilizing === 2){
      this.props.toggleSterilizing_(0,this.props.barcode);
    }
  }

  toggleAirCleaning(){
    if(this.props.power===0){
      toast("Power is Off");
    }
    else if (this.props.airCleaning === 0){
      this.turnOffAI();
      this.turnOffSleep();
      this.turnOffSterilizing();
      this.props.toggleAirCleaning_(1,this.props.barcode);
    }
    else if(this.props.airCleaning === 1){
      this.props.toggleAirCleaning_(2, this.props.barcode);
    }
    else if(this.props.airCleaning === 2){
      this.props.toggleAirCleaning_(0,this.props.barcode);
    }
  }
  togglePower(){
    if(this.props.power === 0){
      this.props.togglePower_(1, this.props.barcode);
      this.props.toggleAI_(1, this.props.barcode);
    }
    else if(this.props.power === 1){
      this.turnOffAI();
      this.turnOffAirCleaning();
      this.turnOffSleep();
      this.turnOffSterilizing();
      this.props.togglePower_(0, this.props.barcode);
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
            <CenterContainer>
              <Image source={downIcn} style={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                height: 20,
                width: 30,
                marginTop:10,
                marginBottom: 10,
                resizeMode: 'stretch'
              }}/>
              <TouchableOpacity onPress={() => this.togglePower()}>
                { this.props.power===0?
                  <IconView2>
                    <Image source={powerIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                    <IconText style={{color: 'black'}}>꺼짐</IconText>
                  </IconView2> :  <IconView2>
                    <Image source={powerIcnGreen} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                    <IconText>연결됨</IconText>
                  </IconView2>
                }
              </TouchableOpacity>
            </CenterContainer>
            <GrayLine/>
            <FunctionContainer>
              <IconView>
              <TouchableOpacity onPress={() => this.toggleAI()}>
                { this.props.AI===0?
                  <IconView2>
                    <Image source={AIIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  </IconView2> :  <IconView2>
                    <Image source={AIIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:50,
                      width:50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  </IconView2>
                }
              </TouchableOpacity>
              </IconView>
              <TextContainer>
                {this.props.AI===0?
                  (<RemoteContainer><TextLeftView ><RemoteText style={{color : 'black'}}>AI 모드: </RemoteText></TextLeftView>
                    <TextRightView><RemoteText>OFF</RemoteText></TextRightView></RemoteContainer>):
                  (<RemoteContainer>
                    <TextLeftView >
                      <RemoteText  style={{color :this.props.AI===0 ? 'black' : 'blue'}}>AI 모드: </RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText>ON</RemoteText>
                    </TextRightView>
                  </RemoteContainer>)}
                <RemoteContainer>
                  <TextLeftView>
                    <RemoteText style={{color :this.props.AI===0 ? 'black' : 'blue'}}>미세먼지 오염도(PM10):</RemoteText>
                  </TextLeftView>
                  <TextRightView>
                    <RemoteText>좋음</RemoteText>
                  </TextRightView>
                </RemoteContainer>
                <RemoteContainer >
                  <TextLeftView>
                    <RemoteText  style={{color : this.props.AI===0 ? 'black' : 'blue'}}>초미세먼지 오염도(PM2.5):</RemoteText>
                  </TextLeftView>
                  <TextRightView>
                    <RemoteText>좋음</RemoteText>
                  </TextRightView>
                </RemoteContainer>
                <RemoteContainer >
                  <TextLeftView>
                    <RemoteText style={{color : this.props.AI===0 ? 'black' : 'blue'}}>VOCs 오염도:</RemoteText>
                  </TextLeftView>
                  <TextRightView>
                    <RemoteText>좋음</RemoteText>
                  </TextRightView>
                </RemoteContainer>
              </TextContainer>
            </FunctionContainer>
            <GrayLine/>
            <FunctionContainer>
              <IconView>
                <Icon type='entypo'  size={40}  color = {this.props.sterilizing===0 ? 'black' : (this.props.sterilizing===1 ? 'green' : 'blue')} name='bug' onPress={() => this.toggleSterilizing()}/>
              </IconView>
              <TextContainer>
                {this.props.sterilizing===0?
                  (<RemoteContainer>
                    <TextLeftView>
                      <RemoteText style={{color : 'black'}}>살균모드:</RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText>OFF</RemoteText>
                    </TextRightView>
                  </RemoteContainer>)
                  : (this.props.sterilizing===1 ? (
                    <RemoteContainer>
                      <TextLeftView >
                        <RemoteText  style={{color : 'green'}}>살균 모드:</RemoteText>
                      </TextLeftView>
                      <TextRightView>
                        <RemoteText>ON(약)</RemoteText>
                      </TextRightView>
                    </RemoteContainer>):(
                      <RemoteContainer >
                        <TextLeftView>
                          <RemoteText  style={{color : 'blue'}} >살균 모드:</RemoteText>
                        </TextLeftView>
                        <TextRightView>
                          <RemoteText>ON(강)</RemoteText>
                        </TextRightView>
                      </RemoteContainer>))
                  }
                <RemoteContainer>
                  <TextLeftView>
                    <RemoteText  style={{color : this.props.sterilizing===0 ? 'black' : (this.props.sterilizing===1 ? 'green' : 'blue')}}>VOCs 공기질:</RemoteText>
                  </TextLeftView>
                  <TextRightView>
                    <RemoteText>오염</RemoteText>
                  </TextRightView>
                </RemoteContainer>
              </TextContainer>
            </FunctionContainer>
            <GrayLine/>
            <FunctionContainer>
              <IconView>
              <Icon type='entypo'  size={40} color = {this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')} name='leaf' onPress={() => this.toggleAirCleaning()}/>
            </IconView>
              <TextContainer>
                {this.props.airCleaning===0?
                  (<RemoteContainer>
                    <TextLeftView>
                      <RemoteText style={{color : this.props.airCleaningColor}}>공기 청정 모드: </RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText>OFF</RemoteText>
                    </TextRightView>
                  </RemoteContainer>) : (this.props.airCleaning===1 ? (<RemoteContainer><TextLeftView><RemoteText style={{color : this.props.airCleaningColor}}>공기 청정 모드:</RemoteText></TextLeftView><TextRightView><RemoteText>ON(약)</RemoteText></TextRightView></RemoteContainer>):(<RemoteContainer><TextLeftView><RemoteText>공기 청정 모드:</RemoteText></TextLeftView><TextRightView><RemoteText>ON(강)</RemoteText></TextRightView></RemoteContainer>))
                }
                <RemoteContainer><TextLeftView><RemoteText  style={{color :this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')}}>미세먼지 오염도(PM10):</RemoteText></TextLeftView><TextRightView><RemoteText>좋음</RemoteText></TextRightView></RemoteContainer>
                <RemoteContainer><TextLeftView><RemoteText style={{color : this.props.airCleaning===0 ? 'black' : (this.props.airCleaning===1 ? 'green' : 'blue')}}>초미세먼지 오염도(PM2.5):</RemoteText></TextLeftView><TextRightView><RemoteText>좋음</RemoteText></TextRightView></RemoteContainer>
              </TextContainer>
          </FunctionContainer>
            <GrayLine style={{margin:0}}/>
          <BottomFunctionContainer>
            <TouchableOpacity onPress={() => this.toggleSleep()}>
              { this.props.sleepMode===1?
                <IconView2>
                  <Image source={sleepIcnBlue} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height:50,
                    width:50,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>
                  <IconText style={{color: 'black'}}>취침모드</IconText>
                </IconView2>:<IconView2>
                  <Image source={sleepIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height:50,
                    width:50,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>
                  <IconText  style={{color: 'black'}}>취침모드</IconText>
                </IconView2>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleTimer()}>
              { this.props.isTurnOnActive===true || this.props.isTurnOffActive===true ?
                <IconView2>
                  <Image source={timerIcnBlue} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height:50,
                    width:50,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>
                  <IconText style={{color: 'black'}}>타이머</IconText>
                </IconView2>:<IconView2>
                  <Image source={timerIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height:50,
                    width:50,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>
                  <IconText style={{color: 'black'}}>타이머</IconText>
                </IconView2>
              }
            </TouchableOpacity>
          </BottomFunctionContainer>
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