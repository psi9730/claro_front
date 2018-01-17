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
import SwiperButtonImage from '../../assets/images/pickup.png';
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
  padding: 20px;
`;

const OpacityContainer = styled.View`
  flex: 1;
  display: flex;
  opacity: ${props => props.opacity};
`;

const SwiperRow = styled.View`
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

  renderButton() {
    const {t, loading, rental} = this.props;

    if (rental.status < RENTAL_STATUS_ASSIGNED || rental.status >= RENTAL_STATUS_FINISHED) return null;

    const onStatusChangePressed = () => this.props.statusChange();
    const status = rental.status;
    let txt = t('pick_up');

    switch (status) {
      case RENTAL_STATUS_PICKUP:
        txt = t('start_driving');
        break;
      case RENTAL_STATUS_INUSE:
        txt = t('finish_driving');
        break;
      default:
        break;
    }

    return (
      <View style={{marginBottom: 30}}>
        <Button
          title={txt}
          onPress={onStatusChangePressed}
          color={easi6Theme.mainColor}
          disabled={loading}
        />
      </View>
    )
  }

  onIndexChanged(index) {
    if(index === 0){
      this.props.statusChange();
      this.Swipe.scrollBy(1, false);
    }
  };
  
  onPageScrollStateChanged(scrollState) {
    if (scrollState === 'dragging') {
      this.setState({
        opacity: 0.7,
      })
    } else {
      this.setState({
        opacity: 1,
      })
    }
  }

  renderSwipeButton() {
    const {t, rental} = this.props;
  
    if (rental.status < 40 || rental.status >= 70) return null;
    const status = rental.status;
    let color = '#1bb4e2';
    let swiperText = t('pick_up');
  
    switch (status) {
      case 50:
        color = '#4a90e2';
        swiperText = t('start_driving');
        break;
      case 60:
        color = '#ea655d';
        swiperText = t('finish_driving');
        break;
      default:
        break;
    }
    
    return(
      <SwiperContainer backgroundColor={color}>
        <OpacityContainer opacity={this.state.opacity}>
          <Image style={{position: 'absolute', left: 0, top: 0, height: 60, width: 370, resizeMode: 'stretch'}} source={SwiperDragImage} />
          <Text style={{position: 'absolute',left: 155, top: 11, fontSize: 26, color: 'white'}}>{swiperText}</Text>
          <Swiper ref={(ref) => {this.Swipe = ref;}} loop={false} showsPagination={false} showsButtons={false} autoplay={false} index={1} onIndexChanged={this.onIndexChanged} onPageScrollStateChanged={this.onPageScrollStateChanged}>
            <SwiperRow>
              <View style={{flex: 1}} />
            </SwiperRow>
            <SwiperRow>
              <Image style={{height: 60, width:90}} alt="button" source={SwiperButtonImage} />
              <View style={{flex: 1}} />
            </SwiperRow>
          </Swiper>
        </OpacityContainer>
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
          </ScrollContainer>
          {this.renderSwipeButton()}
        </Container>
      </ThemeProvider>
    )
  }
}

export default RentalDetailView;
