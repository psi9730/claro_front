/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Image,
  ScrollView,
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
  NativeModules,
} from 'react-native';
import autoBind from 'react-autobind';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import {REMOTE_DETAIL_SCREEN} from '../../../screens';
import burgerIcn from '../../assets/images/burger.png';
import locationIcn from '../../assets/images/locationDot.png';
import circleIcn from '../../assets/images/circle.png';
const { StatusBarManager } = NativeModules;
import moment from 'moment';
import dateformat from 'dateformat';
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
  height:100%;
  flex-direction: column;
  justify-content flex-start;
  background-color: white;
  padding-bottom: 3px;
`;
const TextView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  paddingRight: 20px;
  paddingLeft: 20px;
  paddingBottom: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;
const OutAirView = styled.View`
    flex:1;
    padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const OuterContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: 230px;
`;
const StatusView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
const FunctionContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    padding: 3px;
    flex-direction: row;
    justify-content: flex-start;
`;

const InnerAirContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 40px;
    display:flex;
    padding: 3px;
    paddingRight:0px;
    flex-direction: row;
    justify-content: flex-start;
    marginBottom:5px;
    marginLeft:5px;
    marginRight:0px;
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

const ImageTextContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const TextCenter = styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    align-self: center;
    font-size: 20px;
    color: white;
    margin-bottom:10px;
`;
const OuterTextCenter = styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    align-self: center;
    font-size: 20px;
    color: black;
    margin-bottom:10px;
`;
const OuterTextRight= styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    font-size: 12px;
    color: gray;
    margin-right:5px;
`;
const TextLeftContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
    margin-right:10px;
`;
const LocationContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    align-self: flex-end;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
    margin-right:10px;
`;
class RemoteView extends Component<Props, State> {
  constructor(props) {
    console.log("Constructor is implemented");
    super(props);
    autoBind(this);
  }
  state: State = {
  };

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps){

  }
  goToRemoteView(){
    console.log("Plus Button is pressed");
    this.props.navigator.push({
      ...REMOTE_DETAIL_SCREEN,
    });
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  props: Props;

  render() {
    const Color = this.props.backgroundColor;
    console.log(this.props.height,"height");
    if(Platform.OS==='android'){
    this.props.navigator.setStyle({
      statusBarTextColorScheme: 'light',
      navBarBackgroundColor: 'steelblue',
      statusBarTextColorSchemeSingleScreen: 'light',
      navBarNoBorder: true,
      topBarElevationShadowEnabled: false,
      navBarTextColor: 'white',
      statusBarColor: Color,
      navBarHidden: true,
      navBarButtonColor: 'white',
    });}
    else {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        navBarButtonColor: 'white',
        navBarTextColor: 'white',
        navBarNoBorder: true,
        statusBarColor: Color,
        navBarHidden: true,
        navBarBackgroundColor: 'steelblue',
      });
    }
    var newDate = dateformat(this.props.date,'yyyy.mm.dd HH:MM');
    return (
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
          <Container>
            <TextView style={{ backgroundColor : Color}}>
                <TextCenter>
                  실내 공기 정보
                </TextCenter>
                <InnerAirContainer style={{marginBottom:10}}>
                  <TextContainer style={{backgroundColor: Color}}><Text style={{fontSize:15, color: 'white', paddingBottom:5, fontWeight: 'bold' }}>통합 공기 청정도</Text></TextContainer>
                  <TextLeftContainer style={{backgroundColor: Color }}><Text style={{fontSize: 25, color: 'white', fontWeight: 'bold' }}>매우 나쁨</Text></TextLeftContainer>
                </InnerAirContainer>
              <InnerAirContainer style={{marginTop: 0, backgroundColor : 'white'}}>
                <ImageTextContainer><Image source={circleIcn} style={{height:8, width:8, margin:10, resizeMode:'stretch', tintColor: 'red'}} /><Text>미세먼지(PM 10): 25 ug/m3</Text></ImageTextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >나쁨 </Text></TextLeftContainer>
              </InnerAirContainer>
              <InnerAirContainer style={{backgroundColor : 'white'}}>
                <ImageTextContainer><Image source={circleIcn} style={{height:8, width:8, margin:10, resizeMode:'stretch', tintColor: 'red'}} /><Text>초미세먼지(PM 10): 25 ug/m3</Text></ImageTextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >매우 나쁨</Text></TextLeftContainer>
              </InnerAirContainer>
              <InnerAirContainer style={{backgroundColor : 'white'}}>
                <ImageTextContainer><Image source={circleIcn} style={{height:8, width:8, margin:10, resizeMode:'stretch', tintColor: 'red'}} /><Text>GAS/ VOCs</Text></ImageTextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >오염 </Text></TextLeftContainer>
              </InnerAirContainer>
          </TextView>
            <OuterContainer>
              <ScrollView style={ {flexGrow:1}}>
                <OutAirView>
                  <LocationContainer>
                    <Image source={locationIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:15, width:10,marginRight:4,tintColor: 'gray', resizeMode:'stretch'}} />
                    <OuterTextRight>
                    {this.props.location}
                    </OuterTextRight>
                  </LocationContainer>
              <OuterTextCenter>
                외부 공기 정보
              </OuterTextCenter>
              <FunctionContainer style={{paddingBottom: 10}}>
                <TextContainer><Text style={{fontWeight: 'bold' }}>통합 공기 청정도</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold', fontSize:25, color: Color}}>{this.props.outerTotalGrade=== '1' ? '좋음' : (this.props.outerTotalGrade==='2' ? '보통' : '나쁨')}</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>미세먼지(PM 10)</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.outerPm10Value} </Text><Text>ug/m3</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>초미세먼지(PM 2.5)</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.outerPm25Value} </Text><Text>ug/m3</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>오존</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.outerO3Value} </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>이산화질소</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.outerNo2Value} </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>일산화탄소</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.outerCoValue} </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>이황상가스</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.outerSo2Value} </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
                </OutAirView>
              </ScrollView>
            </OuterContainer>
          </Container>
            </View>
    );
  }
}

export default  RemoteView