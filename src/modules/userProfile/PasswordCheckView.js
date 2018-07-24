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
import {PASSWORD_EDIT_SCREEN} from '../../../screens';
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
};

type State = {
  secure: boolean,
};
const WifiSetUpInput= styled.TextInput`
  width: 70%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

const WifiSetUpText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

const UsernameInput = styled.TextInput`
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
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
const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
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
  padding-bottom: 4px;
  border-bottom-color: black;
`;
const TextsBoxContainer = styled.View`
 width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  borderTopWidth: 1px;
  borderTopColor: gray;
  borderLeftColor: gray;
  borderRightColor: gray;
  borderBottomWidth: 2px;
  borderBottomColor: blue;
  borderLeftWidth: 1px;
  borderRightWidth: 1px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`
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
const ErrorText = styled.Text`
  color: red;
  align-self: flex-start;
`

class PasswordCheckView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      password: "",
      error: false,
    };
  }
  props: Props;
  componentWillMount() {
  }
  checkPassword(){
    this.props.checkPasswordRequest(this.state.password).then(()=>
      this.props.navigator.push({...PASSWORD_EDIT_SCREEN, passProps:{password : this.state.password}})).catch((e)=>this.setState({errorMessage: e.message}));
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={PasswordCheckView.dismissKeyboard}
        >
          <Container>
            <View><TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >
              비밀번호 수정
            </TitleText>
              <TitleText style={{marginTop: 4, fontSize: 15, color: 'black'}}> 고객님의 정보수정을 위해</TitleText>   <TitleText style={{marginTop: 4, fontSize: 15, color: 'black'}}> 다시 한번 비밀번호를 입력해 주시기 바랍니다.</TitleText></View>
            <IntroduceText style={{color: 'gray'}}>
              비밀번호 재입력
            </IntroduceText>
            <TextsBoxInput
              secureTextEntry
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(password)=>this.setState({password: password})}
              value={this.state.password}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 18}}
              blurOnSubmit={true}
            />
            <ErrorText>
              {this.state.errorMessage}
            </ErrorText>
            <BottomButtonView>
              {this.state.error &&<ErrorText> 비밀번호가 다릅니다 다시한번 비밀번호를 입력해주세요 </ErrorText>}
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

export default  PasswordCheckView;