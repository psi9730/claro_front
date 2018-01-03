// @flow

import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
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
  rental: RentalType,
  loading: boolean,
  openMap: Function,
  openPhone: Function,
  statusChange: Function,
};

const Container = styled.View`
  background-color: white;  
`;

const ScrollContainer = styled.ScrollView`
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
`;

const LabelText = styled.Text`
  font-size: 30px;
  margin-top: 18px;
`;

const DateText = styled.Text`
  font-size: 30px;
  margin-bottom: 4px;
  margin-right: 4px;
  color: black;
`;

const Location = styled.View`
  display: flex;
  flex-flow: row;
  margin-top: 4px;
`;

const LocationTexts = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;
const LocationText = styled.Text`
  font-size: 24px;
  color: black;
`;

const OpenMapBtn = styled.TouchableOpacity`
  flex: 0 0 70px;
  background-color: ${props => props.theme.mainBgColor};
  align-items: center;
  justify-content: center;
`;

const OpenMapText = styled.Text`
  color: ${props => props.theme.mainColor};
`;

const Customer = styled.View`
  display: flex;
  flex-flow: column;
  padding-bottom: 40px;
`;

const CustomerText = styled.Text`
  font-size: 20px;
  color: black;
`;

const CustomerPhone = styled.TouchableOpacity`
`;

const CustomerPhoneText = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.mainColor};
`;

const HView = styled.View`
  display: flex;
  flex-flow: row;
`;

const m = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm A');

class RentalDetailView extends Component<Props> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderCustomer() {
    const {t, rental} = this.props;

    if (rental.status >= 70) return null;

    const contactInfo = rental.contactInfo;
    const onOpenPhoneButtonPressed = () => this.props.openPhone(contactInfo.phone);

    if (!contactInfo) return null;

    return (
      <Customer>
        <LabelText>
          {t('rental_customer')}
        </LabelText>
        <CustomerText>
          {contactInfo.name}
        </CustomerText>
        <CustomerPhone
          onPress={onOpenPhoneButtonPressed}
        >
          <CustomerPhoneText>{contactInfo.phone}</CustomerPhoneText>
        </CustomerPhone>
        <HView>
          <CustomerText>
            {t('member_count')}:&nbsp;
          </CustomerText>
          <CustomerText>
            {rental.memberCount}
          </CustomerText>
        </HView>
        {
          rental.flightNumber && (<HView>
            <CustomerText>
              {t('flight_number')}:&nbsp;
            </CustomerText>
            <CustomerText>
              {rental.flightNumber}
            </CustomerText>
          </HView>)
        }
      </Customer>
    );
  }

  renderLocation(loc) {
    const {t} = this.props;
    const onOpenMapButtonPressed = () => this.props.openMap(loc);

    return (
      <Location key={loc.key}>
        <LocationTexts>
          <LocationText>
            {preferredLocale(loc, 'name')}
          </LocationText>
          <LocationText>
            {preferredLocale(loc, 'address')}
          </LocationText>
        </LocationTexts>
        <OpenMapBtn
          onPress={onOpenMapButtonPressed}
        >
          <OpenMapText>
            {t('open_map')}
          </OpenMapText>
        </OpenMapBtn>
      </Location>
    );
  }

  renderButton() {
    const {t, loading, rental} = this.props;

    if (rental.status < 40 || rental.status >= 70) return null;

    const onStatusChangePressed = () => this.props.statusChange();
    const status = rental.status;
    let txt = t('pick_up');

    switch (status) {
      case 50:
        txt = t('start_driving');
        break;
      case 60:
        txt = t('finish_driving');
        break;
      default:
        break;
    }

    return (
      <View>
        <Button
          title={txt}
          onPress={onStatusChangePressed}
          color={easi6Theme.mainColor}
          disabled={loading}
        />
      </View>
    )
  }

  render() {
    const {t, rental} = this.props;

    if (!rental) return null;

    const locations = _.map(rental.locationInfos || [], (loc, i) => ({
      ...loc,
      key: i,
    }));

    return (
      <ThemeProvider theme={easi6Theme}>
        <Container>
          <ScrollContainer>
            <LabelText>
              {t('rental_date')}
            </LabelText>
            <HView>
              <DateText>
                {m(rental.startDate)}
              </DateText>
              {(rental.orderDays > 0) && (
                <DateText>&#40;{t('order_days', {days: rental.orderDays})}&#41;</DateText>
              )}
              {(rental.orderHours > 0) && (
                <DateText>&#40;{t('order_hours', {hours: rental.orderHours})}&#41;</DateText>
              )}
            </HView>
            <LabelText>
              {t('rental_locations')}
            </LabelText>
            {locations.map(this.renderLocation)}
            {this.renderCustomer()}
            <View style={{flexGrow: 1}} />
            {this.renderButton()}
          </ScrollContainer>
        </Container>
      </ThemeProvider>
    )
  }
}

export default RentalDetailView;
