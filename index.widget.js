import React from 'react'
import {AppRegistry, Platform, Text, View} from 'react-native'
const TodayWidget = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text>
      Hello Today Widget!
    </Text>
  </View>
)
if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('claro_widget', () => TodayWidget)
}
