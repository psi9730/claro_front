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
  rentals: Array<Object>,
  loading: boolean,
  rentalsStateActions: {
    rentalsRequest: () => mixed,
  },
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

class RentalsView extends Component<Props> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    console.log('ff');
    this.props.rentalsStateActions.rentalsRequest();
  }

  render() {
    const {t, loading, user} = this.props;

    return (
      <Container>

      </Container>
    );
  }
}

export default RentalsView;
