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
import type RentalType from './RentalsState';

type Props = {
  t: Function,
  rentals: Array<RentalType>,
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

const EmptyContainer = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.Text`
  font-size: 20px;
  color: black;
  opacity: 0.4;
`;


const RentalItemContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => props.theme.mainBgColor};
  border-bottom-color: ${props => props.theme.borderColor};
  border-bottom-width: 0.5px;
  padding: 15px;
  padding-left: 20px;
`;

const DateText = styled.Text`
  font-size: 20px;
  color: black;
  margin-right: 4px;
`;

const LocationText = styled.Text`
  font-size: 20px;
  color: black;
`;

const ColoredText = styled.Text`
  font-size: 25px;
  color: ${props => props.theme.mainColor};
`;

const HView = styled.View`
  flex-flow: row;
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
    const onDetailItemPressed = () => {
      this.props.onDetailItemPressed(rental.rentalNumber);
    };
    const locations = _.map(rental.locationInfos || [], (loc, i) => ({
      ...loc,
      key: i,
    }));
    return (
      <RentalItemContainer
        onPress={onDetailItemPressed}
      >
        <HView>
          <DateText>
            {m(rental.startDate)}&nbsp;
          </DateText>
          {(rental.orderDays > 0) && (
            <DateText>&#40;{t('order_days', {days: rental.orderDays})}&#41;</DateText>
          )}
          {(rental.orderHours > 0) && (
            <DateText>&#40;{t('order_hours', {hours: rental.orderHours})}&#41;</DateText>
          )}
        </HView>
        {locations.map((loc) => (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <ColoredText>
              &#8226;&nbsp;&nbsp;
            </ColoredText>
            <LocationText
              key={loc.key}
            >
              {preferredLocale(loc, 'name')}
            </LocationText>
          </View>
        ))}
      </RentalItemContainer>
    )
  }

  render() {
    const {t, loading, rentals} = this.props;
    const renderRentals = _.map(rentals, (rental) => ({
      key: rental.rentalNumber,
      ...rental,
    }));

    if(_.isEmpty(rentals)){
      return (
        <EmptyContainer>
          <EmptyText>
            {t('no_rentals')}
          </EmptyText>
        </EmptyContainer>
      )
    }

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
