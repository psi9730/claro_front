// @flow
import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import toast from '../../utils/toast';
import easi6Logo from '../../assets/images/easi_6.png';
import { CheckBox } from 'react-native-elements'
import naver from '../../assets/images/naver.png'
import facebook from '../../assets/images/facebook.png'
import {CLARO_SIGNUP_SCREEN} from '../../../screens';
import DaumPostcode from 'react-daum-postcode';
import * as EmailValidator from 'email-validator/index';

type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};
const UsernameInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const LoginText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 5px;
  margin-top:5px;
  
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: auto;
  height: 40px;
  width: 100%;
  margin-bottom: 5px;
  background-color: #00CC39;
  display:flex;
  flex-direction: row;
  justify-content: center;
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
const PasswordInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
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

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  background-color: white;
  padding: 30px;
  padding-bottom: 35px;
  
`;
const TextCenterContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
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


class NaverSignupView extends Component<Props, State> {
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

  componentDidMount() {
i
  }

  onChangeUsername(username) {
    this.setState({username});
  }

  onChangePassword(password) {
    this.setState({password});
  }
  onChangePasswordCheck(passwordCheck){
    this.setState({passwordCheck});
  }
  onChangeName(name){
    this.setState({name});
  }
  onChangeEmail(email){
    this.setState({email});
  }
  onChangePhoneNumber(phoneNumber){
    this.setState({phoneNumber});
  }

  onCheckedId(e){
    this.props.checkIdRequest(e.target.value);
  }

  onSignupPressed() {
    if(!this.state.username){
      toast(this.props.t('enter_your_id'),'error');
    } else if(!this.state.password){
      toast(this.props.t('enter_your_password'),'error');
    } else if(this.state.username.length<8){
      toast('id should be longer than 7')
    } else if (this.state.email.length<3 || !EmailValidator.validate(this.state.email)){
      toast('you must enter email form');
    } else if (this.state.name.length<5){
      toast('name is too short');
    } else {
      Keyboard.dismiss();
      this.props.naverSignupRequest(this.state.username, this.state.name, this.state.email,this.state.phoneNumber).catch((e)=>console.log(e));
    }
  }
  onSignupPressed() {
    console.log(EmailValidator.validate(this.state.email),"validate");
    if(!this.state.username){
      toast(this.props.t('enter_your_id'),'error');
    } else if(!this.state.password){
      toast(this.props.t('enter_your_password'),'error');
    } else if(this.state.passwordCheck!==this.state.password){
      toast('password and passwordCheck is different','error');
    } else if(this.state.username.length<8){
      toast('username should be longer than 7')
    } else if(this.state.password.length<8) {
      toast('password should be longer than 7');
    } else if (this.state.email.length<3 || !EmailValidator.validate(this.state.email)){
      toast('you must enter email form');
    } else if (this.state.username.length<5){
      toast('username is too short');
    } else if (this.state.phoneNumber.length<10){
      toast('you must enter phoneNumber form ');
    } else if (this.state.postcode.length<1){
      toast('you must enter postcode form');
    } else {
      Keyboard.dismiss();
      this.props.claroSignupRequest(this.state.username, this.state.password,this.state.name, this.state.email,this.state.phoneNumber,this.state.postcode, this.state.roadAddr,
        this.state.jibunAddr,this.state.detailLocation).catch((e)=>console.log(e));
    }
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const {t, loading} = this.props;

    return (
        <Container >
          <LoginText style={{fontSize: 20, marginBottom: 15, color: 'black', fontWeight:'bold'}}>
            정보입력
          </LoginText>
          <LoginText style={{margin:5 }}>
            아이디
          </LoginText>
          <UsernameInput style={{backgroundColor:'white'}}
                         onChangeText={this.onChangeUsername}
                         value={this.state.username}
                         autoCapitalize='none'
          />
          <LoginText style={{margin:5}}>
            이름
          </LoginText>
          <TextsInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={this.onChangeName}
            value={this.state.name}
            autoCapitalize='none'
            style={{marginBottom: 5}}
          />
          <LoginText style={{margin:5}}>
            이메일
          </LoginText>
          <TextsInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={this.onChangeEmail}
            value={this.state.email}
            autoCapitalize='none'
            style={{marginBottom: 5}}
          />
          <CheckBox
            title='정보/이벤트 메일 수신에 동의합니다.'
            containerStyle={{backgroundColor: 'white', width: '100%',borderColor:'white' }}
            checked={this.state.checked}
            uncheckedColor='black'
            checkedColor='black'
            onPress={() => this.setState({checked: !this.state.checked})}
          />
          <LoginText style={{margin:5}}>
            휴대번호
          </LoginText>
          <TextsInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={this.onChangePhoneNumber}
            value={this.state.phoneNumber}
            autoCapitalize='none'
            style={{marginBottom: 5}}
          />
        </Container>
    );
  }
}

export default NaverSignupView;
