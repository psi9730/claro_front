/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, DatePickerIOS, Platform,
  TouchableWithoutFeedback
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import _ from 'lodash';
import infoIcnBlue from '../../assets/images/infoIcnBlue.png';
import checkIcn from '../../assets/images/checkIcn.png';
import ToggleSwitch from 'toggle-switch-react-native'
import {DEVICE_INFO_SCREEN,DEVICE_ADD_SCREEN} from '../../../screens';
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
const GrayText = styled.Text`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 15px;
  color: gray;
`
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  background-color: white;
`;
const TextContainer = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  background-color: white;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom:10px;
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
`

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
class WidgetView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isActiveWidget: false,
      locationStatus: 0,
      refreshStatus: 0
    }
  }

  props: Props;
  componentWillMount() {

    (async()=> {
      const isActive = await Storage.getItem('isActiveWidget').then((value) => {
        if (value) {
          this.setState({'isActiveWidget': isActive})
        }
      })
      const locationStatus = await Storage.getItem('locationStatus').then((value) => {
        if (value) {
          this.setState({'locationStatus': locationStatus})
        }
      })
      const refreshStatus = await Storage.getItem('refreshStatus').then((value) => {
        if (value) {
          this.setState({'refreshStatus': refreshStatus})
        }
      })
    })();
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
  setLocation(status){
    this.setState({locationStatus: status});
  }
  setRefresh(status){
    this.setState({refreshStatus: status});
  }
  pushToggle(active){
    this.setState({isActiveWidget:active})
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
          onPress={WidgetView.dismissKeyboard}
        >
          <Container>
            <TextContainer style = {{ paddingBottom: 0}}>
              <TopTextContainer>
                <TitleText>위젯 설정</TitleText>
              </TopTextContainer>
              <RemoteContainer>
                <TextLeftView>
                  <RemoteText style={{color : 'black',  fontWeight:'bold'}}>위젯을 사용합니다</RemoteText>
                </TextLeftView>
                <TextRightView>
                  <ToggleSwitch
                    isOn={this.state.isActiveWidget}
                    onColor='green'
                    offColor='gray'
                    size='small'
                    onToggle={ (isOn) => this.pushToggle(isOn)}
                  />
                  </TextRightView>
                </RemoteContainer>
            </TextContainer>
            { this.state.isActiveWidget &&
            <ScrollContainer>
              <TextContainer>
                <GrayText>위치</GrayText>
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setLocation(0)}>
                      <View>
                            <RemoteText
                              style={{
                                color: 'black',
                                fontWeight: 'bold'
                              }}>고정 위치
                            </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.locationStatus === 0 && <Image
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
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setLocation(1)}>
                      <View>
                        <RemoteText
                          style={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}>GPS 실시간 위치
                        </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.locationStatus === 1 && <Image
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
              </TextContainer>
              <GrayLine/>
              <TextContainer>
                <GrayText>표시 제품</GrayText>
                  {_.map(this.props.devices, (device, index) => {
                      return (
                        <View key={index}>
                          <RemoteContainer>
                            <TextLeftView>
                              <TouchableOpacity onPress={() => this.setControlDevice(device)}>
                                <View>
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
              </TextContainer>
              <TextContainer>
                <GrayText>새로고침 주기</GrayText>
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setRefresh(0)}>
                      <View>
                        <RemoteText
                          style={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}>수동
                        </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.refreshStatus === 0 && <Image
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
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setRefresh(1)}>
                      <View>
                        <RemoteText
                          style={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}>30분
                        </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.refreshStatus === 1 && <Image
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
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setRefresh(2)}>
                      <View>
                        <RemoteText
                          style={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}>1시간
                        </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.refreshStatus === 2 && <Image
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
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setRefresh(3)}>
                      <View>
                        <RemoteText
                          style={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}>6시간
                        </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.refreshStatus === 3 && <Image
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
                <RemoteContainer>
                  <TextLeftView>
                    <TouchableOpacity onPress={() => this.setRefresh(4)}>
                      <View>
                        <RemoteText
                          style={{
                            color: 'black',
                            fontWeight: 'bold'
                          }}>12시간
                        </RemoteText>

                      </View>
                    </TouchableOpacity>
                  </TextLeftView>
                  <TextRightView>
                    {this.state.refreshStatus === 4 && <Image
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
              </TextContainer>
            </ScrollContainer> }
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default WidgetView;