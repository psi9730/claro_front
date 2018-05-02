import { connect } from 'react-redux';
import React, { Component } from 'react';

import {Button, Image, Keyboard, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import toast from '../../../utils/toast';
import easi6Logo from '../../../assets/images/easi_6.png';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {SERIAL_NUMBER_SCREEN} from '../../../../screens';
import {REMOTE_SCREEN} from '../../../../screens';
type Props = {
    ssid: ?string,
    password: ?string,
    ip: ?string,
    sendWifiInfoRequest: Function,
    updateWifiSsid: Function,
    updateWifiPassword: Function,
    restoreWifiInfo: Function,
    navigator: ?Function,
    sendApRequest: Function,
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
    this.state = {
      secure: true,
    };
  }
  props: Props;
  componentWillMount() {
    (async () => {
      const ssid = await Storage.getItem(KEYS.ssid);
      const password = await Storage.getItem(KEYS.password);
      this.props.restoreWifiInfo(ssid, password);
    })();
  }
  showToastForResponse() {
    toast("wifi 등록완료");
  }

  sendWifi() {
    if (this.props.ssid == null || this.props.ssid === '') {
      toast(this.props.t('enter_your_ssid'),'error');
      return;
    }
    Keyboard.dismiss();
    this.props.sendWifiInfoRequest(
      this.props.ssid,
      this.props.password,
    ).then(()=> {
      console.log("SerialNumber completed");
      (
        async () => {
          let key;
          key = KEYS.ssid;
          let key2 = KEYS.password;
          console.log(this.props.ssid+" ssid is");
          console.log(this.props.password+" password is");
          await Storage.setItem(key, this.props.ssid);
          console.log("store ssid "+Storage.getItem(KEYS.ssid));
          await Storage.setItem(key2, this.props.password);
          console.log("store password "+Storage.getItem(KEYS.ssid));
          this.showToastForResponse();
          this.props.navigator.push({
            ...SERIAL_NUMBER_SCREEN,
          });
        })();}).catch();
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
              <WifiSetUpInput placeholder="Wifi AP name" value={this.props.ssid} onChangeText={ssid => this.props.updateWifiSsid(ssid)} />
              <WifiSetUpInput placeholder="Password" value={this.props.password} onChangeText={password => this.props.updateWifiPassword(password)} secureTextEntry={this.state.secure} />
              <Icon active name={this.state.secure ? 'visibility' : 'visibility-off'} onPress={() => this.toggleSecure()} />
            {/* <Button
              light
              style={{ marginBottom: 20 }}
              onPress={() => this.props.getNf됻etworkInfo()}
            >
              <Text>접속한 AP정보 가져오기(가정 공유기에 연결된 상태에서 누르는 용도)</Text>
            </Button> */}
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => this.sendWifi()}
              title="위에 입력한 WIFI정보를 모듈로 보내기"
            />
            <Text>
              (tcp data type 0x0300 전송에 성공하고 0x0301전송받는것에 성공하면 리모콘 화면으로 자동으로 이동)
            </Text>
            <Button
              light
              style={{ marginBottom: 20 }}
              onPress={() => this.goRemote()}
              title="리모콘 화면으로 가기"
            />
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  WifiSetUpView;