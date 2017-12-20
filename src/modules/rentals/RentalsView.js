// @flow

import React, {Component} from 'react';
import {FlatList, Text, View,} from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash';
import moment from 'moment';

type Props = {
  t: Function,
  rentals: Array<Object>,
  loading: boolean,
  rentalsStateActions: {
    rentalsRequest: () => mixed,
  },
};

const Container = styled.View`
  background-color: white;
`;

const RentalItemContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const m = (dateTime) => moment(dateTime).format('MM-DD HH:mm');

const preferredLocale = (item, fieldName) => item[`${fieldName}${_.upperFirst('ko')}`] || item[fieldName];

class RentalsView extends Component<Props> {
  static renderRental({item: rental}) {
    const locations = _.map(rental.locationInfos || [], (loc, i) => ({
      ...loc,
      key: i,
    }));
    return (
      <RentalItemContainer>
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
      </RentalItemContainer>
    )
  }

  render() {
    const {t, loading, rentals} = this.props;
    const renderRentals = _.map(rentals, (rental) => ({
      key: rental.hash,
      ...rental,
    }));

    return (
      <Container>
        <FlatList
          data={renderRentals}
          renderItem={RentalsView.renderRental}
        />
      </Container>
    );
  }
}

export default RentalsView;
