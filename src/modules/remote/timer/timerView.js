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
import mondayIcn from '../../../assets/images/mondayIcn.png';
import mondayIcnBlue from '../../../assets/images/mondayIcnBlue.png';
import tuesdayIcn from '../../../assets/images/tuesdayIcn.png';
import tuesdayIcnBlue from '../../../assets/images/tuesdayIcnBlue.png';
import wednesdayIcn from '../../../assets/images/wednesdayIcn.png';
import wednesdayIcnBlue from '../../../assets/images/wednesdayIcnBlue.png';
import thursdayIcn from '../../../assets/images/thursdayIcn.png';
import thursdayIcnBlue from '../../../assets/images/thursdayIcnBlue.png';
import fridayIcn from '../../../assets/images/fridayIcn.png';
import fridayIcnBlue from '../../../assets/images/fridayIcnBlue.png';
import saturdayIcn from '../../../assets/images/saturdayIcn.png';
import saturdayIcnBlue from '../../../assets/images/saturdayIcnBlue.png';
import sundayIcn from '../../../assets/images/sundayIcn.png';
import sundayIcnBlue from '../../../assets/images/sundayIcnBlue.png';
import checkIcn from '../../../assets/images/checkIcn.png';
import ToggleSwitch from 'toggle-switch-react-native'
import { DatePicker } from 'react-native-wheel-datepicker';
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
const IconContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    marginBottom: 10px;
`;
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

class TimerView extends Component<Props, State> {
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
    (async() => {
        const isTurnOnActive = await Storage.getItem(KEYS.isTurnOnActive);
        const isTurnOffActive = await Storage.getItem(KEYS.isTurnOffActive);
        const turnOnDay = await Storage.getItem(KEYS.turnOnDay);
        const turnOnHour = await Storage.getItem(KEYS.turnOnHour);
        const turnOffHour = await Storage.getItem(KEYS.turnOffHour);
        console.log(turnOnHour,'turnonhour');
        isTurnOnActive && this.props.setTurnOnTimer(isTurnOnActive);
        isTurnOffActive && this.props.setTurnOffTimer(isTurnOffActive);
        turnOnDay && this.props.setTurnOnDay(turnOnDay);
        turnOnHour && this.props.setTurnOnHour(turnOnHour);
        turnOffHour && this.props.setTurnOffHour(turnOffHour);
    }
    )();
  }

  props: Props;
  setDay(date){
    let turnOnDay;
    if(_.get(this.props.turnOnDay,date)===true){
      turnOnDay = _.update(this.props.turnOnDay,date,()=>{return false;})
    }
    else
      turnOnDay = _.update(this.props.turnOnDay,date,()=>{return true;})
    console.log(turnOnDay,'turnonDay');
    this.props.setTurnOnDay(turnOnDay);
  }
  setHour(hour){
    console.log(hour,'hour');
    this.props.setTurnOnHour(hour);
  }
  toggleTurnOffTimer(hour){
    this.props.setTurnOffHour(hour)  //꺼짐예약 시간 설정하기
  }
  turnOffToggle(active){
    this.props.setTurnOffTimer(active);
  }
  turnOnToggle(active){
   this.props.setTurnOnTimer(active);
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const newDate = new Date(this.props.turnOnHour)
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={TimerView.dismissKeyboard}
        >
          <Container>
            <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black',  fontWeight:'bold'}}>꺼짐 예약 시간</RemoteText></TextLeftView>
              <TextRightView>
                <ToggleSwitch
                  isOn={this.props.isTurnOffActive}
                  onColor='green'
                  offColor='gray'
                  size='small'
                  onToggle={ (isOn) => this.turnOffToggle(isOn)}
                />;

              </TextRightView>
            </RemoteContainer>
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===1 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(1)}>
                  <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black'}}>1시간</RemoteText></TextLeftView>
                    <TextRightView>  <Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:30,
                      width:30,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                    <GrayLine/>
                </TouchableOpacity>
                )
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(1)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>1시간</RemoteText></TextLeftView>
                  </RemoteContainer>         <GrayLine/></TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===2 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(2)}>
                  <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black'}}>2시간</RemoteText></TextLeftView>
                    <TextRightView>  <Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:30,
                      width:30,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(2)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>2시간</RemoteText></TextLeftView>
                </RemoteContainer>         <GrayLine/></TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===4 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(4)}>
                  <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black'}}>4시간</RemoteText></TextLeftView>
                    <TextRightView>  <Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:30,
                      width:30,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(4)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>4시간</RemoteText></TextLeftView>
                </RemoteContainer>         <GrayLine/></TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===8 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(8)}>
                  <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black'}}>8시간</RemoteText></TextLeftView>
                    <TextRightView>  <Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:30,
                      width:30,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(8)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>8시간</RemoteText></TextLeftView>
                </RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===12 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(12)}>
                  <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black'}}>12시간</RemoteText></TextLeftView>
                    <TextRightView>  <Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:30,
                      width:30,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(12)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>12시간</RemoteText></TextLeftView>
                </RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)):null}
            <RemoteContainer><TextLeftView ><RemoteText style={{color : 'black',  fontWeight:'bold'}}>켜짐 예약 시간</RemoteText></TextLeftView>
              <TextRightView>       <ToggleSwitch
                isOn={this.props.isTurnOnActive}
                onColor='green'
                offColor='gray'
                size='small'
                onToggle={ (isOn) => this.turnOnToggle(isOn)}
              />
              </TextRightView></RemoteContainer>
            {this.props.isTurnOnActive && Platform.OS==='ios' ?   (this.props.turnOnHour &&<DatePickerIOS
              date={newDate}
              onDateChange={this.setHour}
              mode={"time"}

            />) : (null)}
            {this.props.isTurnOnActive && Platform.OS==='android' ?   (<DatePicker
              onValueChange={value => this.setHour(value)}
              mode={"time"}
            />) : (null)}
            {this.props.isTurnOnActive ?   (
              <IconContainer>
              <TouchableOpacity onPress={() => this.setDay("monday")}>
                {  _.get(this.props.turnOnDay,'monday')===true ?
                  <Image source={mondayIcnBlue} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 50,
                    width: 50,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> :   <Image source={mondayIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 50,
                    width: 50,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>
                }
              </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("tuesday")}>
                  {  _.get(this.props.turnOnDay,'tuesday')===true ?
                    <Image source={tuesdayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> :   <Image source={tuesdayIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("wednesday")}>
                  { _.get(this.props.turnOnDay,'wednesday')===true ?
                    <Image source={wednesdayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> :   <Image source={wednesdayIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("thursday")}>
                  { _.get(this.props.turnOnDay,'thursday')?
                    <Image source={thursdayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> :   <Image source={thursdayIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("friday")}>
                  {  _.get(this.props.turnOnDay,'friday') ?
                    <Image source={fridayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> :   <Image source={fridayIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("saturday")}>
                  {  _.get(this.props.turnOnDay,'saturday') ?
                    <Image source={saturdayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> :   <Image source={saturdayIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("sunday")}>
                  {  _.get(this.props.turnOnDay,'sunday') ?
                    <Image source={sundayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> :   <Image source={sundayIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/>
                  }
                </TouchableOpacity>

              </IconContainer>
            ) : (null)}
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default TimerView;

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