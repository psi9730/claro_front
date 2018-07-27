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
type Props = {
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 30px;
  padding-bottom: 35px;
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