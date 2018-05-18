/* @flow */

import React, { Component } from 'react';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer'
import {Modal,
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,
  TouchableWithoutFeedback, Linking, WebView, TouchableHighlight
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import * as Progress from 'react-native-progress';
import Plus from '../../assets/images/plus.png'
import {REMOTE_DETAIL_SCREEN} from '../../../screens';
type Props = {
  filterMaxTime: number,
  filterUsingTime: number,
  url: string,
  filterTimeReset: Function,
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

const NavView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 60px;
`;
const GrayLineContainer = styled.View`
    display:flex;
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 25px;
    height: 25px;
    flex-direction: row;
    justify-content:center;
    align-items:center;
`;
const GrayLine = styled.View`
    flex-grow:5;
    flex-shrink:1;
    flex-basis: auto;
    height: 4px; 
    background-color: gray;
`;

const IconView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 30px;
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
const FilterText = styled.Text`
  font-size: 15px;
  color: #909090;
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setResetVisible(visible){
    console.log(visible,"resetVisible");
    this.setState({resetVisible: visible})
  }

  filterTimeReset(){
    this.props.filterTimeReset();
    this.setResetVisible(!this.state.resetVisible)
  }
  componentWillReceiveProps(){
    this.setState({progress: 0},()=>
      setTimeout((function() {
        this.setState({ progress: this.state.progress + this.props.filterUsingTime})
      }).bind(this), 1000))
  }
  componentWillMount(){
    this.setState({progress: 0},()=>
    setTimeout((function() {
      this.setState({ progress: this.state.progress + this.props.filterUsingTime})
    }).bind(this), 1000))
  }
  goToRemoteView(){
    console.log("Plus Button is pressed");
    this.props.navigator.push({
      ...REMOTE_DETAIL_SCREEN,
    });
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
            <ButtonView>
            <Progress.Circle size={100} progress={ this.state.progress/this.props.filterMaxTime} showsText={true} formatText={(progress) => {const progress1= Math.ceil(100*progress); return (`${progress1}%`)}}/>
            <Button
              title={'필터 사용시간 초기화'}
              style={{ marginBottom: 20 }}
              light
              onPress={() => this.setResetVisible(!this.state.resetVisible)}
              color={ClaroTheme.mainColor}
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.resetVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text>필터 사용시간을 초기화 하시겠습니까?</Text>
                  <Button title={'OK'}  style={{ marginBottom: 20 }}
                          light
                          onPress={() => this.filterTimeReset()}/>
                  <Button title={'NO'}  style={{ marginBottom: 20 }}
                          light
                          onPress={() => this.setResetVisible(!this.state.resetVisible)}/>
                  <TouchableHighlight
                    onPress={() => {
                      this.setResetVisible(!this.state.resetVisible);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <Button
              title={'필터 구매하기'}
              onPress={() => Linking.openURL(this.props.url).catch(err => console.error('An error occurred', err))}
              color={ClaroTheme.mainColor} />
            <Button
              title={'필터 교체 방법'}
              style={{ marginTop: 20 }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}
              color={ClaroTheme.mainColor}
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text>this is way to change filter</Text>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      console.log(this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            </ButtonView>
            <GrayLineContainer>
              <GrayLine/>
              <IconView>
              <TouchableHighlight
                onPress={()=> this.goToRemoteView()}>
                <Image
                  style={{width: 30, height: 30}}
                  source={Plus}
                />
              </TouchableHighlight>
              </IconView>
              <GrayLine/>
            </GrayLineContainer>
            <NavView>
            <RemoteBarView />
            </NavView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  };
      }

export default FilterView;