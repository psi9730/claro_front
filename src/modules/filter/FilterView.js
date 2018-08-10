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
type Props = {
  filterMaxTime: number,
  filterUsingTime: number,
  url: string,
  filterTimeResetRequest: Function,
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
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 15px;
`;

const TitleText = styled.Text`
  font-size: 21px;
  font-weight: bold;
`;

const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  border-width: 1;
  flex-basis: 40px;
  width: 100%;
  margin-bottom: 8px;
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
      usingDay: Math.ceil(this.props.filterUsingTime/720),
      usingMonth: Math.ceil(this.props.filterUsingTime/21600)
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setResetVisible(visible){
    console.log(visible,"resetVisible");
    this.setState({resetVisible: visible})
  }

  filterTimeReset(){
    this.props.filterTimeResetRequest(0,this.props.barcode).then(()=>
    this.setResetVisible(!this.state.resetVisible)).then(()=> this.forceUpdate())
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


  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={FilterView.dismissKeyboard}
        >
          <Container >
            <TopTextContainer>
              <TitleText> 필터 관리</TitleText>
            </TopTextContainer>
            <ButtonView>
              <Progress.Circle size={100} progress={ this.props.filterUsingTime/this.props.filterMaxTime} showsText={true} formatText={(progress) => { return (`${this.props.filterUsingTime}분`)}}/>
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
