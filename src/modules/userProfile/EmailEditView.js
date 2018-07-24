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
import {PASSWORD_EDIT_SCREEN,USER_PROFILE_SCREEN} from '../../../screens';
import * as EmailValidator from 'email-validator';
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
  margin-bottom: 4px;
  font-size: 20px;
  border-top-width: 1px;
  border-top-color: gray;
  border-left-color: gray;
  border-right-color: gray;
  border-bottom-width: 2px;
  border-bottom-color: blue;
  borderLeftWidth: 1px;
  borderRightWidth: 2px;
  margin-top: 8px;
  border-bottom-color: black;
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

class HomeNumberEditView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      email: this.props.email,
      error: false,
    };
  }
  props: Props;
  componentWillMount() {
  }
  updateProfile() {
    if(EmailValidator.validate(this.state.email)) {
      this.props.updateUserProfileRequest(this.props.phoneNumber, this.props.homeNumber, this.props.jibunAddr, this.props.roadAddr, this.props.detailLocation, this.props.postcode, this.state.email).then(() =>
        this.props.navigator.resetTo({...USER_PROFILE_SCREEN})).catch((e) => this.setState({errorMessage: e.message}));
    } else{
      this.setState({errorMessage: this.props.t('check_email_form')})
    }
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={HomeNumberEditView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >
              이메일 수정
            </TitleText>
            <IntroduceText style={{color: 'gray'}}>
              email
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(email)=>this.setState({email: email})}
              value={this.state.email}
              autoCapitalize='none'
              style={{fontSize: 18}}
              blurOnSubmit={true}
            />
            <ErrorText>
              {this.state.errorMessage}
            </ErrorText>
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

export default  HomeNumberEditView;