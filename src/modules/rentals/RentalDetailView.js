// @flow

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash';
import moment from 'moment';

type Props = {
  t: Function,
  rental: mixed,
  loading: boolean,
};

const Container = styled.View`
  background-color: white;
`;

const m = (dateTime) => moment(dateTime).format('MM-DD HH:mm');

const preferredLocale = (item, fieldName) => item[`${fieldName}${_.upperFirst('ko')}`] || item[fieldName];

class RentalDetailView extends Component<Props> {
  render() {
    const {t, loading, rental} = this.props;

    if (!rental) return null;

    const locations = _.map(rental.locationInfos || [], (loc, i) => ({
      ...loc,
      key: i,
    }));

    return (
      <Container>
        <Text>
          {m(rental.startDate)}
        </Text>
        {locations.map((loc) => (
          <View key={loc.key}>
            <Text>
              {preferredLocale(loc, 'name')}
            </Text>
            <Text>
              {preferredLocale(loc, 'address')}
            </Text>
          </View>
        ))}
      </Container>
    )
  }
}

export default RentalDetailView;
