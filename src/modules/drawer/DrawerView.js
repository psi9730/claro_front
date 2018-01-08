// @flow

import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import easi6Theme from '../../utils/easi6Theme';

type Props = {
  t: (key: string, ...?string) => string,
  me: ?{
    name: string,
    nameEn: ?string,
    phone: string,
  },
  goToRentals: () => void,
};

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.mainBgColor};
`;
const DriverContainer = styled.View`
  flex: 0 0 270px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`;
const Menus = styled.View`
  flex: 1;
  display: flex;
  flex-flow: column;
  border-top-color: ${props => props.theme.borderColor};
  border-top-width: 1px;
`;
const MenuButton = styled.TouchableOpacity`
  flex: 0 0 60px;
  background-color: ${props => props.theme.mainBgColor};
  justify-content: center;
  align-items: center;
  border-bottom-color: ${props => props.theme.borderColor};
  border-bottom-width: 1px;
`;
const MenuText = styled.Text`
  color: ${props => props.theme.mainColor};
  font-size: 20px;
`;

const DriverText = styled.Text`
  margin-top: 5px;
  font-size: 18px;
`;

const ProfileButton = styled.TouchableOpacity`
  flex: 0 0 60px;
  background-color: ${props => props.theme.mainBgColor};
  justify-content: center;
  align-items: center;
`;
const ProfileText = styled.Text`
  color: ${props => props.theme.mainColor};
  font-size: 14px;
`;

class DrawerView extends Component<Props, State> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderDriver() {
    const {me, t} = this.props;

    if (!me) return null;

    return (
      <DriverContainer>
        <DriverText>
          {me.name}
        </DriverText>
        {me.nameEn && (
          <DriverText>
            {me.nameEn}
          </DriverText>
        )}
        <DriverText>
          {me.phone}
        </DriverText>
        <ProfileButton
          onPress={this.props.goToProfile}
        >
          <ProfileText>
            {t('title_profile')}
          </ProfileText>
        </ProfileButton>
      </DriverContainer>
    );
  }

  render() {
    const {t} = this.props;

    return (
      <ThemeProvider theme={easi6Theme}>
        <Container>
          {this.renderDriver()}
          <Menus>
            <MenuButton
              onPress={this.props.goToRentals}
            >
              <MenuText>
                {t('menu_rentals')}
              </MenuText>
            </MenuButton>
            <MenuButton
              onPress={this.props.logout}
            >
              <MenuText>
                {t('menu_logout')}
              </MenuText>
            </MenuButton>
          </Menus>

        </Container>
      </ThemeProvider>
    );
  }
}

export default DrawerView;
