import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text } from 'react-native';

export default class ScrollView2 extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{borderWidth: 1 ,borderBottomWidth:0, borderBottomColor: 'gray', paddingBottom:30}}>
        <Text >{this.props.text}</Text>
      </ScrollView>
    );
  }
}

// skip these lines if using Create React Native App