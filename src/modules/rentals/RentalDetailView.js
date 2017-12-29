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

type Props = {
  t: Function,
  rental: {},
  loading: boolean,
  openMap: Function,
};

const Container = styled.View`
  padding: 10px;
  background-color: white;
`;

const LabelText = styled.Text`
  font-size: 26px;
  margin-top: 10px;
  color: black;
`;

const DateText = styled.Text`
  font-size: 26px;
  margin-bottom: 4px;
`;

const Location = styled.View`
  display: flex;
  flex-flow: row;
  margin-top: 4px;
`;

const LocationTexts = styled.View`
  flex: 1;
`;
const LocationText = styled.Text`
  font-size: 22px;
`;

const OpenMapBtn = styled.TouchableOpacity`
  flex: 0 0 70px;
  height: 70px;
  background-color: ${props => props.theme.mainBgColor};
`;

const OpenMapText = styled.Text`
  color: ${props => props.theme.mainColor};
`;

const Customer = styled.View`
  display: flex;
  flex-flow: column;
`;

const m = (dateTime) => moment(dateTime).format('MM-DD HH:mm');

class RentalDetailView extends Component<Props> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderCustomer() {
    const {t, rental} = this.props;
    const contactInfo = rental.contactInfo;

    if (!contactInfo) return null;

    return (
      <Customer>
        <Text>
          {contactInfo.name}
        </Text>
        <Text>
          {contactInfo.phone}
        </Text>
        <View>
          <Text>
            {t('member_count')}
          </Text>
          <Text>
            {rental.memberCount}
          </Text>
        </View>
        {
          rental.flightNumber && (<View>
            <Text>
              {t('flight_number')}
            </Text>
            <Text>
              {rental.flightNumber}
            </Text>
          </View>)
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
          <LabelText>
            {t('rental_date')}
          </LabelText>
          <DateText>
            {m(rental.startDate)}
          </DateText>
          <LabelText>
            {t('rental_locations')}
          </LabelText>
          {locations.map(this.renderLocation)}
          <LabelText>
            {t('rental_customer')}
          </LabelText>
          {this.renderCustomer()}
        </Container>
      </ThemeProvider>
    )
  }
}

export default RentalDetailView;
