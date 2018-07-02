/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import Camera from 'react-native-camera';
import {
  Platform,
  Button,
  Image,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  NativeModules
} from 'react-native';
import autoBind from 'react-autobind';
import NavigationStyleWrapper from '../../../../src/utils/NavigationStyleWrapper'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import {SERIAL_NUMBER_SCREEN} from '../../../../screens';
import exitIcn from '../../../../src/assets/images/exit.png';
import whiteExitIcn from '../../../../src/assets/images/x-mark-32.png';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight((statusBarHeight)=>{
  console.log(statusBarHeight)
}) : StatusBarManager.HEIGHT;
type Props = {
  updateBarcode: Function,
};

type State = {
  camera: Object,
  isRecording: boolean,
};


const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

const BarcodeText = styled.Text`
  font-size: 15px;
  color: #909090;
`;
const TitleText = styled.Text`
  align-self: center;
  font-size: 20px;
  color: white;
  opacity:1;
  background-color: transparent;
  position: absolute;
  top: 70px;
  textAlignVertical: center;
  textAlign: center;
`;

const NavBar = styled.View`
  display: flex;
  flexDirection: row;
  justifyContent: flex-end;
  alignItems: center;
`;


class BarcodeScanView extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.camera = null;
    autoBind(this);
    NavigationStyleWrapper(this.props.navigator,'light','transparent','transparent',true,true,'white','white')
  }
  state: State = {
    camera: {
      aspect: Camera.constants.Aspect.fill,
      captureTarget: Camera.constants.CaptureTarget.cameraRoll,
      type: Camera.constants.Type.back,
      orientation: Camera.constants.Orientation.auto,
      flashMode: Camera.constants.FlashMode.auto,
    },
    isRecording: false,
  };

  onBarcodeRead(e) {
    this.props.updateBarcode(e);
    this.props.navigator.push({
      ...SERIAL_NUMBER_SCREEN,
    });
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  camera: any = null;
  props: Props;

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={BarcodeScanView.dismissKeyboard}
        >
          <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
            <Container>
              <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                aspect={this.state.camera.aspect}
                captureTarget={this.state.camera.captureTarget}
                type={this.state.camera.type}
                flashMode={this.state.camera.flashMode}
                onFocusChanged={() => {}}
                onZoomChanged={() => {}}
                defaultTouchToFocus
                mirrorImage={false}
                onBarCodeRead={e => this.onBarcodeRead(e)}
              />
            </Container>
            <View style={{position:'absolute',opacity:0.5, height:150, width: '100%', backgroundColor:'black', display:'flex', justifyContent: 'center',alignItems: 'center'}}/>
              <TitleText>{'제품뒷면 바코드를\n스캐너 화면에 맞춰 주세요.'}</TitleText>
            <TouchableHighlight style={{position: 'absolute', right: 30, top: 45}} onPress={()=>this.props.navigator.pop()}>
              <Image source={whiteExitIcn} resizeMode='stretch' style={{ height:20, width:20}}/>
            </TouchableHighlight>
          </View>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  BarcodeScanView