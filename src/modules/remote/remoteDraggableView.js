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
import _ from 'lodash';
import {Platform} from 'react-native';
import autoBind from 'react-autobind';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer';
import RemoteDetailView from '../remote/remoteDetail/remoteDetailViewContainer';
import RemoteView from './remoteViewContainer';
import Interactable from 'react-native-interactable';
import burgerIcn from '../../assets/images/btnMenuN.png';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import dateformat from 'dateformat';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {getAuthenticationToken} from '../../utils/authentication';
import {REMOTE_SCREEN, SERIAL_NUMBER_SCREEN} from '../../../screens';

const { StatusBarManager } = NativeModules;
type Props = {
  useState: Function,
  getOuterRequest: Function,
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
`;
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};
const VeryGoodBackground = ['rgba(0,162,230,1)','rgba(51, 143, 252, 1)'];
const StatusVeryGoodBackground = 'rgba(0,162,230,1)';
const BadBackground = ['rgba(255,180,41,1)','rgba(255, 207, 0, 1)'];
const StatusBadBackground = 'rgba(255,180,41,1)';
const VeryBadBackground = ['rgba(255, 105, 124,1)','rgba(255, 73, 96, 1)'];
const StatusVeryBadBackground = 'rgba(255,105,124,1)';
const NormalBackground = ['rgba(0, 176, 177, 1)', 'rgba(59, 185, 146, 1)'];
const StatusNormalBackground = 'rgba(0,176, 177,1)';

class RemoteDraggableView extends Component<Props, State> {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      height: 200,
      first: true,
      firstHeight:Dimensions.get('window').height
    };
  }
  componentDidMount(){
    (async()=> {
      const token = await getAuthenticationToken();
      const refreshToken = token && token.refreshToken;
    })()
  }
  componentWillMount(){
    this.props.getDevicesRequest().then(() => {
      if (_.size(this.props.devices) > 0) {
      }
      else {
        this.props.navigator.resetTo({...SERIAL_NUMBER_SCREEN});
      }
    }).catch(e => console.log(e))
    this._deltaY = Platform.OS==='ios' ? new Animated.Value(Dimensions.get('window').height-135) : new Animated.Value(ExtraDimensions.get('REAL_WINDOW_HEIGHT')-135);
    (async () => {
      const serialNumber = await Storage.getItem(KEYS.serialNumber);
      this.props.updateBarcode(serialNumber);
      this.props.getUserProfileRequest().then(()=>{
      this.props.getOuterRequest(serialNumber, this.props.jibunAddr).catch((e)=>console.log(e,'error in getOuterRequest'));
      this.props.getControlDeviceRequest(serialNumber).catch((e)=>console.log(e));}).catch((e)=>console.log(e));
    })();
    if(Platform.OS==='android'){
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        statusBarTextColorSchemeSingleScreen: 'light',
        topBarElevationShadowEnabled: false,
        statusBarColor: StatusVeryBadBackground,
        navBarHidden: true,
      });}
    else {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        statusBarColor: StatusVeryBadBackground,
        navBarHidden: true,
      });
    }
  }
  shallowEqual(objA: mixed, objB: mixed): boolean {
    if (objA === objB) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      console.log('keysA',keysA,'keysB',keysB);
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        console.log('keysA', objA[keysA[i]],'keysB',objB[keysA[i]]);
        return false;
      }
    }

    return true;
  }

  shallowCompare(instance, nextProps, nextState) {
    return (
      !this.shallowEqual(instance.props, nextProps) ||
      !this.shallowEqual(instance.state, nextState)
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.shallowCompare(this, nextProps, nextState);
  }
  onDrawerSnap(event){
    if(event.nativeEvent.index===0){
      this.props.navigator.setStyle({
        statusBarColor: 'white',
        statusBarTextColorScheme: 'dark',
        statusBarTextColorSchemeSingleScreen: 'dark',
      })
    } else if(event.nativeEvent.index===1){
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'light',
        statusBarColor: this.props.backgroundColor,
        statusBarTextColorSchemeSingleScreen: 'light',
      })
    }
  }
  onLayout = (event) => {
      var {height} = event.nativeEvent.layout;
    if(Platform.OS==='android') {
      this.setState({height: height});
      this.setState({firstHeight: height})
    }
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  props: Props;
  render() {
    var newDate = dateformat(this.props.date,'yyyy.mm.dd HH:MM');
    const Color = this.props.backgroundColor;
    console.log(" StatusBarManager.HEIGHT", StatusBarManager.HEIGHT);
    return (
      <View style={styles.IOSContainer} onLayout={(event) => {
        {this.onLayout(event)}
      }}>
        { Platform.OS==='android' ?(
          <NavBar style ={{ padding: 20, backgroundColor: StatusVeryBadBackground,  display: 'flex', flexDirection: 'row', flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
              ios: 64,
              android: 54
            })
          }} >
            <TextContainer>
              <TouchableHighlight onPress={()=> this.props.navigator.toggleDrawer({
                animated: true,
                side: 'left',
              })} >
                <Image source={burgerIcn} resizeMode='stretch' style={{tintColor: 'white', height:18, width:23}}/>
              </TouchableHighlight>
            </TextContainer>
            <DateLeftContainer>
              <DateText>{newDate} 기준</DateText>
            </DateLeftContainer>
          </NavBar>
        ): (
          <View style={{ flexGrow:0, flexShrink:0, flexBasis:'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
            <NavBar style ={{  backgroundColor: StatusVeryBadBackground, height: Platform.select({
                ios:  20,
                android: StatusBarManager.HEIGHT, flexGrow:0, flexShrink:0, flexBasis: 'auto'
              }),
            }} />
            <NavBar style ={{ padding: 20, backgroundColor: StatusVeryBadBackground,  flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
                ios: 64,
                android: 54
              })
            }} >    <TextContainer>
              <TouchableHighlight onPress={()=> this.props.navigator.toggleDrawer({
                animated: true,
                side: 'left',
              })} >
                <Image source={burgerIcn} resizeMode='stretch'  style={{tintColor: 'white',  height:18, width:23}}/>
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
        {Platform.OS==='android' ?(
        <View style={styles.panelContainer} pointerEvents={'box-none'}>
         <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, this.state.firstHeight-135],
                outputRange: [0.5, 0],
                extrapolateRight: 'clamp'
              })
            }]} />
          <Interactable.View
            ref={ref => {
              this.panel = ref;
            }}
            verticalOnly={true}
            snapPoints={[{y: 0},{y: this.state.firstHeight-135}]}
            boundaries={{top: 0}}
            initialPosition={{y: this.state.firstHeight-135}}
            animatedValueY={this._deltaY}
            onSnap={this.onDrawerSnap}>
            <View style={styles.panel}>
              <Animated.View style={[styles.bottomSheetHeader,{
                height: this._deltaY.interpolate({
                  inputRange: [0, this.state.firstHeight-135],
                  outputRange: [0, 135],
                  extrapolateRight: 'clamp'
                })}]
              }
              >
                <RemoteBarView
                               _deltaY={this._deltaY.interpolate({
                  inputRange:[0, this.state.firstHeight-135], outputRange:['180deg', '0deg'], extrapolateRight: 'clamp'
                })}
                />
              </Animated.View>
              <View style={styles.bottomSheetContentIOS}>
                <RemoteDetailView navigator={this.props.navigator}/>
              </View>
            </View>
          </Interactable.View>
        </View>
          ) : (<View style={styles.panelContainer} pointerEvents={'box-none'}>
          <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, Screen.height-135],
                outputRange: [0.5, 0],
                extrapolateRight: 'clamp'
              })
            }]} />
          <Interactable.View
            ref={ref => {
              this.panel = ref;
            }}
            verticalOnly={true}
            snapPoints={[{y: 0},{y: Screen.height-135}]}
            boundaries={{top: 0}}
            initialPosition={{y: Screen.height-135}}
            animatedValueY={this._deltaY}
            onSnap={this.onDrawerSnap}>
            <View style={styles.panel}>
              <Animated.View style={{
                height: this._deltaY.interpolate({
                  inputRange: [0, Screen.height-135],
                  outputRange: [0, 135],
                  extrapolateRight: 'clamp'
                })}
              }
              >
                <RemoteBarView
                  _deltaY={this._deltaY.interpolate({
                    inputRange:[0,Screen.height-135], outputRange:['180deg', '0deg'], extrapolateRight: 'clamp'
                  })}
                />
              </Animated.View>
              <View style={styles.bottomSheetContentIOS}>
                <RemoteDetailView navigator={this.props.navigator}/>
              </View>
            </View>
          </Interactable.View>
        </View>)}
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
    flexBasis: 135
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
    display: 'flex',
    flexDirection: 'column',
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

});

export default  RemoteDraggableView
