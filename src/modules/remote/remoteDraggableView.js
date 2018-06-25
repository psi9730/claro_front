/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
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
  View,
  NativeModules,
} from 'react-native';
import {Platform} from 'react-native';
import autoBind from 'react-autobind';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer';
import RemoteDetailView from '../remote/remoteDetail/remoteDetailViewContainer';
import RemoteView from './remoteViewContainer';
import Interactable from 'react-native-interactable';
import burgerIcn from '../../assets/images/burger.png';
import circleIcn from '../../assets/images/circle.png';
import dateformat from 'dateformat';
const { StatusBarManager } = NativeModules;
type Props = {
  useState: Function,
};

type State = {
  height: number,
  firstHeight: number,
};

const TextContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
const NavBar = styled.View`
  display: flex;
  flexDirection: row;
  justifyContent: flex-end;
  alignItems: center;
`;
const DateLeftContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
`;
const DateText = styled.Text`
    color : white;
    font-size : 15px;
`

class RemoteDraggableView extends Component<Props, State> {

  constructor(props) {
    console.log("Constructor is implemented");
    super(props);
    autoBind(this);
    this.state = {
      height: 70,
      first: true,
      firstHeight: Dimensions.get('window').height,
    };
    this._deltaY = new Animated.Value(Dimensions.get('window').height-70);
    if(Platform.OS==='android'){
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        navBarBackgroundColor: this.props.backgroundColor,
        statusBarTextColorSchemeSingleScreen: 'light',
        navBarNoBorder: true,
        topBarElevationShadowEnabled: false,
        navBarTextColor: 'white',
        statusBarColor: this.props.backgroundColor,
        navBarHidden: true,
        navBarButtonColor: 'white',
      });}
    else {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        navBarButtonColor: 'white',
        navBarTextColor: 'white',
        navBarNoBorder: true,
        statusBarColor: this.props.backgroundColor,
        navBarHidden: true,
        navBarBackgroundColor: 'steelblue',
      });
    }
  }
  componentDidUpdate(){

  }
  onDrawerSnap(event){
    if(event.nativeEvent.index===0){
      this.props.navigator.setStyle({
        statusBarColor: 'white',
        statusBarTextColorScheme: 'dark',
        statusBarTextColorSchemeSingleScreen: 'dark',
      })
    } else{
      console.log("gotoindex1");
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'white',
        statusBarColor: this.props.backgroundColor,
        statusBarTextColorSchemeSingleScreen: 'white',
      })
    }
  }
  onLayout = (event) => {
    console.log("onLayout");
      var {height} = event.nativeEvent.layout;
    console.log(height,"height is cal");
    if(this.state.first===true && Platform.OS==='ios'){
      this.setState({height: Dimensions.get('window').height});
      console.log(Dimensions.get('window').height,"Dimension");
      this.setState({first:false});
      this.setState({firstHeight: Dimensions.get('window').height})
    }
    else {
      this.setState({height: height});
      this.setState({firstHeight: height})
      console.log("calculate",height);
    }
    if(Platform.OS==='android')
      this._deltaY = new Animated.Value(height-70)
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  props: Props;
  render() {
    var newDate = dateformat(this.props.date,'yyyy.mm.dd HH:MM');
    const Color = this.props.backgroundColor;
    console.log(Color,"color");
    return (
      <View style={styles.IOSContainer} onLayout={(event) => {
        {this.onLayout(event)}
      }}>
        { Platform.OS==='android' ?(
          <NavBar style ={{ padding: 20, backgroundColor: Color,  display: 'flex', flexDirection: 'row', flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
              ios: 64,
              android: 54
            })
          }} >
            <TextContainer>
              <TouchableHighlight onPress={()=> this.props.navigator.toggleDrawer({
                animated: true,
                side: 'left',
              })} >
                <Image source={burgerIcn} resizeMode='stretch' style={{tintColor: 'white', height:30, width:30}}/>
              </TouchableHighlight>
            </TextContainer>
            <DateLeftContainer>
              <DateText>{newDate} 기준</DateText>
            </DateLeftContainer>
          </NavBar>
        ): (
          <View style={{ flexGrow:0, flexShrink:0, flexBasis:'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
            <NavBar style ={{  backgroundColor: Color, height: Platform.select({
                ios:  20,
                android: StatusBarManager.HEIGHT, flexGrow:0, flexShrink:0, flexBasis: 'auto'
              }),
            }} />
            <NavBar style ={{ padding: 20, backgroundColor: Color,  flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
                ios: 64,
                android: 54
              })
            }} >    <TextContainer>
              <TouchableHighlight onPress={()=> this.props.navigator.toggleDrawer({
                animated: true,
                side: 'left',
              })} >
                <Image source={burgerIcn} resizeMode='stretch'  style={{tintColor: 'white', height:30, width:30}}/>
              </TouchableHighlight>
            </TextContainer>
              <DateLeftContainer>
                <DateText>{newDate} 기준</DateText>
              </DateLeftContainer>

            </NavBar></View>)}
        <View style={styles.contentIOS}>
          <RemoteView navigator={this.props.navigator}/>
          <View style={styles.blank}/>
        </View>
        <View style={styles.panelContainer} pointerEvents={'box-none'}>
          {this.state.height > 100 && <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, this.state.firstHeight-70],
                outputRange: [0.5, 0],
                extrapolateRight: 'clamp'
              })
            }]} />}
          {this.state.height > 100 && <Interactable.View
            ref={ref => {
              this.panel = ref;
            }}
            verticalOnly={true}
            snapPoints={[{y: 0},{y: this.state.firstHeight-70}]}
            boundaries={{top: 0}}
            initialPosition={{y: this.state.firstHeight-70}}
            animatedValueY={this._deltaY}
            onSnap={this.onDrawerSnap}>
            <View style={styles.panel}>
              <Animated.View style={[styles.bottomSheetHeader,{
                height: this._deltaY.interpolate({
                  inputRange: [0, this.state.firstHeight-70],
                  outputRange: [0, 70],
                  extrapolateRight: 'clamp'
                })}]
              }
              >
                <RemoteBarView
                               _deltaY={this._deltaY.interpolate({
                  inputRange:[0, this.state.firstHeight-70], outputRange:['180deg', '0deg'], extrapolateRight: 'clamp'
                })}
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

export default  RemoteDraggableView

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