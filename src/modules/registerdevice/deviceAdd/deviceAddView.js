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
import {
  BARCODE_SCAN_SCREEN, SERIAL_NUMBER_SOLUTION_SCREEN, WIFI_MAIN_SCREEN
} from '../../../../screens';
import {KEYS} from '../../../utils/ClaroStorage';
import Storage from '../../../utils/ClaroStorage';
type Props = {
  sendSerialNumberRequest: Function,
  restoreSerialNumber: Function,
  restoreDevice: Function,
  registerDeviceRequest: Function,
  barcode: String,
  restoreDeviceInfo: Function,
};

type State = {
  serialNumber: ?string,
  secure: boolean,
};

const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  border-bottom-width: 2px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: #333333;
`;
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
const BottomButtonView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-end;
    align-items: center;
`;


class DeviceAddView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      secure: true,
      isFan: false,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      (async() => {
      const barcode = await Storage.getItem(KEYS.serialNumber);
       this.props.getControlDeviceRequest(barcode)
      })();
    }
    else if (event.type === 'NavBarButtonPress') {
      console.log("Button is pressed", event.id);
      if (event.id === 'toggleDrawer') {
        console.log("toggleDrawer1");
        this.props.navigator.toggleDrawer({
          animated: true,
          side: 'left',
        });
      }
    }
  }

  componentWillMount() {
    this.props.restoreDeviceInfo("","","");
  }
  props: Props;

  goBarcodeScan() {
    Keyboard.dismiss();
    this.props.navigator.push({
      ...BARCODE_SCAN_SCREEN,
    })
  }
  sendSerialAndServerInfo() {
    Keyboard.dismiss();
    if (this.props.barcode == null || this.props.barcode === '') {
      toast(this.props.t('enter_your_SN'), 'error');
    }
    else {
      this.props.navigator.push({
        ...WIFI_MAIN_SCREEN,
      })
    }
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={DeviceAddView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              제품추가등록
            </TitleText>
            <IntroduceText>
              {'CLARO APP을 사용 하시기 위해서는 제품을 등록하셔야 합니다.\n 제품 등록은 고객님의 제품 활용을 지원 하기 위해 꼭 필요한 단계입니다\n\n제품 뒷면의 S/N 번호를 직접 입력하시거나 스캔해 주세요\n'}
            </IntroduceText>
            <IntroduceText style={  {textDecorationLine:'underline', marginBottom:30,  flexGrow:0, color:'black',alignSelf: 'flex-start',
              flexShrink:0,
              flexBasis: 'auto'}} onPress={()=>this.props.navigator.push({
              ...SERIAL_NUMBER_SOLUTION_SCREEN
            })} >
              S/N 확인방법
            </IntroduceText>
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
              onPress={()=> this.goBarcodeScan()}
            >
              <TextCenterContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  바코드 스캐너로 입력
                </ButtonText>
              </TextCenterContainer>
            </NavButton>
            <IntroduceText>
              S/N 직접입력
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(barcode)=>this.props.updateBarcode(barcode)}
              value={this.props.barcode}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 25}}
              blurOnSubmit={true}
            />
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

export default DeviceAddView;