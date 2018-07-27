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
const ErrorText = styled.Text`
  color: red;
  align-self: flex-start;
`;

class PasswordEditView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      password: "",
      passwordCheck:"",
      error: false,
      errorMessage:null,
    };
  }
  props: Props;
  componentWillMount() {
  }
  checkPassword(){
    if(this.state.passwordCheck !== this.state.password){
      this.setState({errorMessage: this.props.t('password_different')});
    }
    else{
      this.setState({errorMessage: null});
      this.props.updatePasswordRequest(this.props.password, this.state.password).then(()=>
      this.props.navigator.resetTo({...USER_PROFILE_SCREEN})).catch((e)=>console.log(e));
    }
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={PasswordEditView.dismissKeyboard}
        >
          <Container>
            <View><TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >
              비밀번호 수정
            </TitleText>
              <TitleText style={{marginTop: 4, fontSize: 15, color: 'black'}}> 고객님의 정보수정을 위해</TitleText>   <TitleText style={{marginTop: 4, fontSize: 15, color: 'black'}}> 다시 한번 비밀번호를 입력해 주시기 바랍니다.</TitleText></View>
            <IntroduceText style={{color: 'gray'}}>
              신규 비밀번호
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(password)=>this.setState({password: password})}
              value={this.state.password}
              secureTextEntry
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 18}}
              blurOnSubmit={true}
            />
            <IntroduceText style={{color: 'gray'}}>
              신규 비밀번호 확인
            </IntroduceText>
            <TextsBoxInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(password)=>this.setState({passwordCheck: password})}
              value={this.state.passwordCheck}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 18}}
              blurOnSubmit={true}
            />
            <ErrorText>
              {this.state.errorMessage}
            </ErrorText>
            <BottomButtonView>
              <NavButton
                style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
                onPress={()=> this.checkPassword()}
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

export default  PasswordEditView;