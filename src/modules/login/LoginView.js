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
  username: string,
  password: string,
};

type Props = {
  t: Function,
  user: {},
  loading: boolean,
  loginStateActions: {
    loginRequest: (username: string, password: string) => mixed,
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
    username: '+821020407667',
    password: 'rlawlsdjr',
  };
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onChangeUsername(username) {
    this.setState({username});
  }

  onChangePassword(password) {
    this.setState({password});
  }

  requestLogin() {
    this.props.loginStateActions.loginRequest(this.state.username, this.state.password);
  }

  render() {
    const {t, loading, user} = this.props;

    return (
      <Container>
        <Text>
          easi6 for drivers

        </Text>
        <EasiInput
          placeholder={t('login_phone')}
          onChangeText={this.onChangeUsername}
          value={this.state.username}
        />
        <EasiInput
          placeholder={t('login_password')}
          // secureTextEntry={true}
          autoCorrect={false}
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <EasiButton
          title={t('login_submit')}
          onPress={this.requestLogin}
          disabled={loading}
        />
      </Container>
    );
  }
}

export default LoginView;
