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
import PhoneInput from 'react-native-phone-input';

type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  user: {},
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};

const EasiInput = styled.TextInput`
  width: 80%;
  height: 40px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const EasiButton = styled.Button`
  background: aquamarine;
`;

class ProfileView extends Component<Props, State> {
  state = {
    username: '',
    number: '',
    iso2: '',
    password: '',
  };
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onChangeUsername(number) {
    console.log(this.state.number);
    this.setState({number});
  }

  onSelectCountry(iso2) {
    console.log(this.state.iso2);
    this.setState({iso2});
  }

  onChangePassword(password) {
    this.setState({password});
  }

  render() {
    const {t, loading} = this.props;

    return (
      <Container>
        <Text>
          easi6 for drivers
        </Text>
        <PhoneInput
          textProps={{placeholder: t('login_phone')}}
          onChangePhoneNumber={this.onChangeUsername}
          onSelectCountry={this.onSelectCountry}
        />
        <View style={{height: '14px'}} />
        <EasiInput
          placeholder={t('login_password')}
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <EasiButton
          title={t('login_submit')}
          onPress={this.onLoginPressed}
          disabled={loading}
        />
      </Container>
    );
  }
}

export default ProfileView;
