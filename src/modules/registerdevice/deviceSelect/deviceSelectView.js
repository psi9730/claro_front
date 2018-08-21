/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, DatePickerIOS, Platform,
  TouchableWithoutFeedback,ScrollView
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import _ from 'lodash';
import infoIcnBlue from '../../../assets/images/infoIcnBlue.png';
import checkIcn from '../../../assets/images/checkIcn.png';
import ToggleSwitch from 'toggle-switch-react-native'
import FlipToggle from 'react-native-flip-toggle-button';
import {DEVICE_INFO_SCREEN,DEVICE_ADD_SCREEN} from '../../../../screens';
type Props = {
  sendSerialNumberRequest: Function,
  restoreSerialNumber: Function,
  restoreDevice: Function,
  registerDeviceRequest: Function,
  barcode: String,
  setTimer: Function,
  setTurnOnHour: Function,
  setTurnOnDay: Function,
  setTurnOffHour: Function,
  setTurnOffTimer: Function,
  setTurnOnTimer: Function,
  isTurnOnActive: boolean,
  isTurnOffActive: boolean,
  turnOnHour: any,
  turnOffHour : any,
  turnOnDay: String,
  isActiveRequest: Function,
  getDevicesRequest: Function,
  getUserProfileRequest: Function,
  isActive: boolean,
  devices: any,
  power: number,
  sterilizing: number,
  airCleaning: number,
  AI: number,
  isTurnOnActive: boolean,
  isTurnOffActive: boolean,
  turnOnDay: any,
  turnOnHour: Date,
  turnOffHour: number,
};

type State = {
  serialNumber: ?string,
  secure: boolean,
};

const TextRightView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
    margin-right:10px;
`;
const RemoteContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom:11px;
    margin-top:11px;
    margin-right:0px;
`;
const TitleText = styled.Text`
    font-size:21px;
    font-weight:bold;
`
const TextLeftView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const GrayLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
`;
const RemoteText = styled.Text`
`

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  background-color: white;
  padding: 30px;
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
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
const ScrollContainer = styled.ScrollView`
  flex-grow: 4;
  flex-shrink: 0;
  flex-basis: 0px;
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
class DeviceSelectView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isActive: false,
      isTurnOffActive: false,
      turnOffHour: 1,
      turnOnDay: "MON",
      isTurnOnActive: false,
      turnOnHour: new Date(),
    }
  }
  props: Props;
  componentWillMount() {
    this.props.getUserProfileRequest().catch((e)=>console.log(e));
    this.props.getDevicesRequest(this.props.barcode).then(()=> (async() => {
      }
    )()).catch((e)=>console.log(e));
  }
  goToDetail(index){
      this.props.navigator.push({
        ...DEVICE_INFO_SCREEN,
      passProps: {deviceIndex:index}})
  }
  goToDeviceAddScreen(){
    (async() => {
      await Storage.setItem(KEYS.serialNumber,this.props.barcode);
    })();
    this.props.navigator.resetTo({
      ...DEVICE_ADD_SCREEN,
    })
  };

  pushToggle(active){
    this.props.isActiveRequest(active).catch();
  }
  setControlDevice(device){
     this.props.getControlDeviceRequest(device.serialNumber).then(()=> (async() => {await Storage.setItem(KEYS.serialNumber, this.props.barcode);
      })()).catch()
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={DeviceSelectView.dismissKeyboard}
        >
          <Container>
            <TopTextContainer>
              <TitleText>제품 관리</TitleText>
            </TopTextContainer>
            <RemoteContainer>
              <TextLeftView>
                <RemoteText style={{color : 'black',  fontWeight:'bold'}}>푸쉬 알림을 허용합니다</RemoteText>
              </TextLeftView>
              <TextRightView>
                <FlipToggle
                  value={this.props.isActive}
                  buttonWidth={70}
                  buttonHeight={36}
                  buttonRadius={36}
                  sliderWidth={30}
                  sliderHeight={30}
                  sliderRadius={50}
                  buttonOnColor="#4CD964"
                  buttonOffColor="gray"
                  sliderOnColor="#FFFFFF"
                  sliderOffColor="#FFFFFF"
                  onToggle={ (isOn) => this.pushToggle(isOn)}
                />
              </TextRightView>
            </RemoteContainer>
            <ScrollContainer>
              {_.map(this.props.devices, (device, index) => {
                  return (
                    <View key={index}>
                      <RemoteContainer>
                        <TextLeftView>
                          <TouchableOpacity onPress={() => this.goToDetail(index)}>
                            <View>
                              <Image source={infoIcnBlue} style={{
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: 'auto',
                                height: 20,
                                width: 20,
                                resizeMode: 'stretch'
                              }}/>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.setControlDevice(device)}>
                            <View style={{marginLeft: 10}}>
                              {
                                device.deviceInfo ?(
                                  <RemoteText
                                    style={{
                                      color: 'black',
                                      fontWeight: 'bold'
                                    }}>{device.deviceUser.nickname} {device.deviceInfo.modelName}
                                  </RemoteText>): null
                              }
                            </View>
                          </TouchableOpacity>
                        </TextLeftView>
                        <TextRightView>
                          {device.serialNumber === this.props.barcode && <Image
                            source={checkIcn} style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            flexBasis: 'auto',
                            height: 20,
                            width: 20,
                            resizeMode: 'stretch'
                          }}/>}
                        </TextRightView>
                      </RemoteContainer>
                      <GrayLine/>
                    </View>)
                }
              )
              }
            </ScrollContainer>
            <BottomButtonContainer>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.goToDeviceAddScreen()}
              >
                <TextCenterContainer>
                  <ButtonText style={{alignSelf: 'center', color:'black'}}>
                    제품 추가 등록
                  </ButtonText>
                </TextCenterContainer>
              </NavButton>
            </BottomButtonContainer>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default DeviceSelectView;
