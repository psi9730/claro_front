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
import Modal from 'react-native-modal';
import autoBind from 'react-autobind';
import {REMOTE_DETAIL_SCREEN} from '../../../screens';
import locationIcn from '../../assets/images/locationDot.png';
import circleIcnBlue from '../../assets/images/circleIcnBlue.png';
import exitIcnRed from '../../assets/images/exitIcnRed.png';
import circleIcn from '../../assets/images/circle.png';
import LinearGradient from 'react-native-linear-gradient';
type Props = {
  restoreOutsideAirInfo: Function,
  restoreIndoorAirInfo: Function,
  toggleSterilizingRequest: Function,
  toggleAIRequest: Function,
  toggleAirCleaningRequest: Function,
  AI: number,
  sterilizing: number,
  power: number,
  serialNumber: string,
  airCleaning: number,
  indoorAirGrade: String,
  indoorPm10: String,
  indoorPm25: String,
  indoorVoc: String,
  indoorPm10Color: String,
  indoorPm25Color: String,
  indoorVocColor: String,
  pm10: number,
  pm25: number,
  vocs: number,
  StatusBackground: String,
  Background: any,
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
  margin-bottom: 15px;
`;
const ModalView2= styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis:auto;
    border-radius:30;
    border-width: 1;
    border-color: white;
    width:90%;
    display:flex;
    flex-direction:column;
    background-color:white;
`;
const ModalContainer = styled.View`
    flex-grow:3;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: center;
    align-items: center;
`;
const ModalView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 180px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const BottomButtonRowView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: space-around;
    align-items: center;
`;
const GrayLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
`;
const VeryGoodBackground = ['rgba(0,162,230,1)','rgba(51, 143, 252, 1)'];
const StatusVeryGoodBackground = 'rgba(0,162,230,1)';
const BadBackground = ['rgba(255,180,41,1)','rgba(255, 207, 0, 1)'];
const StatusBadBackground = 'rgba(255,180,41,1)';
const VeryBadBackground = ['rgba(255, 105, 124,1)','rgba(255, 73, 96, 1)'];
const StatusVeryBadBackground = 'rgba(255,105,124,1)';
const NormalBackground = ['rgba(0, 176, 177, 1)', 'rgba(59, 185, 146, 1)'];
const StatusNormalBackground = 'rgba(0,176, 177,1)';

class RemoteView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      modalVocVisible: false,
      modalVisible: false,
    }
  }
  state: State = {
  };
  componentWillMount(){
    if(Platform.OS==='android'){
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        navBarBackgroundColor: this.props.StatusBackground,
        statusBarTextColorSchemeSingleScreen: 'light',
        navBarNoBorder: true,
        topBarElevationShadowEnabled: false,
        navBarTextColor: 'white',
        statusBarColor: this.props.StatusBackground,
        navBarHidden: true,
        navBarButtonColor: 'white',
      });}
    else {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        navBarButtonColor: 'white',
        navBarTextColor: 'white',
        navBarNoBorder: true,
        statusBarColor: this.props.StatusBackground,
        navBarHidden: true,
        navBarBackgroundColor: this.props.StatusBackground,
      });
    }
    this.props.getUserProfileRequest().then(()=> this.props.indoorAirGrade==='나쁨' || this.props.indoorAirGrade==='매우나쁨' ? this.setState({modalVisible: true}) : ( this.props.indoorVoc==='오염' && this.setState({modalVocVisible: true}))).catch((e)=>console.log(e));
    if(this.props.outerTotalGrade==='3'){
      this.setState({modalVisible: true})
    }
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  props: Props;

  setClean(){
    this.setState({modalVisible: false})
    this.props.toggleSleepRequest(0,this.props.barcode).catch((e)=>console.log(e));
    this.props.toggleSterilizingRequest(0,this.props.barcode).catch((e)=>console.log(e));
    this.props.toggleAIRequest(0,this.props.barcode).catch((e)=>console.log(e));
    this.props.togglePowerRequest(1, this.props.barcode).catch((e)=>console.log(e));
    this.props.toggleAirCleaningRequest(2,this.props.barcode).catch((e)=>console.log(e));
  }
  setVocClean(){
    this.setState({modalVocVisible: false})
    this.props.toggleSleepRequest(0,this.props.barcode).catch((e)=>console.log(e));
    this.props.toggleSterilizingRequest(0,this.props.barcode).catch((e)=>console.log(e));
    this.props.toggleAIRequest(0,this.props.barcode).catch((e)=>console.log(e));
    this.props.togglePowerRequest(1, this.props.barcode).catch((e)=>console.log(e));
    this.props.toggleAirCleaningRequest(2,this.props.barcode).catch((e)=>console.log(e));
  }
  render() {
    return (
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
          <Container>
            <Modal
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setState({modalVisible: false})}
            >
                <ModalView style={{marginTop: 22}}>
                  <ModalView2>
                    <ModalContainer>
                      <Text>{'미세먼지 상태가 "나쁨"입니다.\n공기 청정을 실행 하시겠습니까?'}</Text>
                    </ModalContainer>
                    <GrayLine/>
                    <BottomButtonRowView>
                      <TouchableHighlight onPress={()=> this.setClean()} >
                        <Image source={circleIcnBlue} resizeMode='stretch' style={{height:25, width:25}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={()=> this.setState({modalVisible: false})} >
                        <Image source={exitIcnRed} resizeMode='stretch' style={{height:25, width:25}}/>
                      </TouchableHighlight>
                    </BottomButtonRowView>
                  </ModalView2>
                </ModalView>
            </Modal>
            <Modal
              isVisible={this.state.modalVocVisible}
              onBackdropPress={() => this.setState({modalVocVisible: !this.state.modalVocVisible})}
            >
              <ModalView style={{marginTop: 22}}>
                <ModalView2>
                  <ModalContainer>
                    <Text>{'GAS/VOCs "오염" 상태입니다.\n정화를 실행 하시겠습니까?'}</Text>
                  </ModalContainer>
                  <GrayLine/>
                  <BottomButtonRowView>
                    <TouchableHighlight onPress={()=> this.setVocClean()} >
                      <Image source={circleIcnBlue} resizeMode='stretch' style={{height:25, width:25}}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.setState({modalVocVisible: false})} >
                      <Image source={exitIcnRed} resizeMode='stretch' style={{height:25, width:25}}/>
                    </TouchableHighlight>
                  </BottomButtonRowView>
                </ModalView2>
              </ModalView>
            </Modal>
            <LinearGradient colors={this.props.Background} style={{flexGrow:0,
              flexShrink:0,
              flexBasis: 'auto',
              display: 'flex',
              flexDirection: 'column',
              paddingRight: 20,
              paddingLeft: 20,
              paddingBottom: 20,
              justifyContent: 'flex-start',
              alignItems: 'flex-start'}}>
                <TextCenter>
                  실내 공기 정보
                </TextCenter>
                <InnerAirContainer style={{marginBottom:10}}>
                  <TextContainer style={{backgroundColor: 'transparent'}}><Text style={{fontSize:15, color: 'white', paddingBottom:5, fontWeight: 'bold' }}>통합 공기 청정도</Text></TextContainer>
                  <TextLeftContainer style={{backgroundColor: 'transparent' }}><Text style={{fontSize: 25, color: 'white', fontWeight: 'bold' }}>{this.props.indoorAirGrade}</Text></TextLeftContainer>
                </InnerAirContainer>
              <InnerAirContainer style={{marginTop: 0, backgroundColor : 'white'}}>
                <ImageTextContainer><Image source={circleIcn} style={{height:8, width:8, margin:10, resizeMode:'stretch', tintColor: this.props.indoorPm10Color}} /><Text>{`미세먼지(PM 10): ${this.props.pm10} ug/m3`}</Text></ImageTextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.indoorPm10}</Text></TextLeftContainer>
              </InnerAirContainer>
              <InnerAirContainer style={{backgroundColor : 'white'}}>
                <ImageTextContainer><Image source={circleIcn} style={{height:8, width:8, margin:10, resizeMode:'stretch', tintColor: this.props.indoorPm25Color}} /><Text>{`초미세먼지(PM 25): ${this.props.pm25} ug/m3`}</Text></ImageTextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.indoorPm25}</Text></TextLeftContainer>
              </InnerAirContainer>
              <InnerAirContainer style={{backgroundColor : 'white'}}>
                <ImageTextContainer><Image source={circleIcn} style={{height:8, width:8, margin:10, resizeMode:'stretch', tintColor: this.props.indoorVocColor}} /><Text>GAS/ VOCs</Text></ImageTextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >{this.props.indoorVoc}</Text></TextLeftContainer>
              </InnerAirContainer>
            </LinearGradient>
            <OuterContainer>
              <ScrollView style={ {flexGrow:1}}>
                <OutAirView>
                  <LocationContainer>
                    <Image source={locationIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:15, width:10,marginRight:4,tintColor: 'gray', resizeMode:'stretch'}} />
                    <OuterTextRight>
                    {this.props.jibunAddr}
                    </OuterTextRight>
                  </LocationContainer>
              <OuterTextCenter>
                외부 공기 정보
              </OuterTextCenter>
              <FunctionContainer style={{paddingBottom: 10}}>
                <TextContainer><Text style={{fontWeight: 'bold' }}>통합 공기 청정도</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold', fontSize:25, color: this.props.outerTotalGrade=== '1' ? StatusVeryGoodBackground : (this.props.outerTotalGrade==='2' ? StatusNormalBackground : StatusVeryBadBackground)}}>{this.props.outerTotalGrade=== '1' ? '좋음' : (this.props.outerTotalGrade==='2' ? '보통' : '나쁨')}</Text></TextLeftContainer>
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
