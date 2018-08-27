/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import Storage from '../../utils/ClaroStorage';
import { REGISTER_COMPLETE_SCREEN } from '../../../screens';
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
};

const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  border-bottom-width: 2px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: black;
`;
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;  
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
class NicknameView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  props: Props;
  updateNickname(nickname) {
    this.props.updateNickname(nickname);
  }
  goRegisterCompleteScreen(){
    Keyboard.dismiss();
    if(this.props.nickname==="" || this.props.nickname===null) {
      this.props.updateNickname(this.props.deviceInfo.modelName)
      this.props.updateDeviceRequest(this.props.barcode, this.props.deviceInfo.modelName).then(()=> Storage.setItem('nickname',this.props.deviceInfo.modelName)).
        then(()=> this.props.navigator.push({
        ...REGISTER_COMPLETE_SCREEN,
      })).catch((e)=>console.log(e));
    }
    else {
      this.props.updateDeviceRequest(this.props.barcode, this.props.nickname).then(()=> Storage.setItem('nickname',this.props.nickname)).then(()=> this.props.navigator.push({
        ...REGISTER_COMPLETE_SCREEN,
      })).catch((e)=>console.log(e))
    }
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={NicknameView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              별명등록
            </TitleText>
            <IntroduceText  style={{color: 'black', fontWeight:'bold'}}>
              {this.props.deviceInfo.modelName}
            </IntroduceText>
            <IntroduceText>
              {'\n\n제품의 별명을 입력하십시오.\n(동일 모델 제품을 여러대 등록하실 경우 편리하게 구분 하실 수 있습니다.\n 예: 거실/안방 등)\n\n별명을 등록하지 않을 경우 제품명으로 표기 됩니다.'}
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(nickname)=>this.updateNickname(nickname)}
              value={this.props.nickname}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 25}}
              blurOnSubmit={true}
            />
            <BottomButtonView>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.goRegisterCompleteScreen()}
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

export default NicknameView;
