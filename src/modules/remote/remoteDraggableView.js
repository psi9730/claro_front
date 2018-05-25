/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types'
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  StatusBar,
  TouchableHighlight,
  View
} from 'react-native';
import {
  CoordinatorLayout,
  BottomSheetBehavior,
} from 'react-native-bottom-sheet-behavior'
import {Platform} from 'react-native';
import autoBind from 'react-autobind';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer';
import RemoteDetailView from '../remote/remoteDetail/remoteDetailViewContainer';
import RemoteView from './remoteViewContainer';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import Interactable from 'react-native-interactable';
const { width, height } = Dimensions.get('window')

type Props = {

};

type State = {
};

class RemoteDraggableView extends Component<Props, State> {

  constructor(props) {
    console.log("Constructor is implemented");
    super(props);
    autoBind(this);
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  props: Props;

  render() {
    if (Platform.OS === 'android') {
      return (
        <ThemeProvider theme={ClaroTheme}>
          <TouchableWithoutFeedback
            onPress={RemoteDraggableView.dismissKeyboard}
          >
            <CoordinatorLayout style={styles.container}>
              <View style={styles.content}>
                <RemoteView navigator={this.props.navigator}/>
              </View>
              <BottomSheetBehavior
                peekHeight={70}
                hideable={false}
                anchorEnabled={false}
                ref={ref => {
                  this.bottomSheet = ref
                }}>
                <View style={styles.bottomSheet}>
                  <View style={styles.bottomSheetHeader}>
                    <RemoteBarView/>
                  </View>
                  <View style={styles.bottomSheetContent}>
                    <RemoteDetailView/>
                  </View>
                </View>
              </BottomSheetBehavior>
            </CoordinatorLayout>
          </TouchableWithoutFeedback>
        </ThemeProvider>
      );
    }
    else return (
      null
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    height,
    backgroundColor: '#fff',
  },
  bottomSheet: {
    backgroundColor: '#4389f2',
  },
  bottomSheetHeader: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 60
  },
  bottomSheetContent: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    padding: 6,
    paddingHorizontal: 14,
    height: 30,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 1,
    backgroundColor: '#333',
  },
  buttonLabel: {
    color: 'white'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default  RemoteDraggableView