import { connect } from 'react-redux';
import React, { Component } from 'react';

import {Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import toast from '../../../utils/toast';
import easi6Logo from '../../../assets/images/easi-6.png';
import toast from '../../../utils/toast';
import { Keyboard } from 'react-native';
import { TCP_REQUEST_SUCCESS } from '../../../middleware/tcpapi';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import BarcodeScanView from '../barcodescan/BarcodeScanView';
import createLogger, { LEVEL } from '../../../utils/ClaroLogger';
import { Icon } from 'react-native-elements'
import {RENTAL_DETAIL_SCREEN} from '../../../../screens';

const logger = createLogger(LEVEL.VERBOSE);

type Props = {
    ssid: ?string,
    password: ?string,
    ip: ?string,
    sendWifiInfoRequest: Function,
};

type State = {
  secure: boolean,
};
const WifiSetUpInput= styled.TextInput`
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

const WifiSetUpText = styled.Text`
  font-size: 15px;
  color: #909090;
`;


class WifiSetUpView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  state: State = {
    secure: true,
  };
  props: Props;

  sendWifi() {
    if (this.props.ssid == null || this.props.ssid === '') {
      toast(this.props.t('enter_your_ssid'),'error');
      return;
    }
    Keyboard.dismiss();
    this.props.sendWifiInfoRequest(
      this.props.ssid,
      this.props.password,
    );
  }

  goRemote() {
    Keyboard.dismiss();
    this.props.navigator.push({
      ...REMOTE_SCREEN,
    });
  }

  toggleSecure() {
    this.setState({
      secure: !this.state.secure,
    });
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={WifiSetUpView.dismissKeyboard}
        >
        <Container>
            <WifiSetUpText>공유기 설정</WifiSetUpText>
              <WifiSetUPInput placeholder="Wifi AP name" value={this.props.ssid} onChangeText={ssid => this.setState({ssid})} />
              <WifiSetUpInput placeholder="Password" value={this.props.password} onChangeText={password => this.setState({password})} secureTextEntry={this.state.secure} />
              <Icon active name={this.state.secure ? 'eye' : 'eye-with-line'} onPress={() => this.toggleSecure()} />
            {/* <Button
              light
              style={{ marginBottom: 20 }}
              onPress={() => this.props.getNf됻etworkInfo()}
            >
              <Text>접속한 AP정보 가져오기(가정 공유기에 연결된 상태에서 누르는 용도)</Text>
            </Button> */}
            <Button>
              style={{ marginBottom: 20 }}
              onPress={() => this.sendWifi()}
            >
              <WifiSetUpText>위에 입력한 AP정보를 모듈로 보내기</WifiSetUpText>
            </Button>
            <Text>
              (tcp data type 0x0300 전송에 성공하고 0x0301전송받는것에 성공하면 리모콘 화면으로 자동으로 이동)
            </Text>
            <Button
              light
              style={{ marginBottom: 20 }}
              onPress={() => this.goRemote()}
            >
              <Text>리모콘 화면으로 가기</Text>
            </Button>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}