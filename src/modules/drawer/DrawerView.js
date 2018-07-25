// @flow

import React, {Component} from 'react';
import {Button,  Linking, WebView, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import Claro6Theme from '../../utils/ClaroTheme';
import Panel from './panel';
import Panel2 from './panel2';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {getAuthenticationToken} from '../../utils/authentication';
import {REMOTE_SCREEN} from '../../../screens';
type Props = {
  t: Function,
  me: ?{
    name: string,
  },
  goToRegisterDevice: Function,
  goToRemote: Function,
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
  background-color: white;
`;
const GrayText = styled.Text`
  font-size: 15px;
  color: gray;
  margin-top:20px;
  margin-bottom:20px;
`
const MenuText = styled.Text`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;
const RowText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;
const DeviceText = styled.Text`
  font-weight: bold;
  color: blue;
  margin-bottom: 8px;
`;
const GrayLine = styled.View`
  height: 1px;
  background-color: gray;
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
  flex-basis: 40px;
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
class DrawerView extends Component<Props> {
  constructor(props: Object) {
    super(props);
    autoBind(this);
    this.state={
      nickname: '',
      modelName: '',
    }
  }
  componentWillMount(){
  }

  render() {
    const {t} = this.props;
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
                    <RowText style={{color: 'blue', fontSize:15}}>
                    {this.props.nickname}  {this.props.deviceInfo.modelName}
                    </RowText>
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
            <TouchableOpacity onPress={() => this.props.logout()}>
              <MenuText>
                로그아웃
              </MenuText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.goToChoiceDevice()}>
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


/*<Menus>
            <Select defaultValue={""}
            <MenuButton
              onPress={()=>(console.log("logOut"))}
            >
              <MenuText>
                {t('menu_logout')}
              </MenuText>
            </MenuButton>
            <MenuButton
              onPress={this.props.logout}
            >
              <MenuText>
                {t('menu_logout')}
              </MenuText>
            </MenuButton>
          </Menus>
          */