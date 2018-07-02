/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import {
  Platform,
  Button,
  Image,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  NativeModules
} from 'react-native';
import autoBind from 'react-autobind';
import exitIcn from '../../../src/assets/images/exit.png';
import whiteExitIcn from '../../../src/assets/images/x-mark-32.png';
const { StatusBarManager } = NativeModules;
import NavigationStyleWrapper from '../../../src/utils/NavigationStyleWrapper'
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight((statusBarHeight)=>{
}) : StatusBarManager.HEIGHT;
type Props = {
  exitButton: Image,
  navigator: any,
  backgroundColor: string,
  POP: Function,
};

type State = {

};

const NavBar = styled.View`
  display: flex;
  flexDirection: row;
  justifyContent: flex-end;
  alignItems: center;
`;

class NavBarView extends Component<Props, State> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  state: State = {
  };


  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  props: Props;

  render() {

    /*
    if (Platform.OS === 'android') {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        statusBarTextColorSchemeSingleScreen: 'light',
        navBarHidden: true,
        drawUnderNavBar: true,
        drawUnderStatusBar: true,
        statusBarColor: 'transparent'
      });
    } else {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        navBarHidden: true,
        drawUnderNavBar: true,
        drawUnderStatusBar: true,
        statusBarColor: 'transparent'
      });
    }*/
    let ScreenHeight = Dimensions.get("window").height;
    return (
      <View>
        { Platform.OS === 'android' ? (
          <View>
            <NavBar style={{
              backgroundColor: this.props.backgroundColor, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', height: Platform.select({
                ios: 64,
                android: 54
              })
            }}>
              <TouchableHighlight onPress={this.props.navigator.pop()}>
                <Image source={this.props.exitButton} resizeMode='stretch' style={{height: 20, width: 20}}/>
              </TouchableHighlight>
            </NavBar>
          </View>
        ) : (
          <View>
            <NavBar style={{
              backgroundColor: this.props.backgroundColor, height: Platform.select({
                ios: 20,
                android: StatusBarManager.HEIGHT, flexGrow: 0, flexShrink: 0, flexBasis: 'auto'
              }),
            }}/>
            <NavBar style={{
              backgroundColor: this.props.backgroundColor, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', height: Platform.select({
                ios: 64,
                android: 54
              })
            }}><TouchableHighlight onPress={() => {this.props.navigator.pop(); console.log("enterPOPOP")}}>
              <Image source={exitIcn} resizeMode='center' style={{height: 50, width: 50}}/>
            </TouchableHighlight>
            </NavBar>
          </View>
        )
        }
      </View>
    )
  }
}

export default  NavBarView