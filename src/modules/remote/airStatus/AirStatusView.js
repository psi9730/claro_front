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
  ScrollView,
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
import RemoteBarView from '../../remote/remoteBar/remoteBarViewContainer';
import RemoteDetailView from '../../remote/remoteDetail/remoteDetailViewContainer';
import Interactable from 'react-native-interactable';
import burgerIcn from '../../../assets/images/burger.png';
import arrowDown from '../../../assets/images/Arrowhead-Down-01-128.png';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
const { width: viewportWidth } = Dimensions.get('window');
function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(82);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const { StatusBarManager } = NativeModules;
type Props = {
};

type State = {
  height: number,
  firstHeight: number,
};
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  height:100%;
  flex-direction: column;
  justify-content flex-start;
  background-color: white;
  padding-bottom: 3px;
`;
const GrayLine = styled.View`
  height: 1px;
  width: 90%;
  background-color: gray;
`;
const TextView = styled.View`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: auto;
  display: flex;
  flex-direction: column;
  paddingRight: 20px;
  paddingLeft: 20px;
  paddingBottom: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;
const AirStatusContainer = styled.View`
  flex-grow:0;
  flex-shrink:0;
  flex-basis:auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TitleText = styled.Text`
  font-weight: bold;
`;
const OuterContainer = styled.View`
  flex-grow:1;
  flex-shrink:1;
  flex-basis: auto;
`;
const TextLeft = styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    align-self: flex-start;
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-bottom:0px;
`

const AirPage = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    width:100%;
`;
const SelectContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const TextContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
const PageContainer = styled.View`
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 25px;
    margin-bottom: 15px;
    flex:1;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20;
    elevation: 2;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 15;
`;
const NavBar = styled.View`
  display: flex;
  flexDirection: row;
  justifyContent: flex-end;
  alignItems: center;
`;
const ModalView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 300px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;
const ModalView2= styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis:auto;
    border-radius:30;
    border-width: 1;
    border-color: white;
    width:90%;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    background-color:white;
`;
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

class AirStatusView extends Component<Props, State> {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      height: 200,
      first: true,
      pm10modalVisible: false,
      pm25modalVisible: false,
      vocmodalVisible: false,
      entries:[
        {
          title: '미세먼지 (PM10)',
          time: '1개월',
          visible: false,
        },
        {
          title: '초미세먼지 (PM2.5)',
          time: '1개월',
          visible: false,

        },
        {
          title: 'VOCs',
          time: '1개월',
          visible: false,
        }
      ],
      firstHeight:Dimensions.get('window').height
    };
  }
  componentDidMount(){

  }
  componentWillMount(){
    this._deltaY = Platform.OS ==='ios' ? new Animated.Value(Dimensions.get('window').height-135) : new Animated.Value(ExtraDimensions.get('REAL_WINDOW_HEIGHT')-135);
    if(Platform.OS === 'android'){
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'dark',
        statusBarTextColorSchemeSingleScreen: 'dark',
        topBarElevationShadowEnabled: false,
        statusBarColor: 'white',
        navBarHidden: true,
      });}
    else {
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'dark',
        statusBarColor: 'white',
        navBarHidden: true,
      });
    }
  }
  onDrawerSnap(event){
    if(event.nativeEvent.index === 0){
      this.props.navigator.setStyle({
        statusBarColor: 'white',
        statusBarTextColorScheme: 'dark',
        statusBarTextColorSchemeSingleScreen: 'dark',
      })
    } else if(event.nativeEvent.index === 1){
      this.props.navigator.setStyle({
        statusBarTextColorScheme: 'dark',
        statusBarColor: 'white',
        statusBarTextColorSchemeSingleScreen: 'dark',
      })
    }
  }
  _renderItem({item, index}){
    if(index===0) {
      return (
        <PageContainer>
          <TitleText style={{fontSize: 18, flexGrow: 0, flexShrink: 0, flexBasis: 'auto'}}>
            {item.title}
          </TitleText>
          <TouchableOpacity style={{flexGrow: 0, flexShrink: 0, flexBasis: 'auto'}}
                            onPress={() => this.setPm10ModalVisible(!this.state.pm10modalVisible)}>
            <AirStatusContainer>
              <TitleText style={{fontSize: 15, color: 'aqua'}}>
                {item.time}
              </TitleText>
              <Image source={arrowDown} resizeMode='center' style={{tintColor: 'aqua', height: 30, width: 30}}/>
            </AirStatusContainer>
          </TouchableOpacity>
          {this._renderGraph(item.time,item.title)}
        </PageContainer>)
    }
    else if(index===1){
      return (
        <PageContainer>
          <TitleText style={{fontSize: 18, flexGrow: 0, flexShrink: 0, flexBasis: 'auto'}}>
            {item.title}
          </TitleText>
          <TouchableOpacity style={{flexGrow: 0, flexShrink: 0, flexBasis: 'auto'}}
                            onPress={() => this.setPm25ModalVisible(!this.state.pm25modalVisible)}>
            <AirStatusContainer>
              <TitleText style={{fontSize: 15, color: 'aqua'}}>
                {item.time}
              </TitleText>
              <Image source={arrowDown} resizeMode='center' style={{tintColor: 'aqua', height: 30, width: 30}}/>
            </AirStatusContainer>
          </TouchableOpacity>
          {this._renderGraph(item.time,item.title)}
        </PageContainer>)
    }
    else if(index===2){
      return (
        <PageContainer>
          <TitleText style={{fontSize: 18, flexGrow: 0, flexShrink: 0, flexBasis: 'auto'}}>
            {item.title}
          </TitleText>
          <TouchableOpacity style={{flexGrow: 0, flexShrink: 0, flexBasis: 'auto'}}
                            onPress={() => this.setVocModalVisible(!this.state.vocmodalVisible)}>
            <AirStatusContainer>
              <TitleText style={{fontSize: 15, color: 'aqua'}}>
                {item.time}
              </TitleText>
              <Image source={arrowDown} resizeMode='center' style={{tintColor: 'aqua', height: 30, width: 30}}/>
            </AirStatusContainer>
          </TouchableOpacity>
          {this._renderGraph(item.time,item.title)}
        </PageContainer>)

    }
  }
  _renderGraph(time, type){ //5년, 1년, 6개월, 1개월, 1주, 1일

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    if(type==="미세먼지 (PM10)")
    {
        return (
          <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
            <YAxis
              data={data}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={data}
                contentInset={verticalContentInset}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
              >
                <Grid/>
              </LineChart>
              <XAxis
                numberOfTicks={ 3 }
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={data}
                formatLabel={(value, index) => index*2}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
              />
            </View>
          </View>
        )
    }
    else if(type==="초미세먼지 (PM2.5)")
    {
     /* return (
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={ data }
            contentInset={ contentInset }
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={ 3 }
            formatLabel={ value => `${value}` }
          />
          <ModalContainer>
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={ data }
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={ contentInset }
            >
              <Grid/>
            </LineChart>
            <XAxis
              data={ data }
              contentInset={ contentInset }
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={ 3 }
              formatLabel={(value, index) => dataWeek[ index ]}
            />
          </ModalContainer>
        </View>
      )
*/
    }
    else if(type==="VOCs")
    {
      /*
      return (
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={ data }
            contentInset={ contentInset }
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={ 3 }
            formatLabel={ value => `${value}` }
          />
          <ModalContainer>
          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={ data }
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={ contentInset }
          >
            <Grid/>
          </LineChart>
            <XAxis
              data={ data }
              contentInset={ contentInset }
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={ 3 }
              formatLabel={(value, index) => dataWeek[ index ]}
            />
          </ModalContainer>
        </View>
      )
      */
    }
  }

  onLayout = (event) => {
    var {height} = event.nativeEvent.layout;
    if(Platform.OS==='android') {
      this.setState({height: height});
      this.setState({firstHeight: height})
    }
  }
  setPm10ModalVisible(visible) {
    this.setState({pm10modalVisible: visible});
  }
  selectPm10ModalVisible(visible,time) {
    let entries = [...this.state.entries];
    entries[0] = {...entries[0], time: time};
    this.setState({entries});
    this.setState({pm10modalVisible: visible});
  }
  setPm25ModalVisible(visible) {
    this.setState({pm25modalVisible: visible});
  }
  selectPm25ModalVisible(visible,time){
    let entries = [...this.state.entries];
    entries[1] = {...entries[1], time: time};
    this.setState({entries});
    this.setState({pm25modalVisible: visible});
  }
  setVocModalVisible(visible) {
    this.setState({vocmodalVisible: visible});
  }
  selectVocModalVisible(visible,time){
    let entries = [...this.state.entries];
    entries[2] = {...entries[2], time: time};
    this.setState({entries});
    this.setState({vocmodalVisible: visible});
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  props: Props;
  render() {
    return (
      <View style={styles.IOSContainer} onLayout={(event) => {
        {this.onLayout(event)}
      }}>
        <Modal
          isVisible={this.state.pm10modalVisible}
          onBackdropPress={() => this.setPm10ModalVisible(!this.state.pm10modalVisible)}
        >
          <ModalView>
            <ModalView2>
            <TouchableHighlight onPress={()=> this.selectPm10ModalVisible(!this.state.pm10modalVisible,'5 년')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>5 년</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm10ModalVisible(!this.state.pm10modalVisible,'1 년')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 년</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm10ModalVisible(!this.state.pm10modalVisible,'6 개월')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>6 개월</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm10ModalVisible(!this.state.pm10modalVisible,'1 개월')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 개월</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm10ModalVisible(!this.state.pm10modalVisible,'1 주')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 주</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm10ModalVisible(!this.state.pm10modalVisible,'1 일')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 일</TitleText>
              </SelectContainer>
            </TouchableHighlight>
            </ModalView2>
          </ModalView>
        </Modal>
        <Modal
          isVisible={this.state.pm25modalVisible}
          onBackdropPress={() => this.setPm25ModalVisible(!this.state.pm25modalVisible)}
        >
          <ModalView>
            <ModalView2>
            <TouchableHighlight onPress={()=> this.selectPm25ModalVisible(!this.state.pm25modalVisible,'5 년')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>5 년</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm25ModalVisible(!this.state.pm25modalVisible,'1 년')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 년</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm25ModalVisible(!this.state.pm25modalVisible,'6 개월')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>6 개월</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm25ModalVisible(!this.state.pm25modalVisible,'1 개월')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 개월</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm25ModalVisible(!this.state.pm25modalVisible,'1 주')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 주</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectPm25ModalVisible(!this.state.pm25modalVisible,'1 일')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 일</TitleText>
              </SelectContainer>
            </TouchableHighlight>
            </ModalView2>
          </ModalView>
        </Modal>
        <Modal
          isVisible={this.state.vocmodalVisible}
          onBackdropPress={() => this.setVocModalVisible(!this.state.vocmodalVisible)}
        >
          <ModalView>
            <ModalView2>
            <TouchableHighlight onPress={()=> this.selectVocModalVisible(!this.state.vocmodalVisible,'5 년')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>5 년</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectVocModalVisible(!this.state.vocmodalVisible,'1 년')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 년</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectVocModalVisible(!this.state.vocmodalVisible,'6 개월')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>6 개월</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectVocModalVisible(!this.state.vocmodalVisible,'1 개월')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 개월</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectVocModalVisible(!this.state.vocmodalVisible,'1 주')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 주</TitleText>
                <GrayLine/>
              </SelectContainer>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> this.selectVocModalVisible(!this.state.vocmodalVisible,'1 일')} >
              <SelectContainer>
                <TitleText style={{margin:10}}>1 일</TitleText>
              </SelectContainer>
            </TouchableHighlight>
            </ModalView2>
          </ModalView>
        </Modal>
        { Platform.OS==='android' ?(
          <NavBar style ={{ padding: 20,  display: 'flex', flexDirection: 'row', flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
              ios: 64,
              android: 54
            })
          }} >
            <TextContainer>
              <TouchableHighlight onPress={()=> this.props.navigator.toggleDrawer({
                animated: true,
                side: 'left',
              })} >
                <Image source={burgerIcn} resizeMode='stretch' style={{ height:18, width:23}}/>
              </TouchableHighlight>
            </TextContainer>
          </NavBar>
        ): (
          <View style={{ flexGrow:0, flexShrink:0, flexBasis:'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
            <NavBar style ={{ height: Platform.select({
                ios:  20,
                android: StatusBarManager.HEIGHT, flexGrow:0, flexShrink:0, flexBasis: 'auto'
              }),
            }} />
            <NavBar style ={{ padding: 20, flexGrow:0, flexShrink:0, flexBasis:'auto', height: Platform.select({
                ios: 64,
                android: 54
              })
            }} >
              <TextContainer>
                <TouchableHighlight onPress={()=> this.props.navigator.toggleDrawer({
                  animated: true,
                  side: 'left',
                })} >
                  <Image source={burgerIcn} resizeMode='stretch'  style={{height:30, width:30}}/>
                </TouchableHighlight>
            </TextContainer>
            </NavBar>
          </View>)}
        <View style={styles.contentIOS}>
          <View style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', alignItems:'stretch'}}>
            <Container>
              <TextView>
                <TextLeft>
                  공기질 관리
                </TextLeft>
              </TextView>
              <OuterContainer>
                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={0.7}
                />
              </OuterContainer>
            </Container>
          </View>
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
                  <RemoteDetailView />
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

})

export default  AirStatusView
