/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, DatePickerIOS, Platform,
  TouchableWithoutFeedback,TouchableHighlight
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import _ from 'lodash';
import circleIcnBlue from '../../../assets/images/circleIcnBlue.png';
import exitIcnRed from '../../../assets/images/exitIcnRed.png';
import {REMOTE_SCREEN, RENTAL_DETAIL_SCREEN, SERIAL_NUMBER_SCREEN,WIFI_SET_UP_TEMP_SCREEN} from '../../../../screens';
import Modal from 'react-native-modal';
type Props = {
  updateDeviceRequest: Function,
  deviceIndex: number,
  deleteDeviceRequest: Function,
  updateNicknameTemp: Function,
  updateDeviceTemp: Function,
};

type State = {
  serialNumber: ?string,
  secure: boolean,
};


const TitleText = styled.Text`
    font-size:21px;
    font-weight:bold;
    margin-bottom:30px;
`

const GrayLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 30px;
  padding-bottom: 5px;
  padding-Top:10px;
`;

const TopTextContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-start;
    align-items: flex-start;
`;
const BottomButtonContainer= styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-end;
    align-items: center;
`;
const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  border-bottom-width: 2px;
  margin-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  border-bottom-color: black;
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
const ScrollContainer = styled.ScrollView`
  flex: 1 0 0;
  background-color: white;
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
const GrayText = styled.Text`
    font-size: 15px;
    color: gray;
`
const ModalView2= styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis:auto;
    border-radius:30;
    border-width: 1;
    border-color: white;
    width:90%;
    display:flex;
    flex-direction:column;
    background-color:white;
`;
const ModalContainer = styled.View`
    flex-grow:3;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: center;
    align-items: center;
`;
const ModalView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 180px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const BottomButtonRowView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: space-around;
    align-items: center;
`;
const ErrorText = styled.Text`
    color: red;
`;
class DeviceInfoView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    console.log(this.props.devices,'devices');
    this.state = {
      modalVisible: false,
      serialNumber: _.nth(this.props.devices,this.props.deviceIndex).serialNumber,
      nickname: _.nth(this.props.devices,this.props.deviceIndex).deviceUser.nickname,
      modelName: _.nth(this.props.devices,this.props.deviceIndex).deviceInfo.modelName,
      deviceInfo: _.nth(this.props.devices,this.props.deviceIndex).deviceInfo,
      error: '',
    }
  }
  props: Props;
  onNavigatorEvent(event) {
      if (event.type === 'NavBarButtonPress') {
        if(event.id === 'goBack')
        {
          this.props.updateDeviceRequest(this.state.serialNumber, this.props.nicknameTemp).then(()=>this.props.getDevicesRequest().catch()).then(()=>
          this.props.navigator.pop()).catch();
        }
      }
  }
  componentWillMount() {
    this.props.updateNicknameTemp(this.state.nickname);
    this.props.getDevicesRequest().catch((e)=>console.log(e));
    (async() => {
        const isTurnOnActive = await Storage.getItem(KEYS.isActivePush);
        isTurnOnActive && this.props.isActiveRequest(isTurnOnActive);
      }
    )();
  }
  goWifiSetupScreen(){
    this.props.updateDeviceRequest(this.state.serialNumber, this.props.nicknameTemp).then(()=>this.props.getDevicesRequest().catch()).then(()=>
    this.props.updateDeviceTemp(this.state.serialNumber,this.props.nicknameTemp,this.state.deviceInfo)).then(()=>this.props.navigator.push({...WIFI_SET_UP_TEMP_SCREEN})).catch();
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  updateNickname(nickname){
    this.props.updateNicknameTemp(nickname);
   // this.props.updateDeviceRequest(this.state.serialNumber,nickname).then(()=>this.props.getDevicesRequest().catch()).catch();
  }
  deleteDevice(){
    if(_.size(this.props.devices)===1) {
      this.setState({error: '최소한 하나의 기기는 등록되있어야합니다.'})
      this.setModalVisible(!this.state.modalVisible)
    }
    else if(this.state.serialNumber === this.props.barcode && this.props.deviceIndex!==0)
    {
      this.props.restoreDeviceInfo(_.nth(this.props.devices,0).serialNumber,_.nth(this.props.devices,0).deviceInfo.modelName, _.nth(this.props.devices,0).deviceInfo)
      this.props.deleteDeviceRequest(this.state.serialNumber).then(()=>this.setModalVisible(!this.state.modalVisible)).then(()=>this.props.getDevicesRequest().catch()).then(()=>{this.forceUpdate();this.props.navigator.pop()}).catch();
    }
    else if(this.state.serialNumber === this.props.barcode)
    {
      this.props.restoreDeviceInfo(_.nth(this.props.devices,1).serialNumber,_.nth(this.props.devices,1).deviceInfo.modelName, _.nth(this.props.devices,1).deviceInfo)
      this.props.deleteDeviceRequest(this.state.serialNumber).then(()=>this.props.getDevicesRequest().catch()).then(()=>this.setModalVisible(!this.state.modalVisible)).then(()=>{this.forceUpdate();this.props.navigator.pop()}).catch();
    }
    else {
      this.props.deleteDeviceRequest(this.state.serialNumber).then(()=>this.props.getDevicesRequest().catch()).then(()=>this.setModalVisible(!this.state.modalVisible)).then(()=>this.props.navigator.pop()).catch();
    }
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={DeviceInfoView.dismissKeyboard}
        >
          <Container>
            <TopTextContainer>
              <TitleText>제품 정보</TitleText>
              <GrayText>제품명</GrayText>
              <TextsBoxInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                value={this.state.modelName}
                editable={false}
                autoCapitalize='none'
                style={{marginBottom: 25, fontSize: 18, color: 'gray'}}
                blurOnSubmit={true}
              />
              <GrayText>S/N</GrayText>
              <TextsBoxInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                editable={false}
                value={this.state.serialNumber}
                autoCapitalize='none'
                style={{marginBottom: 25, fontSize: 18, color: 'gray'}}
                blurOnSubmit={true}
              />
              <GrayText>별명</GrayText>
              <TextsBoxInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                onChangeText={(nickName)=>this.updateNickname(nickName)}
                value={this.props.nicknameTemp}
                autoCapitalize='none'
                style={{marginBottom: 25, fontSize: 18}}
                blurOnSubmit={true}
              />
            </TopTextContainer>
            <BottomButtonContainer>
              <ErrorText> {this.state.error}</ErrorText>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.goWifiSetupScreen()}
              >
                <TextCenterContainer>
                  <ButtonText style={{alignSelf: 'center', color:'black'}}>
                    네트워크 연결
                  </ButtonText>
                </TextCenterContainer>
              </NavButton>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.setModalVisible(!this.state.modalVisible)}
              >
                <TextCenterContainer style={{borderColor: 'red'}}>
                  <ButtonText style={{alignSelf: 'center', color:'red'}}>
                    제품 삭제
                  </ButtonText>
                </TextCenterContainer>
              </NavButton>
            </BottomButtonContainer>
            <Modal
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setModalVisible(!this.state.modalVisible)}
            >
              <ModalView style={{marginTop: 22}}>
                <ModalView2>
                  <ModalContainer>
                    <Text>제품을 삭제하시겠습니까?</Text>
                  </ModalContainer>
                  <GrayLine/>
                  <BottomButtonRowView>
                    <TouchableHighlight onPress={()=> this.deleteDevice()} >
                      <Image source={circleIcnBlue} resizeMode='stretch' style={{height:25, width:25}}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.setModalVisible(!this.state.modalVisible)} >
                      <Image source={exitIcnRed} resizeMode='stretch' style={{height:25, width:25}}/>
                    </TouchableHighlight>
                  </BottomButtonRowView>
                </ModalView2>
              </ModalView>
            </Modal>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default DeviceInfoView;

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