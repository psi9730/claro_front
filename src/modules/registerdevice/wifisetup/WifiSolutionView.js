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
import Barcode from '../../../../src/assets/images/barcode.jpg'
import exitIcn from '../../../../src/assets/images/exit.png';
const { StatusBarManager } = NativeModules;
type Props = {
  restoreSerialNumber: Function,
  restoreDevice: Function,
  registerDeviceRequest: Function,
  barcode: String,
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


class WifiSolutionView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      secure: true,
    }
    this.props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: false,
    });
  }



  componentWillMount() {
  }

  props: Props;

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
          onPress={WifiSolutionView.dismissKeyboard}
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

export default WifiSolutionView;

/*   <SNInput
            placeholder="Enter S/N yourself"
            value={this.props.barcode}
            onChangeText={barcode => {this.props.updateBarcode(barcode)}}
          />
            <Button
              title={'바코드 스캐너로 입력'}
              style={{ marginBottom: 20 }}
              light
              onPress={() => this.goBarcodeScan()}
            />
            <Button
              title={'모듈로 시리얼 서버정보 전송'}
              onPress={() => this.sendSerialAndServerInfo()}
              color={ClaroTheme.mainColor} />
            <SerialNumberText>
              (tcp packet data type 0x0100, 0x0200 전송에 모두 성공하고
              0x0101, 0x0201까지 성공적으로 전송받으면
              WifiSetup 화면으로 자동으로 이동)
            </SerialNumberText>
            <Button
              title={'WifiSetup 화면으로 이동 (테스트용)'}
              style={{ marginTop: 20 }}
              onPress={() => {
                Keyboard.dismiss();
                this.props.navigator.push({
                  ...WIFI_SET_UP_SCREEN,
                });
              }}
              color={ClaroTheme.mainColor}
            />
            <Button
              title={'Remote 화면으로 바로 이동 (테스트용)'}
              light
              style={{ marginTop: 20 }}
              onPress={() => {
                Keyboard.dismiss();
                this.props.navigator.push({
                  ...REMOTE_SCREEN,
                })
              }}
            />*/