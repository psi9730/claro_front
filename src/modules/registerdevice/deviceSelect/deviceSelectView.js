/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, DatePickerIOS, Platform,
  TouchableWithoutFeedback
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import toast from '../../../utils/toast';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import _ from 'lodash';
import infoIcnBlue from '../../../assets/images/infoIcnBlue.png';
import checkIcn from '../../../assets/images/checkIcn.png';
import ToggleSwitch from 'toggle-switch-react-native'
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
    marginBottom:11px;
    marginTop:11px;
    marginRight:0px;
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
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
const ScrollContainer = styled.ScrollView`
  flex: 4 0 0;
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



  componentWillMount() {
    console.log('this will mount repeatedly');
    this.props.getDevicesRequest(this.props.barcode).then(()=> (async() => {
        const isTurnOnActive = await Storage.getItem(KEYS.isActivePush);
        isTurnOnActive && this.props.isActiveRequest(isTurnOnActive);
      }
    )()).catch((e)=>console.log(e));
  }
    shallowEqual(objA: mixed, objB: mixed): boolean {
    if (objA === objB) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      console.log('keysA',keysA,'keysB',keysB);
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        console.log('keysA', objA[keysA[i]],'keysB',objB[keysA[i]]);
        return false;
      }
    }

    return true;
  }

  shallowCompare(instance, nextProps, nextState) {
    return (
      !this.shallowEqual(instance.props, nextProps) ||
      !this.shallowEqual(instance.state, nextState)
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, 'nextProps');
    console.log(nextState,'nextState');
  return this.shallowCompare(this, nextProps, nextState);
  }

  props: Props;
  goToDetail(index){
      this.props.navigator.push({
        ...DEVICE_INFO_SCREEN,
      passProps: {deviceIndex:index}})
  }
  goToDeviceAddScreen(){
    (async() => {
      await Storage.setItem(KEYS.serialNumber,this.props.barcode);
      await Storage.setItem(KEYS.nickname,this.props.nickname);
      await Storage.setItem(KEYS.deviceInfo,this.props.deviceInfo);
    })();
    this.props.navigator.push({
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
            <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black',  fontWeight:'bold'}}>푸쉬 알림을 허용합니다</RemoteText></TextLeftView>
              <TextRightView>
                <ToggleSwitch
                  isOn={this.props.isActive}
                  onColor='green'
                  offColor='gray'
                  size='small'
                  onToggle={ (isOn) => this.pushToggle(isOn)}
                />
              </TextRightView>
            </RemoteContainer>
            <ScrollContainer >
            {_.map(this.props.devices, (device, index) => {
                return (
                  <View key={index}>
                    <RemoteContainer>
                      <TextLeftView>
                        <TouchableOpacity onPress={() => this.goToDetail(index)}>
                          <Image source={infoIcnBlue} style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            flexBasis: 'auto',
                            height: 20,
                            width: 20,
                            resizeMode: 'stretch'
                          }}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setControlDevice(device)}>
                          {
                            device.deviceInfo &&
                            <RemoteText
                              style={{
                                color: 'black',
                                fontWeight: 'bold'
                              }}>{device.deviceUser.nickname} ({device.deviceInfo.modelName})
                            </RemoteText>
                          }
                        </TouchableOpacity>
                      </TextLeftView>
                      <TextRightView> {device.serialNumber === this.props.barcode && <Image
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