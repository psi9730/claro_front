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
import type RentalType from './RentalsState';

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
  font-size: 18px;
  margin-top: 19px;
  margin-bottom: 4px;
`;

const DateText = styled.Text`
  font-size: 23px;
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

const ColoredText = styled.Text`
  font-size: 25px;
  color: ${props => props.theme.mainColor};
`;

const m = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm A');

const RENTAL_STATUS_WAITPAY = 0;
const RENTAL_STATUS_PENDING = 20;
const RENTAL_STATUS_CONFIRMED = 30;
const RENTAL_STATUS_ASSIGNED = 40;
const RENTAL_STATUS_PICKUP = 50;
const RENTAL_STATUS_INUSE = 60;
const RENTAL_STATUS_FINISHED = 70;

class RentalDetailView extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
    };
    autoBind(this);
  }

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
        {
          rental.flightNumber ? (<HView>
            <CustomerText>
              {t('flight_number')}:&nbsp;
            </CustomerText>
            <CustomerText>
              {rental.flightNumber}
            </CustomerText>
          </HView>): null
        }
      </Customer>
    );
  }

  renderLocation(loc) {
    const {t} = this.props;
    const onOpenMapButtonPressed = () => this.props.openMap(loc);

    return (
      <Location key={loc.key}>
        <ColoredText>
          &#8226;&nbsp;&nbsp;
        </ColoredText>
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

  onIndexChanged(index) {
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
            {locations.map(this.renderLocation)}
            {this.renderCustomer()}
          </ScrollContainer>
          {this.renderSwipeButton()}
        </Container>
      </ThemeProvider>
    )
  }
}

export default RentalDetailView;
