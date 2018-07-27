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
import {
  DEVICE_SELECT_SCREEN
} from '../../../../screens';
type Props = {
  sendSerialNumberRequest: Function,
  restoreSerialNumber: Function,
  restoreDevice: Function,
  registerDeviceRequest: Function,
  barcode: String,
};
type State = {
  serialNumber: ?string,
};
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


class RegisterCompleteTempView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  props: Props;
  goRemoteScreen() {
    Keyboard.dismiss();
    this.props.navigator.resetTo({
      ...DEVICE_SELECT_SCREEN,
    })
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={RegisterCompleteTempView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              제품 등록 완료되었습니다.
            </TitleText>
            <IntroduceText>
              제품명: {this.props.deviceInfoTemp.modelName}
            </IntroduceText>
            <IntroduceText>
              별명: {this.props.nicknameTemp}
            </IntroduceText>
            <BottomButtonView>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.goRemoteScreen()}
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
export default RegisterCompleteTempView;