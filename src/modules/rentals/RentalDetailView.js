// @flow

import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash';
import moment from 'moment';
import autoBind from 'react-autobind';

import {preferredLocale} from '../../utils/i18n';

type Props = {
  t: Function,
  rental: mixed,
  loading: boolean,
  openMap: Function,
};

const Container = styled.View`
  background-color: white;
`;

const m = (dateTime) => moment(dateTime).format('MM-DD HH:mm');


class RentalDetailView extends Component<Props> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderLocation(loc) {
    const {t} = this.props;
    const onOpenMapButtonPressed = () => this.props.openMap(loc);

    return (
      <View key={loc.key}>
        <Text>
          {preferredLocale(loc, 'name')}
        </Text>
        <Text>
          {preferredLocale(loc, 'address')}
        </Text>
        <Button
          title={t('open_map')}
          onPress={onOpenMapButtonPressed}
        />
      </View>
    );
  }

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
        {locations.map(this.renderLocation)}
      </Container>
    )
  }
}

export default RentalDetailView;
