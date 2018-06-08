/* @flow */

import React, { Component } from 'react';
import {Modal,
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback, Linking, WebView, TouchableHighlight
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import {REMOTE_DETAIL_SCREEN} from '../../../screens';
import naver from '../../assets/images/naver.png'
import facebook from '../../assets/images/facebook.png'
type Props = {
};

type State = {
};
const UsernameInput = styled.TextInput`
  width: 100%;
  margin-bottom: 20px;
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
  margin-bottom: 18px;
  margin-top:18px;
  
`;
const IntroduceText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 3px;
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
const PasswordInput = styled.TextInput`
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

const TextContainer = styled.View`
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
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 30px;
  padding-bottom: 5px;
  
`;

const ButtonView = styled.View`
    flex-grow:1;
    flex-shrink:0;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class SignupView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
    }
  }
  props: Props;

  static dismissKeyboard() {
    Keyboard.dismiss();
  }


  render() {

    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={SignupView.dismissKeyboard}
        >
          <Container>
            <LoginText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              회원 가입
            </LoginText>
            <IntroduceText>
              공기청정살균이 CLARO의 IoT
            </IntroduceText>
            <IntroduceText style={{marginBottom: 20}}>
              기능을 활용하기 위한 APP입니다.
            </IntroduceText>
            <IntroduceText>
              본 APP을 사용하시기 위해서는
            </IntroduceText>
            <IntroduceText>
              CLARO의 회원 가입과 제품등록 절차가
            </IntroduceText>
            <IntroduceText style={{marginBottom: 40}}>
              필요합니다.
            </IntroduceText>
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 }}
              onPress={()=> this.props.navigator.push({
                ...SIGNUP_SCREEN,
              })}
            >
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  회원가입
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              style={{backgroundColor: '#3A589B'}}
              onPress={()=> this.props.navigator.push({
                ...FACEBOOK_SIGNUP_SCREEN,
              })}
            >
              <TextContainer>
                <Image source={facebook} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </TextContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center'}}>
                  페이스북으로 회원 가입
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              onPress={()=> this.props.navigator.push({
                ...NAVER_SIGNUP_SCREEN,
              })}
            >
              <TextContainer>
                <Image source={naver} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </TextContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center'}}>
                  네이버로 회원 가입
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <View style={{  flexGrow:1,
                    flexShrink:1,
                    flexBasis: 'auto',display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
            <LoginText style={  {textDecorationLine:'underline',   flexGrow:0, color:'black',alignSelf: 'center',
              flexShrink:0,
              flexBasis: 'auto'}}>
              로그인
            </LoginText>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  };
}

export default SignupView;