import React, { Component } from 'react';

import {Button, Image, Keyboard, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import {USER_PROFILE_SCREEN} from '../../../screens';
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
  margin-top: 8px;
  border-bottom-width: 1px;
  padding-bottom: 4px;
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

class PhoneNumberEditView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      phoneNumber: this.props.phoneNumber,
    };
  }
  props: Props;
  componentWillMount() {
  }
  updateProfile(){
    this.props.updateUserProfileRequest(this.state.phoneNumber,this.props.homeNumber, this.props.jibunAddr, this.props.roadAddr, this.props.detailLocation, this.props.postcode, this.props.email).then(()=>
      this.props.navigator.resetTo({...USER_PROFILE_SCREEN})).catch();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={PhoneNumberEditView.dismissKeyboard}
        >
          <Container>
            <TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >
              휴대폰번호 수정
            </TitleText>
            <IntroduceText style={{color: 'gray'}}>
              휴대폰번호
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(phoneNumber)=>this.setState({phoneNumber: phoneNumber})}
              value={this.state.phoneNumber}
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

export default  PhoneNumberEditView;