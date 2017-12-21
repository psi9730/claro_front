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

type Props = {
  t: Function,
  user: {},
  goToRentals: () => void,
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const DriverContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

class LoginView extends Component<Props, State> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderDriver() {
    const {t, user} = this.props;

    return (
      <DriverContainer>
        <Text>

        </Text>
      </DriverContainer>
    );
  }

  render() {
    const {t, user} = this.props;

    return (
      <Container>
        <Button
          title={t('menu_rentals')}
          onPress={this.props.goToRentals}
        />
        <Button
          title={t('menu_logout')}
          onPress={this.props.logout}
        />
      </Container>
    );
  }
}

export default LoginView;
