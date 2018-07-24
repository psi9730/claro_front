/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import toast from '../../utils/toast';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {
WIFI_SET_UP_SCREEN, REMOTE_SCREEN,
} from '../../../screens';
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


const GrayLine = styled.View`
  height: 1px;
  width: 70%;
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


class RegisterCompleteView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      secure: true,
      isFan: false,
    }

  }



  componentWillMount() {
    (async() => {
        await Storage.setItem(KEYS.serialNumber, this.props.barcode);
    })();
    this.props.setControlDevice2Request(this.props.barcode,0,0,0,0,0,false,false,  {
      monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    },
    1,new Date())
  }

  props: Props;

  goRemoteScreen() {
    Keyboard.dismiss();
    this.props.navigator.resetTo({
      ...REMOTE_SCREEN,
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
          onPress={RegisterCompleteView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              제품 등록 완료되었습니다.
            </TitleText>
            <IntroduceText>
              제품명: {this.props.deviceInfo.modelName}
            </IntroduceText>
            <IntroduceText>
              별명: {this.props.nickname}
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

export default RegisterCompleteView;

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