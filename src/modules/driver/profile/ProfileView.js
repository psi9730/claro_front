// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {ThemeProvider} from 'styled-components';
import easi6Theme from '../../../utils/easi6Theme';


type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  user: {},
  loading: boolean,
  onEditPressed: (name: string, name_en: string, username: string) => void,
};

const EasiInput = styled.TextInput`
  width: 80%;
  height: 40px;
`;

const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: white;
`;

const EditProfileButton = styled.TouchableOpacity`
  flex: 0 0 40px;
  background-color: ${props => props.theme.mainColor};
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const EditProfileText = styled.Text`
  color: ${props => props.theme.mainBgColor};
  font-size: 14px;
`;

const ProfileText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

const ProfileInput = styled.TextInput`
  width: 70%;
  margin-bottom: 20px;
  font-size: 18px;
`;

const GrayLine = styled.View`
  height: 1px;
  width: 70%;
  background-color: gray;
`;

class ProfileView extends Component<Props, State> {
  constructor(props) {
    super(props);
    const {user} = props;
    this.state = {
      name: user.name,
      name_en: user.nameEn,
      phone: user.phone,
      cca2: 'kr',
    };

    autoBind(this);
  }

  onChangeName(name) {
    this.setState({name});
  }

  onChangeNameEn(name_en) {
    this.setState({name_en});
  }

  onChangePhone(phone) {
    this.setState({phone});
  }

  onSelectCountry(iso2) {
    this.setState({iso2});
  }

  onPressFlag(){
    this.refs.countryPicker.openModal();
  }

  onSelectCountry(iso2) {
    this.setState({iso2});
  }

  selectCountry(country){
    this.refs.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({cca2: country.cca2})
  }

  onEditPressed() {
    this.props.onEditPressed(this.state.name, this.state.name_en, this.state.phone);
  }

  render() {
    const {t, loading} = this.props;

    return (
      <ThemeProvider theme={easi6Theme}>
        <Container>
          <ProfileText>
            {t('profile_name')}
          </ProfileText>
          <ProfileInput
            placeholder={t('profile_name')}
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={this.onChangeName}
            value={this.state.name}
          />
          <ProfileText>
            {t('profile_name_en')}
          </ProfileText>
          <ProfileInput
            placeholder={t('profile_name_en')}
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={this.onChangeNameEn}
            value={this.state.name_en}
          />
          <ProfileText>
            {t('profile_phone')}
          </ProfileText>
          <PhoneInput
            ref='phone'
            value={this.state.phone}
            textProps={{placeholder: t('proflie_phone')}}
            onChangePhoneNumber={this.onChangePhone}
            onSelectCountry={this.onSelectCountry}
            initialCountry='kr'
            onPressFlag={this.onPressFlag}
            style={{
              marginTop: 15,
              width: '70%',
            }}
            textStyle={{
              fontSize: 20,
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
          <View
            style={{
              flexGrow: 1,
            }}
          />
          <EditProfileButton
            style={loading ? {backgroundColor: 'gray',} : null}
            onPress={this.onEditPressed}
            disabled={loading}
          >
            <EditProfileText>
              {t('done')}
            </EditProfileText>
          </EditProfileButton>
        </Container>
      </ThemeProvider>
    );
  }
}

export default ProfileView;
