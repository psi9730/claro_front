// @flow

import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import toast from '../../utils/toast';
import arrowLeftIcn from '../../assets/images/arrowLeftIcn.png';
import {PASSWORD_CHECK_SCREEN, PHONE_NUMBER_EDIT_SCREEN,LOCATION_EDIT_SCREEN, HOME_NUMBER_EDIT_SCREEN,EMAIL_EDIT_SCREEN} from '../../../screens';
import _ from 'lodash';
type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};

const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 21px;
  margin-bottom: 20px;
  margin-top:20px;
  margin-left:20px;
`;

const GrayText = styled.Text`
  font-size: 15px;
  color: gray;
  margin-top:8px;
  margin-bottom:8px;
`;

const ContentText = styled.Text`
  font-size: 18px;
  color: black;
`
const ContentTextInput = styled.TextInput`
 padding-right:10px;

`


const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding-bottom: 5px;
`;


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
    margin-right:20px;
    margin-left:20px;
`;
const TextLeftView2 = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const TextLeftView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
`;
const GrayLine = styled.View`
  height: 1px;
  margin-Top:4px;
  margin-Bottom:4px;
  width: 100%;
  background-color: gray;
`;
const RemoteText = styled.Text`
`

const ScrollContainer = styled.ScrollView`
  flex: 1 0 0;
  width:100%;

`;

class UserProfileView extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state={
      checked: false,
    }
  }
  componentWillMount(){
   // this.props.getUserProfileRequest()
    this.props.getDevicesRequest().catch((e)=>console.log(e));
  }
  componentDidMount() {
  }
  goToPassword(){
    this.props.navigator.push({
      ...PASSWORD_CHECK_SCREEN
    })
  }
  goToPhoneNumber(){
    this.props.navigator.push({
      ...PHONE_NUMBER_EDIT_SCREEN
    })
  }
  goToHomeNumber(){
    this.props.navigator.push({
      ...HOME_NUMBER_EDIT_SCREEN
    })
  }

  goToEmail(){
    this.props.navigator.push({
      ...EMAIL_EDIT_SCREEN
    })
  }
  goToLocation(){
    console.log("gotolocation");
    this.props.navigator.push({
      ...LOCATION_EDIT_SCREEN
    })
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const {t, loading} = this.props;

    return (
      <Container>
        <TitleText style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', fontSize: 25, backgroundColor:'white', color: 'black', fontWeight:'bold'}}>
          내 정보 관리
        </TitleText>
        <View style={{flex:1}}>
          <ScrollView style={ {flexGrow:1}} contentContainerStyle={{flexGrow: 1, display:'flex',flexDirection:'column',justifyContent: 'flex-start', alignItems:'flex-start'}}>
            <RemoteContainer><TextLeftView ><GrayText> 이름 </GrayText><ContentText>{this.props.name}</ContentText></TextLeftView>
            </RemoteContainer>
            <GrayLine/>
            <RemoteContainer><TextLeftView ><GrayText> ID </GrayText><ContentText>{this.props.login}</ContentText></TextLeftView>
            </RemoteContainer>
            <GrayLine/>
            <RemoteContainer><TextLeftView ><GrayText> 비밀번호 </GrayText><ContentTextInput value={this.props.password} secureTextEntry={true} editable={false}/></TextLeftView>
              <TextRightView>
                <TouchableOpacity onPress={() => this.goToPassword()}>
                  <Image source={arrowLeftIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch'
                  }}/>
                </TouchableOpacity>
              </TextRightView>
            </RemoteContainer>
            <GrayLine/>
            <RemoteContainer><TextLeftView >  <GrayText> 휴대폰번호 </GrayText><ContentText>{this.props.phoneNumber}</ContentText></TextLeftView>
              <TextRightView>
                <TouchableOpacity onPress={() => this.goToPhoneNumber()}>
                  <Image source={arrowLeftIcn} style={{
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 'auto',
                  height: 20,
                  width: 20,
                  resizeMode: 'stretch'
                }}/>
                </TouchableOpacity>
              </TextRightView>
            </RemoteContainer>
            <GrayLine/>
            <RemoteContainer><TextLeftView >  <GrayText> 전화번호 </GrayText><ContentText>{this.props.homeNumber}</ContentText></TextLeftView>
              <TextRightView>
                <TouchableOpacity onPress={() => this.goToHomeNumber()}>
                  <Image source={arrowLeftIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch'
                  }}/>
                </TouchableOpacity>
              </TextRightView>
            </RemoteContainer>
            <GrayLine/>
            <RemoteContainer><TextLeftView >   <GrayText> e-mail </GrayText><ContentText>{this.props.email}</ContentText></TextLeftView>
              <TextRightView>
                <TouchableOpacity onPress={() => this.goToEmail()}>
                  <Image source={arrowLeftIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch'
                  }}/>
                </TouchableOpacity>
              </TextRightView>
            </RemoteContainer>
            <GrayLine/>
            <RemoteContainer><TextLeftView > <GrayText> 주소 </GrayText><ContentText>{this.props.jibunAddr}</ContentText></TextLeftView>
              <TextRightView>
                <TouchableOpacity onPress={() => this.goToLocation()}>
                  <Image source={arrowLeftIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch'
                  }}/>
                </TouchableOpacity>
              </TextRightView>
            </RemoteContainer>
            <GrayLine/>
            <ScrollContainer >
              {_.map(this.props.devices, (device, index) => {
                  return (
                    <View key={index} style={{flex:1}}>
                      <GrayText style={{marginLeft: 20}}> 등록제품 {index+1} </GrayText>
                      <RemoteContainer>
                        <TextLeftView>
                            {
                              device.deviceInfo &&
                              <RemoteText
                                style={{
                                  color: 'black', marginBottom: 5
                                }}>{device.nickname} ({device.deviceInfo.modelName})
                              </RemoteText>
                            }
                        </TextLeftView>
                      </RemoteContainer>
                      <RemoteContainer>
                        <TextLeftView>
                          {
                            device.deviceInfo &&
                            <RemoteText
                              style={{
                                color: 'black', marginBottom: 5

                              }}>S/N: {device.serialNumber}
                            </RemoteText>
                          }
                        </TextLeftView>
                      </RemoteContainer>
                      <GrayLine/>
                    </View>)
                }
              )
              }
            </ScrollContainer>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default UserProfileView;