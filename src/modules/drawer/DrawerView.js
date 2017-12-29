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
  flex: 0 0 200px;
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
`;
class DrawerView extends Component<Props, State> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderDriver() {
    const {me} = this.props;

    if (!me) return null;

    return (
      <DriverContainer>
        <Text>
          {me.name}
        </Text>
        {me.nameEn && (
          <Text>
            {me.nameEn}
          </Text>
        )}
        <Text>
          {me.phone}
        </Text>
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
