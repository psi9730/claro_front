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
import { Icon } from 'react-native-elements'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import downIcn from '../../../assets/images/downIcn.png';
import powerIcn from '../../../assets/images/btnPowerN.png';
import powerIcnGreen from '../../../assets/images/btnPowerOn.png';
import AIIcn from '../../../assets/images/btnAiN.png';
import AIIcnBlue from '../../../assets/images/buttonAiOn.png';
import SterilizeIcn from '../../../assets/images/btnSterN.png';
import SterilizeIcnBlue from '../../../assets/images/btnSterOn01.png';
import SterilizeIcnBlue2 from '../../../assets/images/btnSterOn02.png';
import PurifyIcn from '../../../assets/images/btnPuriN.png';
import PurifyIcnBlue from '../../../assets/images/btnPuriOn01.png';
import PurifyIcnBlue2 from '../../../assets/images/btnPuriOn02.png';
import SleepIcn from '../../../assets/images/btnSleepN.png';
import SleepIcnBlue from '../../../assets/images/btnSleepOn.png';
import TimerIcn from '../../../assets/images/btnTimerN.png';
import TimerIcnBlue from '../../../assets/images/btnTimerOn.png'
import PurifyIcnDim from '../../../assets/images/btnPuriDim.png';
import SterilizeIcnDim from '../../../assets/images/btnSterDim.png';
import AIIcnDim from '../../../assets/images/btnAiDim.png';
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
`;
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
`;
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
`;
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

  turnOffSterilizing(){
    this.props.toggleSterilizing_(0, this.props.barcode);
  }
  turnOffAirCleaning(){
    this.props.toggleAirCleaning_(0,this.props.barcode);
  }
  turnOffAI(){
    this.props.toggleAI_(0,this.props.barcode);
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
      toast("전원이 꺼져있습니다.");
    }
    else if (this.props.sleepMode === 1) { //turn on state
    } else {
      this.props.toggleSleepRequest(1, this.props.barcode).then(()=>{ this.turnOffSterilizing();
        this.turnOffAirCleaning();
        this.turnOffAI();}).catch();
    }
  }
  toggleAI() {
    if(this.props.power===0){
      toast("전원이 꺼져있습니다.");
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
    if(this.props.power===0){
      toast("전원이 꺼져있습니다.");
    }
    else if (this.props.sterilizing === 0){
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
      toast("전원이 꺼져있습니다.");
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
          { this.props.power === 0 ?
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
              <IconView2>
                <Image source={powerIcn} style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  height: 60,
                  width: 60,
                  marginBottom: 4,
                  resizeMode: 'stretch'
                }}/>
                <IconText style={{color: 'black', fontWeight: 'bold'}}>꺼짐</IconText>
              </IconView2>
            </TouchableOpacity>
            </CenterContainer>
            <GrayLine/>
            <FunctionContainer>
            <IconView>
            <TouchableOpacity onPress={() => this.toggleAI()}>
            <IconView2>
            <Image source={AIIcnDim} style={{
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 'auto',
            height: 60,
            width: 60,
            marginBottom: 4,
            resizeMode: 'stretch'
          }}/>
            </IconView2>
            </TouchableOpacity>
            </IconView>
            <TextContainer>
            {this.props.AI===0?
              (<RemoteContainer><TextLeftView ><RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>AI 모드: </RemoteText></TextLeftView>
                <TextRightView><RemoteText  style={{opacity: 0.2}}>OFF</RemoteText></TextRightView></RemoteContainer>):
              (<RemoteContainer>
                <TextLeftView >
                  <RemoteText style={{fontWeight: 'bold', opacity: 0.2}}>AI 모드: </RemoteText>
                </TextLeftView>
                <TextRightView>
                  <RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>ON</RemoteText>
                </TextRightView>
              </RemoteContainer>)}
            <RemoteContainer>
            <TextLeftView>
            <RemoteText   style={{opacity: 0.2}}>미세먼지 오염도(PM10):</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText   style={{opacity: 0.2, fontWeight: 'bold'}}>좋음</RemoteText>
            </TextRightView>
            </RemoteContainer>
            <RemoteContainer >
            <TextLeftView>
            <RemoteText   style={{opacity: 0.2}}>초미세먼지 오염도(PM2.5):</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText   style={{opacity: 0.2, fontWeight: 'bold'}}>좋음</RemoteText>
            </TextRightView>
            </RemoteContainer>
            <RemoteContainer>
            <TextLeftView>
            <RemoteText   style={{opacity: 0.2}}>VOCs 오염도:</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText   style={{opacity: 0.2, fontWeight: 'bold'}}>좋음</RemoteText>
            </TextRightView>
            </RemoteContainer>
            </TextContainer>
            </FunctionContainer>
            <GrayLine/>
            <FunctionContainer>
            <IconView>
            <TouchableOpacity onPress={() => this.toggleSterilizing()}>
            <IconView2>
             <Image source={SterilizeIcnDim} style={{   flexGrow: 0,
              flexShrink: 0,
              flexBasis: 'auto',
              height: 60,
              width: 60,
              marginBottom: 4,
              resizeMode: 'stretch'}} />
            </IconView2>
            </TouchableOpacity>
            </IconView>
            <TextContainer>
          {this.props.sterilizing===0?
            (<RemoteContainer>
            <TextLeftView>
            <RemoteText  style={{fontWeight: 'bold' , opacity: 0.2}}>살균모드:</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText  style={{fontWeight: 'bold' , opacity: 0.2}}>OFF</RemoteText>
            </TextRightView>
            </RemoteContainer>)
            : (this.props.sterilizing===1 ? (
            <RemoteContainer>
            <TextLeftView >
            <RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>살균 모드:</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>ON(약)</RemoteText>
            </TextRightView>
            </RemoteContainer>):(
            <RemoteContainer>
            <TextLeftView>
            <RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>살균 모드:</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>ON(강)</RemoteText>
            </TextRightView>
            </RemoteContainer>))
          }
            <RemoteContainer>
            <TextLeftView>
            <RemoteText  style={{opacity: 0.2, fontWeight: 'bold'}}>VOCs 공기질:</RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText  style={{opacity: 0.2}}>오염</RemoteText>
            </TextRightView>
            </RemoteContainer>
            </TextContainer>
            </FunctionContainer>
            <GrayLine/>
            <FunctionContainer>
            <IconView>
            <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
            <IconView2>
            <Image source={PurifyIcnDim} style={{   flexGrow: 0,
              flexShrink: 0,
              flexBasis: 'auto',
              height: 60,
              width: 60,
              marginBottom: 4,
              resizeMode: 'stretch'}} />
            </IconView2>
            </TouchableOpacity>
            </IconView>
            <TextContainer>
          {this.props.airCleaning===0?
            (<RemoteContainer>
            <TextLeftView>
            <RemoteText  style={{fontWeight: 'bold', opacity: 0.2}}>공기 청정 모드: </RemoteText>
            </TextLeftView>
            <TextRightView>
            <RemoteText  style={{opacity: 0.2}}>OFF</RemoteText>
            </TextRightView>
            </RemoteContainer>) : (this.props.airCleaning===1 ? (<RemoteContainer><TextLeftView><RemoteText style={{fontWeight: 'bold' , opacity: 0.2}}>공기 청정 모드:</RemoteText></TextLeftView><TextRightView><RemoteText style={{fontWeight: 'bold' , opacity: 0.2}}>ON(약)</RemoteText></TextRightView></RemoteContainer>):(<RemoteContainer><TextLeftView><RemoteText style={{fontWeight: 'bold' , opacity: 0.2}}>공기 청정 모드:</RemoteText></TextLeftView><TextRightView><RemoteText style={{fontWeight: 'bold', opacity: 0.2}} >ON(강)</RemoteText></TextRightView></RemoteContainer>))
          }
            <RemoteContainer><TextLeftView><RemoteText style={{opacity: 0.2}}>미세먼지 오염도(PM10):</RemoteText></TextLeftView><TextRightView><RemoteText style={{opacity: 0.2, fontWeight: 'bold'}}>좋음</RemoteText></TextRightView></RemoteContainer>
            <RemoteContainer><TextLeftView><RemoteText  style={{opacity: 0.2}}>초미세먼지 오염도(PM2.5):</RemoteText></TextLeftView><TextRightView><RemoteText style={{opacity: 0.2, fontWeight: 'bold'}}>좋음</RemoteText></TextRightView></RemoteContainer>
            </TextContainer>
            </FunctionContainer>
            <GrayLine style={{margin:0}}/>
            <BottomFunctionContainer>
            <TouchableOpacity onPress={() => this.toggleSleep()}>
              <IconView2>
                <Image source={SleepIcn} style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  height:60,
                  width:60,
                  marginBottom: 4,
                  resizeMode: 'stretch'
                }}/>
                <IconText  style={{color: 'black'}}>취침모드</IconText>
              </IconView2>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleTimer()}>
            { this.props.isTurnOnActive===true || this.props.isTurnOffActive===true ?
              <IconView2>
                <Image source={TimerIcnBlue} style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  height:60,
                  width:60,
                  marginBottom: 4,
                  resizeMode: 'stretch'
                }}/>
                <IconText style={{color: 'black'}}>타이머</IconText>
              </IconView2>:<IconView2>
                <Image source={TimerIcn} style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  height:60,
                  width:60,
                  marginBottom: 4,
                  resizeMode: 'stretch'
                }}/>
                <IconText style={{color: 'black'}}>타이머</IconText>
              </IconView2>
            }
            </TouchableOpacity>
            </BottomFunctionContainer>
            </Container> :    <Container>
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
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <IconText style={{color: 'black', fontWeight: 'bold'}}>꺼짐</IconText>
                    </IconView2> :  <IconView2>
                      <Image source={powerIcnGreen} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <IconText style={{fontWeight: 'bold'}}>연결됨</IconText>
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
                          height: 60,
                          width: 60,
                          marginBottom: 4,
                          resizeMode: 'stretch'
                        }}/>
                      </IconView2> :  <IconView2>
                        <Image source={AIIcnBlue} style={{
                          flexGrow: 0,
                          flexShrink: 0,
                          flexBasis: 'auto',
                          height:60,
                          width:60,
                          marginBottom: 4,
                          resizeMode: 'stretch'
                        }}/>
                      </IconView2>
                    }
                  </TouchableOpacity>
                </IconView>
                <TextContainer>
                  {this.props.AI===0?
                    (<RemoteContainer><TextLeftView ><RemoteText  style={{fontWeight: 'bold'}}>AI 모드: </RemoteText></TextLeftView>
                      <TextRightView><RemoteText  style={{opacity: 0.6}}>OFF</RemoteText></TextRightView></RemoteContainer>):
                    (<RemoteContainer>
                      <TextLeftView >
                        <RemoteText style={{fontWeight: 'bold'}}>AI 모드: </RemoteText>
                      </TextLeftView>
                      <TextRightView>
                        <RemoteText  style={{fontWeight: 'bold'}}>ON</RemoteText>
                      </TextRightView>
                    </RemoteContainer>)}
                  <RemoteContainer>
                    <TextLeftView>
                      <RemoteText   style={{opacity: 0.6}}>미세먼지 오염도(PM10):</RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText   style={{opacity: 0.6, fontWeight: 'bold'}}>좋음</RemoteText>
                    </TextRightView>
                  </RemoteContainer>
                  <RemoteContainer >
                    <TextLeftView>
                      <RemoteText   style={{opacity: 0.6}}>초미세먼지 오염도(PM2.5):</RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText   style={{opacity: 0.6, fontWeight: 'bold'}}>좋음</RemoteText>
                    </TextRightView>
                  </RemoteContainer>
                  <RemoteContainer>
                    <TextLeftView>
                      <RemoteText   style={{opacity: 0.6}}>VOCs 오염도:</RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText   style={{opacity: 0.6, fontWeight: 'bold'}}>좋음</RemoteText>
                    </TextRightView>
                  </RemoteContainer>
                </TextContainer>
              </FunctionContainer>
              <GrayLine/>
              <FunctionContainer>
                <IconView>
                  <TouchableOpacity onPress={() => this.toggleSterilizing()}>
                    <IconView2>
                      {this.props.sterilizing===0 ?  <Image source={SterilizeIcn} style={{   flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'}} /> : ( this.props.sterilizing===1 ? <Image source={SterilizeIcnBlue} style={{  flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'}} /> :  <Image source={SterilizeIcnBlue2} style={{   flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'}} />)}
                    </IconView2>
                  </TouchableOpacity>
                </IconView>
                <TextContainer>
                  {this.props.sterilizing===0?
                    (<RemoteContainer>
                      <TextLeftView>
                        <RemoteText  style={{fontWeight: 'bold'}}>살균모드:</RemoteText>
                      </TextLeftView>
                      <TextRightView>
                        <RemoteText  style={{fontWeight: 'bold', opacity:0.6}}>OFF</RemoteText>
                      </TextRightView>
                    </RemoteContainer>)
                    : (this.props.sterilizing===1 ? (
                      <RemoteContainer>
                        <TextLeftView >
                          <RemoteText  style={{fontWeight: 'bold'}}>살균 모드:</RemoteText>
                        </TextLeftView>
                        <TextRightView>
                          <RemoteText  style={{fontWeight: 'bold'}}>ON(약)</RemoteText>
                        </TextRightView>
                      </RemoteContainer>):(
                      <RemoteContainer>
                        <TextLeftView>
                          <RemoteText  style={{fontWeight: 'bold'}}>살균 모드:</RemoteText>
                        </TextLeftView>
                        <TextRightView>
                          <RemoteText>ON(강)</RemoteText>
                        </TextRightView>
                      </RemoteContainer>))
                  }
                  <RemoteContainer>
                    <TextLeftView>
                      <RemoteText  style={{opacity: 0.6, fontWeight: 'bold'}}>VOCs 공기질:</RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      <RemoteText style={{opacity: 0.6}}>오염</RemoteText>
                    </TextRightView>
                  </RemoteContainer>
                </TextContainer>
              </FunctionContainer>
              <GrayLine/>
              <FunctionContainer>
                <IconView>
                  <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
                    <IconView2>
                      {this.props.airCleaning===0 ?  <Image source={PurifyIcn} style={{   flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'}} /> : ( this.props.airCleaning===1 ? <Image source={PurifyIcnBlue} style={{  flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'}} /> :  <Image source={PurifyIcnBlue2} style={{   flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'}} />)}
                    </IconView2>
                  </TouchableOpacity>
                </IconView>
                <TextContainer>
                  {this.props.airCleaning===0?
                    (<RemoteContainer>
                      <TextLeftView>
                        <RemoteText  style={{fontWeight: 'bold'}}>공기 청정 모드: </RemoteText>
                      </TextLeftView>
                      <TextRightView>
                        <RemoteText style={{opacity: 0.6}}>OFF</RemoteText>
                      </TextRightView>
                    </RemoteContainer>) : (this.props.airCleaning===1 ? (<RemoteContainer><TextLeftView><RemoteText style={{fontWeight: 'bold'}}>공기 청정 모드:</RemoteText></TextLeftView><TextRightView><RemoteText style={{fontWeight: 'bold'}}>ON(약)</RemoteText></TextRightView></RemoteContainer>):(<RemoteContainer><TextLeftView><RemoteText style={{fontWeight: 'bold'}}>공기 청정 모드:</RemoteText></TextLeftView><TextRightView><RemoteText >ON(강)</RemoteText></TextRightView></RemoteContainer>))
                  }
                  <RemoteContainer><TextLeftView><RemoteText style={{opacity: 0.6}}>미세먼지 오염도(PM10):</RemoteText></TextLeftView><TextRightView><RemoteText style={{opacity: 0.6, fontWeight: 'bold'}}>좋음</RemoteText></TextRightView></RemoteContainer>
                  <RemoteContainer><TextLeftView><RemoteText  style={{opacity: 0.6}}>초미세먼지 오염도(PM2.5):</RemoteText></TextLeftView><TextRightView><RemoteText style={{opacity: 0.6, fontWeight: 'bold'}}>좋음</RemoteText></TextRightView></RemoteContainer>
                </TextContainer>
              </FunctionContainer>
              <GrayLine style={{margin:0}}/>
              <BottomFunctionContainer>
                <TouchableOpacity onPress={() => this.toggleSleep()}>
                  { this.props.sleepMode===1?
                    <IconView2>
                      <Image source={SleepIcnBlue} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height:60,
                        width:60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <IconText style={{color: 'black'}}>취침모드</IconText>
                    </IconView2>:<IconView2>
                      <Image source={SleepIcn} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height:60,
                        width:60,
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
                      <Image source={TimerIcnBlue} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height:60,
                        width:60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <IconText style={{color: 'black'}}>타이머</IconText>
                    </IconView2>:<IconView2>
                      <Image source={TimerIcn} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height:60,
                        width:60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <IconText style={{color: 'black'}}>타이머</IconText>
                    </IconView2>
                  }
                </TouchableOpacity>
              </BottomFunctionContainer>
            </Container>}
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}
export default  RemoteDetailView
