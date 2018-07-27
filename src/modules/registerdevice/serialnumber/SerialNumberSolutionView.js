/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,Platform, NativeModules,
  TouchableWithoutFeedback,TouchableHighlight
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import {
  REGISTER_COMPLETE_SCREEN,
} from '../../../../screens';
import Barcode from '../../../../src/assets/images/barcode.jpg'
import exitIcn from '../../../../src/assets/images/exit.png';
const { StatusBarManager } = NativeModules;
type Props = {
  sendSerialNumberRequest: Function,
  restoreSerialNumber: Function,
  restoreDevice: Function,
  registerDeviceRequest: Function,
  updateNickname: Function,
  barcode: String,
  deviceInfo: any,
  nickname: String,
};

type State = {
  serialNumber: ?string,
  secure: boolean,
};

const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;
`;
const NavBar = styled.View`
  display: flex;
  flexDirection: row;
  justifyContent: flex-end;
  alignItems: center;
`;
const IntroduceText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: black;
  margin-bottom: 5px;
  margin-top:3px;
`;
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 30px;
  padding-bottom: 5px;
`;

class SerialNumberSolutionView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      secure: true,
      isFan: false,
    }
  }
  props: Props;

  updateNickname(nickname) {
    this.props.updateNickname(nickname);
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    this.props.navigator.setStyle({
      navBarHidden: true,
    });
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={SerialNumberSolutionView.dismissKeyboard}
        >
          { Platform.OS==='android' ?(
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
              <NavBar style ={{ backgroundColor:'transparent',  flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
                  ios: 64,
                  android: 54
                })
              }} ><TouchableHighlight onPress={()=>this.props.navigator.pop()}>
                <Image source={exitIcn} resizeMode='stretch' style={{height:20, width:20}}/>
              </TouchableHighlight>
              </NavBar>
              <Container>
                <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
                  S/N 확인방법
                </TitleText>
                <IntroduceText>
                  {'\n제품 뒷면 바코드의 11자리 \n영문 / 숫자를 입력 해 주세요.'}
                </IntroduceText>
                <IntroduceText>
                  {'\nAA123A-A1234'}
                </IntroduceText>
                <Image source={Barcode} resizeMode='center' style={{alignSelf: 'center',flex:1}}/>
              </Container>
            </View>):(
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
              <NavBar style ={{ backgroundColor:'transparent', height: Platform.select({
                  ios:  20,
                  android: StatusBarManager.HEIGHT, flexGrow:0, flexShrink:0, flexBasis: 'auto'
                }),
              }} />
              <NavBar style ={{ backgroundColor:'transparent',  flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
                  ios: 64,
                  android: 54
                })
              }} ><TouchableHighlight onPress={()=>this.props.navigator.pop()}>
                <Image source={exitIcn} resizeMode='center' style={{height:50, width:50}}/>
              </TouchableHighlight>
              </NavBar>
              <Container>
                <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
                  S/N 확인방법
                </TitleText>
                <IntroduceText>
                  {'\n제품 뒷면 바코드의 11자리 \n영문 / 숫자를 입력 해 주세요.'}
                </IntroduceText>
                <IntroduceText>
                  {'\nAA123A-A1234'}
                </IntroduceText>
                <Image source={Barcode} resizeMode='center' style={{alignSelf: 'center',flex:1}}/>
              </Container>
            </View>)}
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default SerialNumberSolutionView;