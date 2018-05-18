
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import RemoteHeader from '../remote/remoteBar/remoteBarViewContainer'
import Screen2 from './FilterViewContainer'
import Screen3 from '../remote/remoteViewContainer'
import styled from 'styled-components/native'

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 15px;
  padding-bottom: 5px;
`;

const NavView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 45px;
`;
export default class FilterDragView extends Component {
  render() {
    return (
      <Container>
      <Screen2/>
        <NavView>
      <Swiper horizontal={false} loop={false} showsButtons={false} showsPagination={false} >
          <RemoteHeader/>
          <Screen3/>
      </Swiper>
        </NavView>
      </Container>
    );
  }
}