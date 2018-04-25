// @flow

import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/claroTheme';
import toast from '../../../utils/toast';
import easi6Logo from '../../../assets/images/easi-6.png';

type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,a
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};
const UsernameInput = styled.TextInput`
  width: 70%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

const PasswordInput = styled.TextInput`
  width: 70%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 15px;
  padding-bottom: 35px;
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
  }

  componentDidMount() {
    this.props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: false,
    });
    this.refs.phone.focus();
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
      this.props.onLoginPressed(this.state.username, this.state.password);
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
          <Container
            keyboardVerticalOffset={0}
            behavior='height'>
            <CoverView>
              <Image
                style={{width: 60, height: 18}}
                alt="logo image"
                source={easi6Logo}
              />
              <CoverText>
                &nbsp;&nbsp;
                {t('cover_text')}
              </CoverText>
            </CoverView>
            <UsernameInput
              placeholder={t('login_username')}
              onChangeText={this.onChangeUsername}
              value={this.state.username}
            />
              <View />
            <GrayLine/>
            <PasswordInput
              underlineColorAndroid="transparent"
              placeholder={t('login_password')}
              autoCorrect={false}
              onChangeText={this.onChangePassword}
              value={this.state.password}
              autoCapitalize='none'
              onSubmitEditing={this.onLoginPressed}
              blurOnSubmit
              secureTextEntry
            />
            <View
              style={{flexGrow: 3}}
            />
            <View
              style={{alignSelf: 'stretch'}}
            >
              <Button
                title={t('login_submit')}
                onPress={this.onLoginPressed}
                color={ClaroTheme.mainColor}
                disabled={loading}
              />
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default LoginView;
