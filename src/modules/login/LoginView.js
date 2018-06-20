// @flow

import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import toast from '../../utils/toast';
import easi6Logo from '../../assets/images/easi_6.png';
import { CheckBox } from 'react-native-elements'
import naver from '../../assets/images/naver.png'
import facebook from '../../assets/images/facebook.png'
import {RENTAL_DETAIL_SCREEN} from '../../../screens';

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
  margin-bottom: 10px;
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
  margin-bottom: 10px;
  margin-top:10px;
  
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
const PasswordInput = styled.TextInput`
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
const ImageContainer = styled.View`
    position: absolute;
`;
const TextLeftContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;

const CoverText = styled.Text`
  font-size: 24px;
  color: black;
`;

const CoverView = styled.View`
  flex-grow: 2;
  flex-direction: row;
  align-items: center;
`;

const GrayLine = styled.View`
  height: 1px;
  width: 70%;
  background-color: gray;
`;

class LoginView extends Component<Props, State> {
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
    this.props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: false,
    });
  }

  onChangeUsername(username) {
    this.setState({username});
  }


  onChangePassword(password) {
    this.setState({password});
  }

  onLoginPressed() {
    if(!this.state.username){
      toast(this.props.t('enter_your_id'),'error');
    } else if(!this.state.password){
      toast(this.props.t('enter_your_password'),'error');
    } else {
      Keyboard.dismiss();
      this.props.onLoginPressed(this.state.username, this.state.password).catch((e)=>console.log(e));
    }
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const {t, loading} = this.props;

    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={LoginView.dismissKeyboard}
        >
          <Container>
            <LoginText style={{fontSize: 25, marginBottom: 18, backgroundColor:'white', color: 'black', fontWeight:'bold'}}>
              로그인
            </LoginText>
            <LoginText style={{margin:10 }}>
              아이디
            </LoginText>
            <UsernameInput
              autoCapitalize='none'
              onChangeText={this.onChangeUsername}
              value={this.state.username}
            />
            <LoginText style={{margin:10,backgroundColor:'white',}}>
              비밀번호
            </LoginText>
            <PasswordInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangePassword}
              value={this.state.password}
              autoCapitalize='none'
              onSubmitEditing={this.onLoginPressed}
              blurOnSubmit
              secureTextEntry
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
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 }}
              onPress={()=> this.props.onLoginPressed()}
            >
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  로그인
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              style={{backgroundColor: '#3A589B'}}
              onPress={()=> this.props.navigator.push({
                ...FACEBOOK_LOGIN_SCREEN,
              })}
            >
              <ImageContainer>
                <Image source={facebook} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </ImageContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center'}}>
                  페이스북으로 로그인
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              onPress={()=> this.props.navigator.push({
                ...NAVER_LOGIN_SCREEN,
              })}
            >
              <ImageContainer>
              <Image source={naver} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </ImageContainer>
              <TextLeftContainer>
              <ButtonText style={{alignSelf: 'center'}}>
                네이버로 로그인
              </ButtonText>
              </TextLeftContainer>
            </NavButton>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default LoginView;
