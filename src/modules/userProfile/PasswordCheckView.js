import React, { Component } from 'react';

import {Button, Image, Keyboard, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
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
const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  border-bottom-width: 1px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: black;
`;
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 10px;
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
  flex-basis: 46px;
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
            <View><TitleText style={{color:'black',fontSize: 24, marginBottom:40, fontWeight:'bold'}} >
              비밀번호 수정
            </TitleText>
              <TitleText style={{marginTop: 4, fontSize: 15, color: 'black'}}> 고객님의 정보수정을 위해</TitleText>   <TitleText style={{marginTop: 4, fontSize: 15, color: 'black'}}> 다시 한번 비밀번호를 입력해 주시기 바랍니다.</TitleText></View>
            <IntroduceText style={{opacity: 0.4, marginTop: 40}}>
              비밀번호 재입력
            </IntroduceText>
            <TextsBoxInput
              secureTextEntry
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(password)=>this.setState({password: password})}
              value={this.state.password}
              autoCapitalize='none'
              style={{marginBottom: 25, fontSize: 18, paddingBottom:12,paddingRight: 4}}
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
