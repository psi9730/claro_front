
import React, { Component } from 'react';
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
import {Platform} from 'react-native';
import autoBind from 'react-autobind';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer';
import RemoteDetailView from '../remote/remoteDetail/remoteDetailViewContainer';
import FilterView from './FilterViewContainer';
import Interactable from 'react-native-interactable';

type Props = {
  useState: Function,
};

type State = {
  height: number,
};

class FilterDraggableView extends Component<Props, State> {

  constructor(props) {
    console.log("Constructor is implemented");
    super(props);
    autoBind(this);
    this.state = {
      height: 70,
    };
    this._deltaY = new Animated.Value(600);
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
    console.log(this.state,"this.state")
    console.log(this.props.navigator,"this.props");
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  props: Props;
  render() {
    console.log('render');
    console.log(this.state.height,"this.state.height");
    console.log(this._deltaY,"this.deltaY");
    this.props.navigator.setStyle({
      statusBarTextColorScheme: 'light',
      navBarButtonColor: 'white',
      navBarTextColor: 'white',
      navBarNoBorder: true,
      statusBarColor: 'steelblue',
      navBarBackgroundColor: 'steelblue',
    });
    return (
      <View style={styles.IOSContainer} onLayout={(event) => {
        {this.onLayout(event)}
      }}>
        <View style={styles.contentIOS}>
          <FilterView navigator={this.props.navigator}/>
          <View style={styles.blank}/>
        </View>
        <View style={styles.panelContainer} pointerEvents={'box-none'}>
          {this.state.height > 100 && <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, this.state.height-70],
                outputRange: [0.5, 0],
                extrapolateRight: 'clamp'
              })
            }]} />}
          {this.state.height > 100 && <Interactable.View
            ref={ref => {
              this.panel = ref;
            }}
            verticalOnly={true}
            snapPoints={[{y: 0},{y: this.state.height-70}]}
            boundaries={{top: 0}}
            initialPosition={{y: this.state.height-70}}
            animatedValueY={this._deltaY}>
            <View style={styles.panel}>
              <Animated.View style={[styles.bottomSheetHeader,{
                height:this._deltaY.interpolate({
                  inputRange: [0, this.state.height-70],
                  outputRange: [0, 70],
                  extrapolateRight: 'clamp'
                })}]
              }
              >
                <RemoteBarView
                  _deltaY={this._deltaY.interpolate({
                    inputRange:[0, this.state.height-70], outputRange:['180deg', '0deg'], extrapolateRight: 'clamp'
                  })} height={this.state.height}
                />
              </Animated.View>
              <View style={styles.bottomSheetContentIOS}>
                <RemoteDetailView />
              </View>
            </View>
          </Interactable.View>}
        </View>
      </View>
    )
  }
  onLayout = (event) => {
    console.log("onLayout");
    var{height} = event.nativeEvent.layout;
    console.log(height,"height is cal");
    this._deltaY = new Animated.Value(height-70);
    this.setState({height: height});
    /*    if(Platform.OS==='IOS')
        this.refs['panel'].snapTo({index: 1});*/
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  IOSContainer:{
    flex: 1,
    display:'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  panelContainer: {
    height:'100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height:'100%',
    flexDirection:'column',
    display: 'flex',
  },
  content:{
    height:'100%',
    display:'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  blank: {
    flexGrow:0,
    flexShrink:0,
    flexBasis: 70
  },
  contentIOS: {
    flex:1,
    height:'100%',
    display:'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  bottomSheet: {
    height: '100%',
    backgroundColor: '#4389f2',
    flexDirection:'column',
    display: 'flex',
  },
  bottomSheetHeader: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  bottomSheetContent: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomSheetContentIOS: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

})

export default  FilterDraggableView

/*if (Platform.OS === 'android') {
      return (
        <ThemeProvider theme={ClaroTheme}>
          <TouchableWithoutFeedback
            onPress={RemoteDraggableView.dismissKeyboard} onLayout={(event) => {
            {this.onLayout(event)}
          }}
          >
            <CoordinatorLayout style={styles.container}>
              <View style={styles.content}>
                <RemoteView navigator={this.props.navigator}/>
                <View style={styles.blank}/>
              </View>

              <BottomSheetBehavior
                peekHeight={70}
                hideable={false}
                anchorEnabled={false}
                onStateChange={(state)=>this.useState(state)}
              >
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
    }*/