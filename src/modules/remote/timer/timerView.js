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
import FlipToggle from 'react-native-flip-toggle-button';
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
import DatePicker from 'react-native-datepicker';
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
  getControlDeviceRequest: Function,
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
    marginBottom:5px;
    marginTop:5px;
    marginRight:0px;
`;
const IconContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display: flex;
    margin-top: 4px;
    flex-direction: row;
    justify-content: space-around;
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
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 6px;
  margin-top:6px;
  
`;
const DatePickContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    width: 100%;
    background-color:blue;
    flex-direction: column
    justify-content: center;
    align-items: center;
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
    (async () => {
      const serialNumber = await Storage.getItem(KEYS.serialNumber);
      this.props.getControlDeviceRequest(serialNumber).catch();
    })();
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.turnOnDay !== this.props.turnOnDay)
      return true;
    else return true;
  }

  props: Props;
  setDay(date){
    let turnOnDay;
    if(_.get(this.props.turnOnDay,date)===true){
      turnOnDay = _.update(this.props.turnOnDay,date,()=>{return false;})
    }
    else
      turnOnDay = _.update(this.props.turnOnDay,date,()=>{return true;})
    this.props.setTurnOnRequest(this.props.barcode, turnOnDay,this.props.turnOnHour, this.props.isTurnOnActive);
    this.forceUpdate()
  }
  setHour(hour){
    this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay,hour, this.props.isTurnOnActive);
  }
  setHourAndroid(hour){
    console.log(hour);
    const _hour = hour.substring(0,2);
    const minute = hour.substring(3,5);
    console.log(_hour, minute,"minute and hour");
    const hour_ = new Date();
    hour_.setHours(_hour);
    hour_.setMinutes(minute);
    this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay, hour_, this.props.isTurnOnActive);
  }
  toggleTurnOffTimer(hour){
    this.props.setTurnOffRequest(this.props.barcode, hour, this.props.isTurnOffActive);
  }
  turnOffToggle(active){
    if(active===false) {
      this.props.setTurnOffRequest(this.props.barcode, new Date(), active);
    }
    else{
      this.props.setTurnOffRequest(this.props.barcode, this.props.turnOffHour, active);
    }
  }
  turnOnToggle(active){
    console.log(this.props.turnOnHour);
    if(active ===false) {
      this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay, new Date(), active);
    }
    else this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay, this.props.turnOnHour, active);
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={TimerView.dismissKeyboard}
        >
          <Container>
            <TopTextContainer>
              <TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >타이머</TitleText>
            </TopTextContainer>
            <RemoteContainer style={{marginTop: 10}}><TextLeftView><RemoteText style={{color : 'black',  fontWeight:'bold'}}>꺼짐 예약 시간</RemoteText></TextLeftView>
              <TextRightView>
                <FlipToggle
                  value={this.props.isTurnOffActive}
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
                  onToggle={ (isOn) => this.turnOffToggle(isOn)}
                />
              </TextRightView>
            </RemoteContainer>
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===1 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(1)}>
                  <RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>1시간</RemoteText></TextLeftView>
                    <TextRightView>
                      <Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:15,
                      width:15,
                      resizeMode: 'stretch'
                    }}/>
                    </TextRightView>
                  </RemoteContainer>
                    <GrayLine/>
                </TouchableOpacity>
                )
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(1)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>1시간</RemoteText></TextLeftView>
                  </RemoteContainer><GrayLine/></TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===2 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(2)}>
                  <RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>2시간</RemoteText></TextLeftView>
                    <TextRightView><Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:15,
                      width:15,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(2)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>2시간</RemoteText></TextLeftView>
                </RemoteContainer><GrayLine/></TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===4 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(4)}>
                  <RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>4시간</RemoteText></TextLeftView>
                    <TextRightView><Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:15,
                      width:15,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(4)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>4시간</RemoteText></TextLeftView>
                </RemoteContainer><GrayLine/></TouchableOpacity>)):null}
            {this.props.isTurnOffActive ?
              ( this.props.turnOffHour===8 ?
                ( <TouchableOpacity onPress={() => this.toggleTurnOffTimer(8)}>
                  <RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>8시간</RemoteText></TextLeftView>
                    <TextRightView><Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:15,
                      width:15,
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
                  <RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>12시간</RemoteText></TextLeftView>
                    <TextRightView><Image source={checkIcn} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height:15,
                      width:15,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/></TextRightView></RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)
                : (<TouchableOpacity onPress={() => this.toggleTurnOffTimer(12)}><RemoteContainer><TextLeftView><RemoteText style={{color : 'black'}}>12시간</RemoteText></TextLeftView>
                </RemoteContainer>
                  <GrayLine/>
                </TouchableOpacity>)):null}
            <RemoteContainer style={{marginBottom:10, marginTop:10}}>
              <TextLeftView>
                <RemoteText style={{color : 'black',  fontWeight:'bold'}}>켜짐 예약 시간</RemoteText>
              </TextLeftView>
              <TextRightView>
                <FlipToggle
                  value={this.props.isTurnOnActive}
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
                  onToggle={ (isOn) => this.turnOnToggle(isOn)}
                />
              </TextRightView>
            </RemoteContainer>
            {this.props.isTurnOnActive && Platform.OS==='ios' ?   (<DatePickerIOS
              date={this.props.turnOnHour}
              onDateChange={this.setHour}
              mode={"time"}
            />) : (null)}
            {this.props.isTurnOnActive && Platform.OS==='android' ?   (<DatePicker
              onDateChange={value => this.setHourAndroid(value)}
              date={this.props.turnOnHour}
              customStyles={{
                dateText:{
                  fontSize: 25,
                }
                // ... You can check the source to find the other keys.
              }}
              format="HH:mm"
              showIcon={false}
              style={{
                marginBottom: 10,
                width: '100%',
                backgroundColor: 'white',
                androidMode:'default',
              }}
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
                  }}/> :<Image source={mondayIcn} style={{
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
                  { _.get(this.props.turnOnDay,'thursday')===true ?
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
                  {  _.get(this.props.turnOnDay,'friday')===true ?
                    <Image source={fridayIcnBlue} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 50,
                      width: 50,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/> : <Image source={fridayIcn} style={{
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
                  {  _.get(this.props.turnOnDay,'saturday')===true ?
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
                  {  _.get(this.props.turnOnDay,'sunday') ===true?
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
