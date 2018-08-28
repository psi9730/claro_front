// @flow

import React, {Component} from 'react';
import {Button,  Linking, WebView, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import Claro6Theme from '../../utils/ClaroTheme';
import Modal from 'react-native-modal';
import circleIcnBlue from '../../assets/images/circleIcnBlue.png';
import exitIcnRed from '../../assets/images/exitIcnRed.png';
type Props = {
  t: Function,
  me: ?{
    name: string,
  },
  goToRegisterDevice: Function,
  goToRemote: Function,
  goToSetting: Function,
  goToFilter: Function,
  logout: () => void,
};
const FunctionContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const Container = styled.KeyboardAvoidingView`
  flex:1;
  height:100%;
  padding:28px;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(251, 251, 251, 1);
`;
const GrayText = styled.Text`
  font-size: 15px;
  color: rgba(137, 137, 137, 1);
  margin-top:20px;
  margin-bottom:20px;
`;
const MenuText = styled.Text`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;
const RowText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;
const GrayLine = styled.View`
  height: 2px;
  background-color: rgba(233, 233, 233,1);
  align-self:stretch;
`;
const RowContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    marginBottom:15px;
    marginRight:0px;
`;
const TextRightView = styled.View`
    flex-grow:1;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
`;
const TextLeftView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
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
const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: 46px;
  width: 100%;
  margin-bottom: 5px;
  background-color: #00CC39;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TextCenterContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
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
const BottomButtonRowView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: space-around;
    align-items: center;
`;
class DrawerView extends Component<Props> {
  constructor(props: Object) {
    super(props);
    autoBind(this);
    this.state={
      nickname: '',
      modelName: '',
      modalVisible: false,
    }
  }
  componentWillMount(){
  }
  Logout(){
    this.setState({modalVisible: false})
    this.props.logout();
  }

  render() {
    return (
      <ThemeProvider theme={Claro6Theme}>
        <TouchableWithoutFeedback
          onPress={this.props.hideDrawerView}
        >
        <Container>
          <FunctionContainer>
            <GrayText>Main</GrayText>
            <TouchableOpacity onPress={() => this.props.goToRemote()}>
              <MenuText>
                제품제어
              </MenuText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.goToAirStatus()}>
              <MenuText>
                공기질 관리
              </MenuText>
            </TouchableOpacity>
            <GrayLine/>
          </FunctionContainer>
          <FunctionContainer>
            <GrayText>My CLARO</GrayText>
              <TouchableOpacity onPress={() => this.props.goToChoiceDevice()}>
                <RowContainer>
                  <TextLeftView>
                    <RowText>
                      제품 관리
                    </RowText>
                  </TextLeftView>
                  <TextRightView>
                    {this.props.nickname ?
                    <RowText style={{color: '#2dc3e8', fontSize:15}}>
                    {this.props.nickname}  ({this.props.deviceInfo.modelName})
                    </RowText> : null}
                  </TextRightView>
                </RowContainer>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.goToFilter()}>
              <MenuText>
                필터관리
              </MenuText>
            </TouchableOpacity>
            <GrayLine/>
          </FunctionContainer>
          <FunctionContainer>
            <GrayText>내 정보</GrayText>
            <TouchableOpacity onPress={() => this.props.goToUserProfile()}>
              <MenuText>
                내 정보 관리
              </MenuText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
              <MenuText>
                로그아웃
              </MenuText>
            </TouchableOpacity>
            <Modal
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setState({modalVisible: false})}
            >
              <ModalView style={{marginTop: 22}}>
                <ModalView2>
                  <ModalContainer>
                    <Text>{'로그아웃 하시겠습니까?'}</Text>
                  </ModalContainer>
                  <GrayLine/>
                  <BottomButtonRowView>
                    <TouchableHighlight onPress={()=> this.Logout()} >
                      <Image source={circleIcnBlue} resizeMode='stretch' style={{height:25, width:25}}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.setState({modalVisible: false})} >
                      <Image source={exitIcnRed} resizeMode='stretch' style={{height:25, width:25}}/>
                    </TouchableHighlight>
                  </BottomButtonRowView>
                </ModalView2>
              </ModalView>
            </Modal>
            <TouchableOpacity onPress={() => this.props.goToSetting()}>
              <MenuText>
                설정
              </MenuText>
            </TouchableOpacity>
            </FunctionContainer>
          <BottomButtonView>
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
              onPress={() => Linking.openURL("http://www.google.com").catch(err => console.error('An error occurred', err))}
            >
              <TextCenterContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  홈페이지
                </ButtonText>
              </TextCenterContainer>
            </NavButton>
          </BottomButtonView>
        </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default DrawerView;
