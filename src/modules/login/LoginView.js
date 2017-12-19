// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';

type State = {
  login: string,
  password: string,
};

type Props = {
  t: Function,
  user: {},
  loading: boolean,
  loginStateActions: {
    loginRequest: (login: string, password: string) => mixed,
  },
};

const EasiInput = styled.TextInput`
  width: 80%;
  height: 40px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const EasiButton = styled.Button`
  background: aquamarine;
`;

class LoginView extends Component<Props, State> {
  state = {
    login: '',
    password: '',
  };
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onChangeLogin(login) {
    this.setState({login});
  }

  onChangePassword(password) {
    this.setState({password});
  }

  requestLogin() {
    this.props.loginStateActions.loginRequest(this.state.login, this.state.password);
  }

  render() {
    const {t, loading, user} = this.props;

    return (
      <Container>
        <EasiInput
          placeholder={t('login_phone')}
          onChangeText={this.onChangeLogin}
          value={this.state.login}
        />
        <EasiInput
          placeholder={t('login_password')}
          onChangeText={this.onChangePassword}
        />
        <EasiButton
          title={t('login_submit')}
          onPress={this.requestLogin}
        />
      </Container>
    );
  }
}

export default LoginView;
