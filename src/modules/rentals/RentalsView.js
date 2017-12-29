// @flow

import React, {Component} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import autoBind from 'react-autobind';

import {preferredLocale} from '../../utils/i18n';
import easi6Theme from '../../utils/easi6Theme';

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
  display: flex;
  flex-flow: column;
`;

const RentalItemContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => props.theme.mainBgColor};
  border-bottom-color: ${props => props.theme.borderColor};
  border-bottom-width: 0.5px;
  padding: 10px;
`;

const DateText = styled.Text`
  font-size: 26px;
  color: black;
  margin-bottom: 4px;
  margin-right: 4px;
`;
const LocationText = styled.Text`
  font-size: 22px;
  color: black;
`;

const m = (dateTime) => moment(dateTime).format('MM-DD HH:mm A');

class RentalsView extends Component<Props> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderRental({item: rental}) {
    if (!rental) return null;
    const {t} = this.props;
    console.log('t function', t);
    const onDetailItemPressed = () => {
      this.props.onDetailItemPressed(rental.hash);
    };
    const locations = _.map(rental.locationInfos || [], (loc, i) => ({
      ...loc,
      key: i,
    }));
    return (
      <RentalItemContainer
        onPress={onDetailItemPressed}
      >
        <View>
          <DateText>
            {m(rental.startDate)}
          </DateText>
          {(rental.orderDays > 0) && (
            <DateText>{t('order_days', {days: rental.orderDays})}</DateText>
          )}
          {(rental.orderHours > 0) && (
            <DateText>{t('order_hours', {hours: rental.orderHours})}</DateText>
          )}
        </View>
        {locations.map((loc) => (
          <LocationText
            key={loc.key}
          >
            {preferredLocale(loc, 'name')}
          </LocationText>
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
      <ThemeProvider theme={easi6Theme}>
        <Container>
          <FlatList
            data={renderRentals}
            renderItem={this.renderRental}
          />
        </Container>
      </ThemeProvider>
    );
  }
}

export default RentalsView;
