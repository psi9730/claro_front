/* @flow */

import { connect } from 'react-redux';
import React, { Component } from 'react';

import {Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import toast from '../../../utils/toast';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import {BARCODE_SCAN_SCREEN, WIFI_SET_UP_SCREEN,REMOTE_SCREEN} from '../../../../screens';
type Props = {
  barcode: ?string,
  sendSerialNumberRequest: Function,
  restoreSerial: Function,
  restoreDevice: Function,
  registerDevice: Function,
};

type State = {
  secure: boolean,
};
const SNInput= styled.TextInput`
  width: 70%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 15px;
  padding-bottom: 35px;
`;

const SerialNumberText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

class SerialNumberView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  state: State = {
    secure: true,
    isFan: false,
  };

  componentWillMount() {
    (async () => {
      const deviceInfo = await Storage.getItem(KEYS.deviceInfo);
      const serialNumber = await Storage.getItem(KEYS.serialNumber);
      this.props.restoreDevice(deviceInfo);
      this.props.restoreSerial(serialNumber);
      if (serialNumber) {
        this.props.navigator.push({
          ...WIFI_SET_UP_SCREEN,
        });
      }
    })();
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
      toast(this.props.t('enter_your_S/N'),'error');
      return;
    }
    this.props.sendSerialNumberRequest(this.props.barcode).then(()=>{ (
      async () => {
      let key;
      key = KEYS.serialNumber;
      await Storage.setItem(key, this.props.barcode);
    })();}).catch();
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={SerialNumberView.dismissKeyboard}
        >
          <Container >
            <SerialNumberText>제품 등록</SerialNumberText>
            <SerialNumberText>
                CLARO APP을 사용 하시기 위해서는 제품을 등록 하셔야 합니다.
            </SerialNumberText>
            <SerialNumberText>
                제품 등록은 고객님의 제품 활용을 지원 하기 위해 꼭 필요한 단계입니다.
            </SerialNumberText>
            <SerialNumberText>
                제품 뒷면의 S/N 번호를 직접 입력 하시거나 스캔 해 주세요.
            </SerialNumberText>
            <SNInput
              placeholder="Enter S/N yourself"
              value={this.props.barcode}
              onChangeText={barcode => this.setState({barcode})}
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
            />
        </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default SerialNumberView;