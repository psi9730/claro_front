/* @flow */

import React, { Component } from 'react';
import {
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback, Linking, WebView, TouchableHighlight
} from 'react-native';
import Modal from 'react-native-modal';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import * as Progress from 'react-native-progress';
import circleIcnBlue from '../../assets/images/circleIcnBlue.png';
import exitIcnRed from '../../assets/images/exitIcnRed.png';
import NavigationStyleWrapper from '../../utils/NavigationStyleWrapper';
import Pie from 'react-native-pie';
import Fill from '../../assets/images/Fill.png';
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;
type Props = {
  filterMaxTime: number,
  filterUsingTime: number,
  url: string,
  filterTimeResetRequest: Function,
  usingDay: number,
  usingMonth: number
};

type State = {
  modalVisible: boolean,
  resetVisible: boolean,
};

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 15px;
  padding-bottom: 5px;
`;

const ButtonView = styled.View`
    flex-grow:1;
    flex-shrink:0;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 15px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  border-width: 1;
  flex-basis: 46px;
  width: 100%;
  margin-bottom: 14px;
  margin-right: 15px;
  margin-left: 15px;
  background-color: white;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TextLeftContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;
const BottomButtonView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-end;
    align-items: center;
`;
const BottomButtonRowView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: space-around;
    align-items: center;
`;
const TopTextContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: flex-start;
    align-items: flex-start;
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
    background-color:white;
`;
const ModalContainer = styled.View`
    flex-grow:3;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column
    justify-content: center;
    align-items: center;
`;
const ModalView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 180px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const GrayLine = styled.View`
  flex-grow: 0; 
  flex-shrink: 0; 
  flex-basis: auto;
  height: 1px;
  width: 100%;
  background-color: gray;
`;

class FilterView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      modalVisible: false,
      resetVisible: false,
      progress:0,
    }
  }
  componentWillMount(){
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setResetVisible(visible){
    this.setState({resetVisible: visible})
  }

  filterTimeReset(){
    this.props.filterTimeResetRequest(0,this.props.barcode).then(()=>
    this.setResetVisible(!this.state.resetVisible)).then(()=> this.forceUpdate()).catch((e)=>console.log(e))
  }
  componentWillReceiveProps(){

  }
  componentDidMount(){
    NavigationStyleWrapper(this.props.navigator,'dark','white','white',false,false)
  }
  props: Props;

  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  /*
    {
                  percent <= 0.5 ?
                    <Pie
                      radius={175}
                      innerRadius={88}
                      series={[40-percent*80,percent*80,60]}
                      colors={['rgba(0, 0, 0, 0.1)','#59e3f5','rgba(0,0,0,0.1)']}
                      backgroundColor='#ddd' /> : ( percent <= 1 ?
                    <Pie
                      radius={175}
                      innerRadius={88}
                      series={[40,100-percent*80, percent*80-40]}
                      colors={['#59e3f5','rgba(0, 0, 0, 0.1)','#59e3f5']}
                      backgroundColor='#ddd' /> :  <Pie
                        radius={175}
                        innerRadius={88}
                        series={[100]}
                        colors={['rgba(0, 0, 0, 0.1)']}
                        backgroundColor='#ddd' />
                    )
                }
   */

  render() {
    console.log("filterUsingTime",this.props.filterUsingTime,"filterMaxTime",this.props.filterMaxTime);
    const percent = 0.8; //this.props.filterUsingTime/this.props.filterMaxTime
    const Color = Array.from(Array(100).keys(), i =>{     const r = (89-45)/100;
    const g = (227-195)/100;
    const b = (245-232)/100;
    return `rgba(${Math.ceil(89-r*i)}, ${Math.ceil(227-g*i)}, ${Math.ceil(245-b*i)},1`});
    const Series = Array.from(Array(100).keys(), i =>{      return percent*80/100;});
    const UpColor =  Array.from(Array(100).keys(), i =>{     const r = (45-89)/100;
      const g = (195-227)/100;
      const b = (232-245)/100;
      return `rgba(${Math.ceil(45-r*i)}, ${Math.ceil(195-g*i)}, ${Math.ceil(232-b*i)},1`});
    const Series40 = Array.from(Array(100).keys(), i =>{      return 0.4;});
    const UpSeries = Array.from(Array(100).keys(), i =>{      return (percent*80-40)/100;});
    console.log([40-percent*80].concat(Series).concat(60));
    console.log(Color,'color');
    console.log(Series,'series');
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={FilterView.dismissKeyboard}
        >
          <Container >
            <TopTextContainer>
              <TitleText> 필터 관리</TitleText>
            </TopTextContainer>
            <ButtonView  >
              <View style={{position:'absolute',   top: 0,
                }}>
                {
                  percent <= 0.5 ?
                    <Pie
                      radius={175}
                      innerRadius={88}
                      series={[40-percent*80].concat(Series).concat(60)}
                      colors={['rgba(0, 0, 0, 0.1)'].concat(Color).concat('rgba(0, 0, 0, 0.1)')}
                      backgroundColor='#ddd' /> : ( percent <= 1 ?
                    <Pie
                      radius={175}
                      innerRadius={88}
                      series={Array().concat(Series40).concat(100-percent*80).concat(UpSeries)}
                      colors={Array().concat(Color).concat('rgba(0,0,0,0.1)').concat(UpColor)}
                      backgroundColor='#ddd' /> :  <Pie
                        radius={175}
                        innerRadius={88}
                        series={[100]}
                        colors={['rgba(0, 0, 0, 0.1)']}
                        backgroundColor='#ddd' />
                    )
                }
              </View>
              <Image source={Fill} style={{
                height:240,
                width: 350,
                resizeMode: 'stretch'
              }}/>
              <View style={{position:'absolute', flexBasis: 'auto', height:100, top: 110, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
              }}>
                { percent <= 1 ?
                  <View style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignSelf:'center'}}>
                    <Text style={{fontSize: 18,  textAlign: 'center'}}>
                        필터 사용 시간
                    </Text>
                    <Text style={{ color: '#59e3f5', fontSize: 46, textAlign: 'center', fontWeight: 'bold'}}>
                      {Math.ceil((this.props.usingMonth))} M {Math.ceil((this.props.usingDay))} D
                    </Text>
                  </View> :
                  <View style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignSelf:'center'}}>
                    <Text style={{ color: '#59e3f5', fontSize: 35, textAlign: 'center', fontWeight: 'bold'}}>
                      필터를 교체해 주세요
                    </Text>
                  </View>}
              </View>
              <View style={{backgroundColor: 'white', width: '100%', height: 150}}/>
            </ButtonView>
            <Modal
              isVisible={this.state.resetVisible}
              onBackdropPress={() => this.setResetVisible(!this.state.resetVisible)}
              >
              <ModalView style={{marginTop: 22}}>
                <ModalView2>
                  <ModalContainer>
                    <Text>필터 사용시간을 초기화 하시겠습니까?</Text>
                  </ModalContainer>
                    <GrayLine/>
                    <BottomButtonRowView>
                      <TouchableHighlight onPress={()=> this.filterTimeReset()} >
                        <Image source={circleIcnBlue} resizeMode='stretch' style={{height:25, width:25}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={()=> this.setResetVisible(!this.state.resetVisible)} >
                        <Image source={exitIcnRed} resizeMode='stretch' style={{height:25, width:25}}/>
                      </TouchableHighlight>
                    </BottomButtonRowView>
                </ModalView2>
              </ModalView>
            </Modal>
              <BottomButtonView>
              <NavButton
                onPress={()=> this.setResetVisible(!this.state.resetVisible)}
              >
                <TextLeftContainer>
                  <ButtonText style={{alignSelf: 'center'}}>
                    필터 사용시간 초기화
                  </ButtonText>
                </TextLeftContainer>
              </NavButton>
              <NavButton
                onPress={() => Linking.openURL(this.props.url).catch(err => console.error('An error occurred', err))}
              >
                <TextLeftContainer>
                  <ButtonText style={{alignSelf: 'center'}}>
                    필터 구매하기
                  </ButtonText>
                </TextLeftContainer>
              </NavButton>
              <NavButton
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <TextLeftContainer>
                  <ButtonText style={{alignSelf: 'center'}}>
                    필터 교체 방법
                  </ButtonText>
                </TextLeftContainer>
              </NavButton>
                <Modal
                  isVisible={this.state.modalVisible}
                  onBackdropPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <ModalView style={{marginTop: 22}}>
                    <ModalView2>
                      <ModalContainer>
                        <Text>필터 사용시간을 초기화 하시겠습니까?</Text>
                      </ModalContainer>
                      <GrayLine/>
                      <BottomButtonRowView>
                        <TouchableHighlight onPress={()=> this.filterTimeReset()} >
                          <Image source={circleIcnBlue} resizeMode='stretch' style={{height:25, width:25}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> this.setModalVisible(!this.state.modalVisible)} >
                          <Image source={exitIcnRed} resizeMode='stretch' style={{height:25, width:25}}/>
                        </TouchableHighlight>
                      </BottomButtonRowView>
                    </ModalView2>
                  </ModalView>
                </Modal>
              </BottomButtonView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  };
      }

export default FilterView;
