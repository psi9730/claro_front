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

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 15px;
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

class naverSignupView extends Component<Props, State> {
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
          onPress={naverSignupView.dismissKeyboard}
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

export default naverSignupView;