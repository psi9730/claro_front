/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import Camera from 'react-native-camera';
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import autoBind from 'react-autobind';

import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import {SERIAL_NUMBER_SCREEN} from '../../../../screens';

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
  background-color: white;
  padding: 15px;
  padding-bottom: 35px;
`;

const BarcodeText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

class BarcodeScanView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.camera = null;
    autoBind(this);
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
    console.log('this.state', this.state);

    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={BarcodeScanView.dismissKeyboard}
        >
        <Container style={{display: 'flex', backgroundColor: 'black'}}>
          {/*<BarcodeText style={{backgroundColor: 'blue'}}>Barcode Scan</BarcodeText>*/}
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={{
              backgroundColor: 'red',
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
      </TouchableWithoutFeedback>
  </ThemeProvider>
    );
  }
}

export default  BarcodeScanView