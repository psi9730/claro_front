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

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 30px;
  padding-bottom: 35px;
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


class SignupChoiceView extends Component<Props, State> {
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
          onPress={SignupChoiceView.dismissKeyboard}
        >
          <Container >
            <ButtonView>
            </ButtonView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  };
}

export default SignupChoiceView;