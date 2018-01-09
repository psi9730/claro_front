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
  Keyboard,
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {ThemeProvider} from 'styled-components';

import easi6Theme from '../../../utils/easi6Theme';
import toast from '../../../utils/toast';
import mainLogo from '../../../assets/images/easi-6.svg';

type State = {
  username: string,
  password: string,
  cca: string,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};

const PhoneInnerInput = styled.TextInput`
  width: 70%;
  font-size: 20px;
`;

const PasswordInput = styled.TextInput`
  width: 70%;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
`;

const Container = styled.View`
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
    cca2: 'kr',
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

  onSelectCountry(iso2) {
    this.setState({iso2});
  }

  onChangePassword(password) {
    this.setState({password});
  }

  onLoginPressed() {
    if(!this.state.username){
      toast(this.props.t('enter_your_phone'),'error');
    } else if(!this.state.password){
      toast(this.props.t('enter_your_password'),'error');
    } else {
      Keyboard.dismiss();
      this.props.onLoginPressed(this.state.username, this.state.password);
    }
  }

  onPressFlag(){
    this.refs.countryPicker.openModal();
  }

  selectCountry(country){
    this.refs.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({cca2: country.cca2})
  }

  render() {
    const {t, loading} = this.props;

    return (
      <ThemeProvider theme={easi6Theme}>
        <Container>
          <CoverView>
            <Image
              style={{width: 60, height: 18}}
              alt="logo image"
              source={require('../../../assets/images/easi-6.png')}
            />
            <CoverText>
              &nbsp;&nbsp;
              {t('cover_text')}
            </CoverText>
          </CoverView>
          <PhoneInput
            ref='phone'
            textProps={{placeholder: t('login_phone')}}
            onChangePhoneNumber={this.onChangeUsername}
            onSelectCountry={this.onSelectCountry}
            initialCountry='kr'
            onPressFlag={this.onPressFlag}
            style={{
              width: '70%',
            }}
            textStyle={{
              width: '100%',
              fontSize: 20,
              height: 40,
              alignSelf: 'baseline',
            }}
          />
          <CountryPicker
            ref='countryPicker'
            onChange={this.selectCountry}
            translation='eng'
            cca2={this.state.cca2}
            filterable
          >
            <View />
          </CountryPicker>
          <GrayLine/>
          <PasswordInput
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
              color={easi6Theme.mainColor}
              disabled={loading}
            />
          </View>
        </Container>
      </ThemeProvider>
    );
  }
}

export default LoginView;
