/* @flow */
import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, DatePickerIOS, Platform,
  TouchableWithoutFeedback, Switch
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import Storage, {KEYS} from '../../../utils/ClaroStorage';
import _ from 'lodash';
import FlipToggle from 'react-native-flip-toggle-button';
import NavigationStyleWrapper from '../../../../src/utils/NavigationStyleWrapper'
import FillCircle from '../../../assets/images/icons8-circled-thin-filled-50.png';
import EmptyCircle from '../../../assets/images/icons8-circled-thin-50.png';
import checkIcn from '../../../assets/images/checkIcn.png';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

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
  setTurnOffRequest: Function,
  setTurnOnRequest: Function,
  getControlDeviceRequest: Function,
  hour: number,
  minute: number,
  day: String
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
    marginBottom: 8px;
    marginTop:8px;
    marginRight:0px;
`;
const IconContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display: flex;
    margin-top: 4px;
    flex-direction: row;
    justify-content: center;
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
  height: 2px;
  opacity: 0.4;
  width: 100%;
  background-color: gray;
`;
const RemoteText = styled.Text`
  fontSize:16px;
 
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
const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

class TimerView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    NavigationStyleWrapper(this.props.navigator,'light','#FFFFFF','#FFFFFF',false,false,'black','black')
    this.state = {
      isActive: false,
      isTurnOffActive: false,
      turnOffHour: 1,
      turnOnDay: "MON",
      isTurnOnActive: false,
      turnOnHour: new Date(),
      dayList: ['오전','오후'],
      hourList: ['12','1','2','3','4','5','6','7','8','9','10','11'],
      minuteList: Array.from(Array(60).keys(), i =>{ return `${i}`;})
    }
  }



  componentWillMount() {
    this.setState({minute: this.props.minute.toString(), hour: this.props.hour.toString(), day: this.props.day.toString()});
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
  setDays(i){
    const day = _.nth(this.state.dayList,i);
    const hour_ = new Date();
    if(day==='오전') {
      hour_.setHours(this.props.hour);
      hour_.setMinutes(this.props.minute);
    }
    else {
      hour_.setHours(this.props.hour + 12);
      hour_.setMinutes(this.props.minute);
    }
    console.log(hour_);
    this.setState({day: day})
    this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay, hour_, this.props.isTurnOnActive);
  }
  setHours(i){
    let hour = _.nth(this.state.hourList,i);
    if(hour==='12')
    {
      hour= '0';
    }
    const hour_ = new Date();
    if(this.props.day==='오전'){
      hour_.setHours(parseInt(hour));
      hour_.setMinutes(this.props.minute);
    }
    else {
      hour_.setHours(parseInt(hour)+12);
      hour_.setMinutes(this.props.minute);
    }
    console.log(hour_);
    this.setState({hour: hour})
    this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay, hour_, this.props.isTurnOnActive);
  }
  setMinutes(i){
    const minute = _.nth(this.state.minuteList,i);
    const hour_ = new Date();
    if(this.props.day==='오전'){
      hour_.setHours(this.props.hour);
      hour_.setMinutes(parseInt(minute));
    }
    else {
      hour_.setHours(this.props.hour+12);
      hour_.setMinutes(parseInt(minute));
    }
    this.setState({minute: minute});
    this.props.setTurnOnRequest(this.props.barcode, this.props.turnOnDay, hour_, this.props.isTurnOnActive);
  }
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
    NavigationStyleWrapper(this.props.navigator,'light','#FFFFFF','#FFFFFF',false,false,'black','black')
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
                { Platform.OS==='android' ?
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
                    onToggle={(isOn) => this.turnOffToggle(isOn)}
                  /> :
                  <Switch
                  onValueChange = {(isOn)=>this.turnOffToggle(isOn)}
                  value = {this.props.isTurnOffActive}/>
                }
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
                <View style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                  {this.props.isTurnOnActive && Platform.OS==='ios' ?   ( <RowContainer style={{position:'absolute',top:0}}>
                    <Picker style={{width: 100, height: 150}}
                            selectedValue={_.indexOf(this.state.dayList,this.state.day)}
                            itemStyle={{fontSize:26, color:'black', borderBottomWidth: 2,  borderTopWidth:2}}
                            onValueChange={(index) => this.setDays(index)}>
                      {this.state.dayList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"day"+value}/>
                      ))}
                    </Picker>
                    <Picker style={{width: 100, height: 150}}
                            selectedValue={_.indexOf(this.state.hourList,this.state.hour)}
                            itemStyle={{fontSize:18, color:'black'}}
                            onValueChange={(index) => this.setHours(index)}>
                      {this.state.hourList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"hour"+value}/>
                      ))}
                    </Picker>
                    <Picker style={{width: 100, height: 150}}
                            selectedValue={_.indexOf(this.state.minuteList,this.state.minute)}
                            itemStyle={{fontSize:18, color:'black'}}
                            onValueChange={(index) => this.setMinutes(index)}>
                      {this.state.minuteList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"minute"+value}/>
                      ))}
                    </Picker>
                    <View style={{backgroundColor: '#FFFFFF', width: '100%', position: 'absolute', flexBasis: 85, height: 85, top: 0}}/>
                    <View style={{backgroundColor: '#FFFFFF', width: '100%', position: 'absolute', flexBasis: 85, height: 85, top: 130}}/>
                    <GrayLine style={{position: 'absolute',top:130}}/>
                    <GrayLine style={{position: 'absolute',top:85}}/>
                  </RowContainer>) : (null)}
                  {this.props.isTurnOnActive && Platform.OS==='android' ?   ( <RowContainer style={{position: 'absolute', top: 0, display:'flex', justifyContent: 'center'}}>
                    <GrayLine style={{position: 'absolute',top:114}}/>
                    <GrayLine style={{position: 'absolute',top:82}}/>
                    <Picker style={{width: 100, height: 200}}
                            selectedValue={_.indexOf(this.state.dayList,this.state.day)}
                            itemStyle={{fontSize:26, color:'black', borderBottomWidth: 2,  borderTopWidth:2}}
                            onValueChange={(index) => this.setDays(index)}>
                      {this.state.dayList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"day"+value}/>
                      ))}
                    </Picker>
                    <Picker style={{width: 100, height: 200}}
                            selectedValue={_.indexOf(this.state.hourList,this.state.hour)}
                            itemStyle={{fontSize:18, color:'black'}}
                            onValueChange={(index) => this.setHours(index)}>
                      {this.state.hourList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"hour"+value}/>
                      ))}
                    </Picker>
                    <Picker style={{width: 100, height: 200}}
                            selectedValue={_.indexOf(this.state.minuteList,this.state.minute)}
                            itemStyle={{fontSize:18, color:'black'}}
                            onValueChange={(index) => this.setMinutes(index)}>
                      {this.state.minuteList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"minute"+value}/>
                      ))}
                    </Picker>
                    <View style={{backgroundColor: '#FFFFFF', width: '100%', position: 'absolute', flexBasis: 82, height:82, top: 0}}/>
                    <View style={{backgroundColor: '#FFFFFF', width: '100%', position: 'absolute', flexBasis: 82, height:82, top: 114}}/>
                    <GrayLine style={{position: 'absolute',top:114}}/>
                    <GrayLine style={{position: 'absolute',top:82}}/>
                  </RowContainer>) : (null)}
                  <RemoteContainer style={{marginBottom:10, marginTop:20}}>
                    <TextLeftView>
                      <RemoteText style={{color : 'black',  fontWeight:'bold'}}>켜짐 예약 시간</RemoteText>
                    </TextLeftView>
                    <TextRightView>
                      { Platform.OS==='android' ?
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
                          onToggle={(isOn) => this.turnOnToggle(isOn)}
                        /> :
                        <Switch
                          onValueChange = {(isOn)=>this.turnOnToggle(isOn)}
                          value = {this.props.isTurnOnActive}/>
                      }
                    </TextRightView>
                  </RemoteContainer>
                </View>
            {this.props.isTurnOnActive ?   (
              <IconContainer style={{marginTop:100}}>
              <TouchableOpacity onPress={() => this.setDay("monday")}>
                {  _.get(this.props.turnOnDay,'monday')===true ?
                  <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                    <Image source={FillCircle} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 40,
                    width: 40,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>
                    <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>월</Text>
                  </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 40,
                    width: 40,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>월</Text></View>
                }
              </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("tuesday")}>
                  {  _.get(this.props.turnOnDay,'tuesday')===true ?
                    <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                      <Image source={FillCircle} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 40,
                        width: 40,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>화</Text>
                    </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 40,
                      width: 40,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>화</Text></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("wednesday")}>
                  { _.get(this.props.turnOnDay,'wednesday')===true ?
                    <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                      <Image source={FillCircle} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 40,
                        width: 40,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>수</Text>
                    </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 40,
                      width: 40,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>수</Text></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("thursday")}>
                  { _.get(this.props.turnOnDay,'thursday')===true ?
                    <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                      <Image source={FillCircle} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 40,
                        width: 40,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>목</Text>
                    </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 40,
                      width: 40,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>목</Text></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("friday")}>
                  {  _.get(this.props.turnOnDay,'friday')===true ?
                    <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                      <Image source={FillCircle} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 40,
                        width: 40,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>금</Text>
                    </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 40,
                      width: 40,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>금</Text></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("saturday")}>
                  {  _.get(this.props.turnOnDay,'saturday')===true ?
                    <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                      <Image source={FillCircle} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 40,
                        width: 40,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>토</Text>
                    </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 40,
                      width: 40,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>토</Text></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setDay("sunday")}>
                  {  _.get(this.props.turnOnDay,'sunday') ===true?
                    <View style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}>
                      <Image source={FillCircle} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 40,
                        width: 40,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>
                      <Text style={{ position: 'absolute', fontSize:17, color: '#FFFFFF',top:10}}>일</Text>
                    </View> :<View  style={{display: 'flex',justifyContent: 'center', alignItems:'center',margin:2}}><Image source={EmptyCircle} style={{
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: 'auto',
                      height: 40,
                      width: 40,
                      marginBottom: 4,
                      resizeMode: 'stretch'
                    }}/><Text style={{ position: 'absolute', fontSize:17, color: '#2dc3e8',top:10}}>일</Text></View>
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
