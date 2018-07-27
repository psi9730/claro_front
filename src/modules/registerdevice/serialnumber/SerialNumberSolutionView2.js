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
import NavigationStyleWrapper from '../../../../src/utils/NavigationStyleWrapper'
import NavBarView from '../../navBar/NavBarViewContainer'
import Barcode from '../../../../src/assets/images/barcode.jpg'
import exitIcn from '../../../../src/assets/images/exit.png';
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
    };
    NavigationStyleWrapper(this.props.navigator,'dark','white','white',true,false,'black','black')
  }
  componentWillMount() {

  }
  props: Props;

  pop(){
    this.props.navigator.pop();
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={SerialNumberSolutionView.dismissKeyboard}
        >
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
              <NavBarView POP={this.pop} exitButton={exitIcn} backgroundColor={'transparent'} navigator={this.props.navigator}/>
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
            </View>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default SerialNumberSolutionView;