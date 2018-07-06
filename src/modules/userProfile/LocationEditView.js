import { connect } from 'react-redux';
import React, { Component } from 'react';

import {Button, Image, Keyboard, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import toast from '../../utils/toast';
import easi6Logo from '../../assets/images/easi_6.png';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {SERIAL_NUMBER_SCREEN, SERIAL_NUMBER_SOLUTION_SCREEN} from '../../../screens';
import {PASSWORD_EDIT_SCREEN,USER_PROFILE_SCREEN, LOCATION_SEARCH_SCREEN} from '../../../screens';
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
  name: string,
  login: string,
  password: string,
  phoneNumber: string,
  homeNumber: string,
  email: string,
  location: string,
  postcode: string,
  detailLocation: string,
  devices: any,
  updatePasswordRequest: Function,
};

type State = {
  secure: boolean,
};
const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 8px;
  border-bottom-width:1px;
  border-bottom-color: gray;
`;

const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;
  
`;
const IntroduceText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: black;
  margin-bottom: 5px;
  margin-top:3px;
  
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
const ErrorText = styled.Text`
  font-size: 15px;
  color: red;
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


const GrayLine = styled.View`
  height: 1px;
  width: 70%;
  background-color: gray;
`;
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 20px;
  padding-bottom: 5px;
  
`;

const BottomButtonView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-end;
    align-items: center;
`;

const ButtonLeftContainer = styled.View`
    flex-grow:3;
    flex-shrink:3;
    flex-basis: 0;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-self: stretch;
`;
const TextRightContainer = styled.View`
    flex-grow:7;
    flex-shrink:7;
    flex-basis: 0;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;
const TextAndButtonView = styled.View`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: auto;
  width: 100%;
  margin-bottom: 5px;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const PostButton = styled.TouchableOpacity`
  flex-grow:1;
  flex-shrink:1;
  flex-basis: auto;
  margin: 5px
  background-color: #00CC39;
  display:flex;
  justify-content: center;
`;
const TextsInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

class LocationEditView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      postcode: this.props.postcode,
      location: this.props.location,
      detailLocation: this.props.detailLocation,
      error: false,
    };
  }
  props: Props;
  getPostcode(){
    this.props.navigator.push({...LOCATION_SEARCH_SCREEN})
  }
  componentWillMount() {
  }
  updateProfile(){
    this.props.updateUserProfileRequest(this.props.phoneNumber,this.props.homeNumber, this.state.location, this.state.detailLocation, this.state.postcode, this.props.email).then(()=>
      this.props.navigator.push({...USER_PROFILE_SCREEN})).catch();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={LocationEditView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >
              주소 수정
            </TitleText>
            <IntroduceText style={{color: 'gray'}}>
              주소
            </IntroduceText>
            <TextAndButtonView >
              <TextRightContainer>
                <TextsInput
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  editable={false}
                  value={this.state.postcode}
                  autoCapitalize='none'
                  style={{marginBottom: 5, flex:1}}
                  blurOnSubmit={false}
                />
              </TextRightContainer>
              <ButtonLeftContainer>
                <PostButton
                  style={{backgroundColor: 'gray'}}
                  onPress={()=> this.getPostcode()}
                >
                  <IntroduceText style={{alignSelf: 'center', color:'white'}}>
                    우편번호
                  </IntroduceText>
                </PostButton>
              </ButtonLeftContainer>
            </TextAndButtonView>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              editable={false}
              value={this.state.location}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 18}}
              blurOnSubmit={true}
            />
            <IntroduceText style={{color: 'gray'}}>
              상세주소
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(detailLocation)=>this.setState({detailLocation: detailLocation})}
              value={this.state.detailLocation}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 18}}
              blurOnSubmit={true}
            />
            <BottomButtonView>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.updateProfile()}
              >
                <TextCenterContainer>
                  <ButtonText style={{alignSelf: 'center', color:'black'}}>
                    수정
                  </ButtonText>
                </TextCenterContainer>
              </NavButton>
            </BottomButtonView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  LocationEditView;