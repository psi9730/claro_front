/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import toast from '../../../utils/toast';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import WifiGuide from '../../../assets/images/WifiGuide.png'
import {
  BARCODE_SCAN_SCREEN, WIFI_SET_UP_SCREEN, REMOTE_SCREEN, LOGIN_SCREEN, WIFI_MAIN_SCREEN,
  ACCEPT_SIGNUP_SCREEN
} from '../../../../screens';
import SignupView from '../../login/SignupView';
type Props = {
  sendSerialNumberRequest: Function,
  restoreSerialNumber: Function,
  restoreDevice: Function,
  registerDeviceRequest: Function,
  barcode: String,
};

type State = {
  serialNumber: ?string,
  secure: boolean,
};
const UsernameInput = styled.TextInput`
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const TextsInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  border-top-width: 1px;
  border-top-color: gray;
  border-left-color: gray;
  border-right-color: gray;
  border-bottom-width: 2px;
  border-bottom-color: blue;
  borderLeftWidth: 1px;
  borderRightWidth: 2px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: black;
`;
const TextsBoxContainer = styled.View`
 width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  borderTopWidth: 1px;
  borderTopColor: gray;
  borderLeftColor: gray;
  borderRightColor: gray;
  borderBottomWidth: 2px;
  borderBottomColor: blue;
  borderLeftWidth: 1px;
  borderRightWidth: 1px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;
  
`;
const IntroduceText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: black;
  margin-bottom: 5px;
  margin-top:3px;
  
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: 40px;
  width: 100%;
  margin-bottom: 5px;
  background-color: #00CC39;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const BottomButtonView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-end;
    align-items: center;
`;
const TextCenterContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;


const GrayLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
`;
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 30px;
  padding-bottom: 5px;
  
`;


class WifiGuideView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      secure: true,
      isFan: false,
      isError: false,
    }

  }



  componentWillMount() {
  }
  props: Props;
  showToastForResponse() {
    toast("기기 등록 완료");
  }

  sendSerialAndServerInfo() {
    Keyboard.dismiss();
    if (this.props.barcode == null || this.props.barcode === '') {
      toast(this.props.t('enter_your_SN'),'error');
      return;
    }
    this.props.sendSerialNumberRequest(this.props.barcode).then(()=> {
      console.log("SerialNumber completed");
      this.props.sendApRequest().catch();
      (
        async () => {
          let key;
          this.showToastForResponse();
          console.log("show toast");
          key = KEYS.serialNumber;
          await Storage.setItem(key, this.props.barcode);
        })();}).then(()=>this.props.registerDeviceRequest(this.props.barcode, this.props.deviceInfo.modelName,this.props.deviceInfo).then(()=>{  Keyboard.dismiss();
      this.props.navigator.push({
        ...WIFI_SET_UP_SCREEN,
      })}).catch()).catch( e=> toast("Please turn on the Wifi",'error'));
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={SignupView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              본체 네트워크 연결
            </TitleText>
            <TitleText style={{color: 'black', fontWeight:'bold'}}>{'CLARO APP과 CLARO 제품을 연동하기 위해서는 본체와 Wi-Fi를 연결해야 합니다.\n 아래 방법으로 본체 네트워크 연결을 하십시오.'}
            </TitleText>
            <GrayLine/>
            <TitleText style={{color: 'gray', alignSelf: 'center'}}>가이드 예시 이미지</TitleText>
            <Image source={WifiGuide} resizeMode='center' style={{alignSelf: 'center',flex:1}}/>
            {!this.state.isError ? (
                <TitleText style={{color: 'black', alignSelf: 'center'}}>본체의 전원버튼을 녹색이 깜빡일때까지 계속 누르십시오.</TitleText>)
              : ( <TitleText style={{color: 'red', alignSelf: 'center'}}>본체의 전원버튼을 녹색이 깜빡일때까지 계속 누르시거나 S/N번호를 정확히 입력하셨는지 확인해주세요</TitleText>)
            }
            <BottomButtonView>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.sendSerialAndServerInfo()}
              >
                <TextCenterContainer>
                  <ButtonText style={{alignSelf: 'center', color:'black'}}>
                    다음
                  </ButtonText>
                </TextCenterContainer>
              </NavButton>
            </BottomButtonView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default WifiGuideView;

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