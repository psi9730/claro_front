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
import {
  WIFI_SET_UP_SCREEN, WIFI_GUIDE_SCREEN
} from '../../../../screens';
import SignupView from '../../login/SignupView';
type Props = {
  sendSerialNumberRequest: Function,
  registerDeviceRequest: Function,
  barcode: String,
};

type State = {

};
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;
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
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 30px;
  padding-bottom: 5px;
`;

class WifiMainView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
  }




  componentWillMount() {

  }

  props: Props;
  goWifiSetUpView() {
    Keyboard.dismiss();
    if (this.props.barcode == null || this.props.barcode === '') {
      toast(this.props.t('enter_your_SN'), 'error');
      return;
    }
    this.props.sendSerialNumberRequest(this.props.barcode).then(() => {
      console.log("SerialNumber completed");
      this.props.sendApRequest().catch((e)=>console.log(e));
      (
        async () => {
          let key;
          console.log("show toast");
          key = KEYS.serialNumber;
          await Storage.setItem(key, this.props.barcode);
        })();
    }).then(() => this.props.registerDeviceRequest(this.props.barcode, this.props.deviceInfo.modelName,this.props.deviceInfo).then(() => {
      Keyboard.dismiss();
      this.props.navigator.push({
        ...WIFI_SET_UP_SCREEN,
      })}).catch((e) => console.log(e))
    ).catch(e => toast("Please turn on the Wifi", 'error'));
  }
  goWifiGuideView(){
    Keyboard.dismiss();
    this.props.navigator.push({
      ...WIFI_GUIDE_SCREEN,
    })
  }
  showToastForResponse() {
    toast("기기 등록 완료");
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
              스마트폰의 Wi-Fi 설정을 CLARO_AP에 연결 해 주세요.
            </TitleText>
            <BottomButtonView>
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
              onPress={()=> this.goWifiSetUpView()}
            >
              <TextCenterContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                 Wifi 설정 바로가기
                </ButtonText>
              </TextCenterContainer>
            </NavButton>
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
              onPress={()=> this.goWifiGuideView()}
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

export default WifiMainView;