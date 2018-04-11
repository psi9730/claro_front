// @flow

import React, {Component} from 'react';
import {Dimensions, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import autoBind from 'react-autobind';

import {preferredLocale} from '../../utils/i18n';
import easi6Theme from '../../utils/easi6Theme';
import type {RentalType} from './RentalsState';

type Props = {
  t: Function,
  rentals: Array<RentalType>,
  loading: boolean,
  onDetailItemPressed: Function,
  onRefreshCalled: Function,
};

const Container = styled.View`
  background-color: white;
  display: flex;
  flex-flow: column;
`;

const EmptyContainer = styled.View`
  background-color: white;
  height: ${props => props.height}
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
  margin-bottom: 4px;
`;

const m = (dateTime) => moment(dateTime).format('MM-DD HH:mm A');

class RentalsView extends Component<Props> {
  constructor(props: Object) {
    super(props);

    autoBind(this);
  }

  renderRental({item: rental}: {item: RentalType}) {
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
          {(rental.orderDays > 0) ? (
            <DateText>&#40;{t('order_days', {days: rental.orderDays})}&#41;</DateText>
          ) : null}
          {(rental.orderHours > 0) ? (
            <DateText>&#40;{t('order_hours', {hours: rental.orderHours})}&#41;</DateText>
          ) : null}
        </HView>
        {locations.map((loc) => (
          <View
            key={loc.key}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <ColoredText>&#8226;&nbsp;&nbsp;</ColoredText>
            <LocationText>{preferredLocale(loc, 'name')}</LocationText>
          </View>
        ))}
      </RentalItemContainer>
    )
  }

  render() {
    const {t, loading, rentals, onRefreshCalled} = this.props;
    const renderRentals = _.map(rentals, (rental) => ({
      key: rental.rentalNumber,
      ...rental,
    }));

    const {height} = Dimensions.get('window');
    if(_.isEmpty(rentals)){
      return (
        <View style={{flex: 1}}>
          <ScrollView
            style={{display: 'flex'}}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={onRefreshCalled}
              />
            }
          >
            <EmptyContainer height={height - 100}>
              <EmptyText>
                {t('no_rentals')}
              </EmptyText>
            </EmptyContainer>
          </ScrollView>
        </View>
      )
    }

    return (
      <ThemeProvider theme={easi6Theme}>
        <Container>
          <FlatList
            data={renderRentals}
            renderItem={this.renderRental}
            refreshing={loading}
            onRefresh={onRefreshCalled}
          />
        </Container>
      </ThemeProvider>
    );
  }
}

export default RentalsView;
