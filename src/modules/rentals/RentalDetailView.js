// @flow

import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import autoBind from 'react-autobind';
import Swiper from 'react-native-swiper';

import {preferredLocale} from '../../utils/i18n';
import easi6Theme from '../../utils/easi6Theme';
import type {RentalType, LocationInfoType} from './RentalsState';

import PickupImage from '../../assets/images/pickup.png';
import StartImage from '../../assets/images/start.png';
import FinishImage from '../../assets/images/finish.png';
import SwiperDragImage from '../../assets/images/drag.png';

type Props = {
  t: Function,
  rental: RentalType,
  loading: boolean,
  openMap: Function,
  openPhone: Function,
  statusChange: Function,
};

type State = {
  opacity: number,
};

const Container = styled.View`
  flex: 1;
  display: flex;
  background-color: white;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1 0 500px;
  background-color: white;
  padding-left: 18px;
  padding-right: 18px;
`;

const SwiperContainer = styled.View`
  flex: 0 0 100px;
  display: flex;
  background-color: ${props => props.backgroundColor};
`;

const SwiperRow = styled.View`
  display: flex;
  flex-direction: row;
  height: 60px;
`;

const LabelText = styled.Text`
  font-size: 15px;
  margin-top: 19px;
  margin-bottom: 6px;
  color: ${props => props.theme.labelColor};
`;

const DateText = styled.Text`
  font-size: 24px;
  margin-bottom: 4px;
  margin-right: 4px;
  color: black;
`;

const Location = styled.View`
  display: flex;
  flex-flow: row;
  margin-top: 4px;
  align-items: flex-start;
`;

const LocationTexts = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;

const LocationText = styled.Text`
  font-size: 23px;
  color: black;
`;

const AddressText = styled.Text`
  font-size: 18px;
  color: #9e9e9e;
`;

const OpenMapBtn = styled.TouchableOpacity`
  flex: 0 0 70px;
  background-color: ${props => props.theme.mainBgColor};
  align-items: center;
  justify-content: center;
`;

const OpenMapText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.mainColor};
  margin-top: 4px;
`;

const Customer = styled.View`
  display: flex;
  flex-flow: column;
  padding-bottom: 40px;
`;

const CustomerText = styled.Text`
  font-size: 21px;
  color: black;
  margin-bottom: 5px;
`;

const CustomerPhone = styled.TouchableOpacity`
  margin-bottom: 5px;
`;

const CustomerPhoneText = styled.Text`
  font-size: 23px;
  color: ${props => props.theme.mainColor};
`;

const HView = styled.View`
  display: flex;
  flex-flow: row;
`;

const VView = styled.View`
  display: flex;
  flex-flow: column;
`;

const BulletText = styled.Text`
  font-size: 25px;
  color: ${props => props.theme.mainColor};
  margin-top: -5px;
`;

const TerminalVView = styled.View`
  margin-top: 14px;
  display: flex;
  flex-flow: column;
`;

const AirportSection = styled.View`
  display: flex;
  flex-flow: column;
  border-left-width: 3px;
  padding-left: 17px;
  margin-left: 4px;
  margin-bottom: 20px;
  border-left-color: ${props => props.theme.mainColor};
`;

const AirportLabel = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
  color: ${props => props.theme.mainColor};
  font-weight: bold;
  margin-top: -2px;
`;

const AirportText = styled.Text`
  font-size: 23px;
  font-weight: normal;
  margin-bottom: -2px;
`;

const m = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm A');

const RENTAL_STATUS_WAITPAY = 0;
const RENTAL_STATUS_PENDING = 20;
const RENTAL_STATUS_CONFIRMED = 30;
const RENTAL_STATUS_ASSIGNED = 40;
const RENTAL_STATUS_PICKUP = 50;
const RENTAL_STATUS_INUSE = 60;
const RENTAL_STATUS_FINISHED = 70;

class RentalDetailView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      opacity: 1,
    };
    autoBind(this);
  }

  Swipe: any;

  renderCustomer() {
    const {t, rental} = this.props;

    if (rental.status >= RENTAL_STATUS_FINISHED) return null;

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
            {t('member_count')}&nbsp;:&nbsp;
          </CustomerText>
          <CustomerText>
            {rental.memberCount}
          </CustomerText>
        </HView>
      </Customer>
    );
  }

  renderLocation(loc: LocationInfoType) {
    const {t} = this.props;
    const onOpenMapButtonPressed = () => this.props.openMap(loc);

    return (
      <Location key={loc.key}>
        <BulletText>
          &#8226;&nbsp;&nbsp;
        </BulletText>
        <LocationTexts>
          <LocationText>
            {preferredLocale(loc, 'name')}
          </LocationText>
          <AddressText>
            {preferredLocale(loc, 'address')}
          </AddressText>
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

  onIndexChanged(index: number) {
    if(index === 0) {
      const swipe = this.Swipe;
      this.props.statusChange().then(() => {
        swipe.scrollBy(1, false);
      });
    }
  };

  onScrollBeginDrag() {
    this.setState({
      opacity: 0.7,
    })
  }
  onMomentumScrollEnd() {
    this.setState({
      opacity: 1,
    })
  }

  renderSwipeButton() {
    const {t, rental} = this.props;

    if (rental.status < RENTAL_STATUS_ASSIGNED || rental.status >= RENTAL_STATUS_FINISHED) return null;
    const status = rental.status;
    let color = '#1bb4e2';
    let swiperText = t('pick_up');
    let swiperImage = PickupImage;

    switch (status) {
      case RENTAL_STATUS_PICKUP:
        color = '#4a90e2';
        swiperText = t('start_driving');
        swiperImage = StartImage;
        break;
      case RENTAL_STATUS_INUSE:
        color = '#ea655d';
        swiperText = t('finish_driving');
        swiperImage = FinishImage;
        break;
      default:
        break;
    }

    return (
      <SwiperContainer backgroundColor={color}>
        <Image style={{position: 'absolute', start: 20, top: 20, end: 20, bottom: 20, width: 'auto', height: 'auto'}} source={SwiperDragImage} />
        <Text style={{position: 'absolute',left: 175, top: 31, fontSize: 26, color: 'white', backgroundColor: 'transparent'}}>{swiperText}</Text>
        <Swiper
          ref={(ref) => {this.Swipe = ref;}}
          loop={false} showsPagination={false}
          showsButtons={false} autoplay={false}
          index={1}
          onIndexChanged={this.onIndexChanged}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onTouchStart={this.onScrollBeginDrag}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onTouchEnd={this.onMomentumScrollEnd}
        >
          <SwiperRow>
            <View style={{flex: 1}} />
          </SwiperRow>
          <SwiperRow>
            <Image style={{marginLeft: 20, marginTop: 20, height: 60, width: 90, opacity: this.state.opacity}} alt="button" source={swiperImage} />
            <View style={{flex: 1}} />
          </SwiperRow>
        </Swiper>
      </SwiperContainer>
    );
  }

  render() {
    const {t, rental} = this.props;

    if (!rental) return null;

    const locations = _.map(rental.locationInfos || [], (loc, i) => ({
      ...loc,
      key: i,
    }));

    const arrivalTerminal = rental.scheduledFlight && rental.scheduledFlight.arrivalTerminal;

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
              {(rental.orderDays > 0) ? (
                <DateText>&#40;{t('order_days', {days: rental.orderDays})}&#41;</DateText>
              ) : null}
              {(rental.orderHours > 0) ? (
                <DateText>&#40;{t('order_hours', {hours: rental.orderHours})}&#41;</DateText>
              ) : null}
            </HView>
            <LabelText>
              {t('rental_locations')}
            </LabelText>
            {locations.slice(0, 1).map(this.renderLocation)}
            {(rental.flightNumber || !!arrivalTerminal) ? (
              <AirportSection>
                {rental.flightNumber ? (
                  <VView>
                    <AirportLabel>
                      {t('flight_number')}
                    </AirportLabel>
                    <AirportText>
                      {rental.flightNumber}
                    </AirportText>
                  </VView>
                ) : null}
                {!!arrivalTerminal ? (
                  <TerminalVView>
                    <AirportLabel>
                      {t('meeting_point')}
                    </AirportLabel>
                    <AirportText>
                      {t('arrival_terminal')} {arrivalTerminal}
                    </AirportText>
                  </TerminalVView>
                ) : null}
              </AirportSection>
            ) : null}
            {locations.slice(1).map(this.renderLocation)}
            {this.renderCustomer()}
          </ScrollContainer>
          {this.renderSwipeButton()}
        </Container>
      </ThemeProvider>
    )
  }
}

export default RentalDetailView;
