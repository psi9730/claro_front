// @flow

import React, {Component} from 'react';
import {Button,  Linking, WebView, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import {Navigation} from 'react-native-navigation';
import Claro6Theme from '../../utils/ClaroTheme';
import Panel from './panel';
import Panel2 from './panel2';
import SerialNumberView from '../registerdevice/serialnumber/SerialNumberView';  // Step 1

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

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.mainBgColor};
`;
const DrawerContainer = styled.View`
  flex: 0 0 120px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`;
const Menus = styled.View`
  flex: 1;
  display: flex;
  flex-flow: column;
  border-top-color: ${props => props.theme.borderColor};
  border-top-width: 1px;
`;
const MenuButton = styled.TouchableOpacity`
  flex: 0 0 60px;
  background-color: ${props => props.theme.mainBgColor};
  justify-content: center;
  align-items: center;
  border-bottom-color: ${props => props.theme.borderColor};
  border-bottom-width: 1px;
`;
const MenuText = styled.Text`
  color: ${props => props.theme.mainColor};
  font-size: 20px;
`;

const DrawerText = styled.Text`
  margin-top: 5px;
  font-size: 18px;
`;

const SubButton = styled.TouchableOpacity`
  flex: 0 0 60px;
  background-color: ${props => props.theme.mainBgColor};
  justify-content: center;
  align-items: center;
`;
const SubText = styled.Text`
  color: ${props => props.theme.mainColor};
  font-size: 14px;
`;

class DrawerView extends Component<Props> {
  constructor(props: Object) {
    super(props);
    autoBind(this);
  }
  renderUser() {
    //const {me, t} = this.props;

    //if (!me) return null;

    return (
      <DrawerContainer>
        <DrawerText>
          Claro
        </DrawerText>
        <SubButton
          onPress={this.props.goToRemote}
        >
          <SubText>
            {this.props.t('title_profile')}
          </SubText>
        </SubButton>
      </DrawerContainer>
    );
  }

  render() {
    const {t} = this.props;
    return (
      <ThemeProvider theme={Claro6Theme}>
        <TouchableWithoutFeedback
          onPress={this.props.hideDrawerView}
        >
        <Container>
          {this.renderUser()}
          <Panel title="Main">
            <MenuButton
              onPress={this.props.goToRemote}
            >
              <MenuText>
                {t('product_control')}
              </MenuText>
            </MenuButton>
          </Panel>
          <Panel title="My Claro">
            <MenuButton
              onPress={this.props.goToRegisterDevice}
            >
              <MenuText>
                제품선택
              </MenuText>
            </MenuButton>
            <MenuButton
              onPress={this.props.goToFilter}
            >
              <MenuText>
                필터관리
              </MenuText>
            </MenuButton>
            <MenuButton
              onPress={this.props.goToRegisterDevice}
            >
              <MenuText>
                제품등록
              </MenuText>
            </MenuButton>
          </Panel>
          <Panel title="내 정보">
            <MenuButton
              onPress={this.props.goToRegisterDevice}
            >
              <MenuText>
                내 정보 관리
              </MenuText>
            </MenuButton>
            <MenuButton
              onPress={this.props.goToRegisterDevice}
            >
              <MenuText>
                LOGIN/OUT
              </MenuText>
            </MenuButton>
            <MenuButton
              onPress={this.props.goToRegisterDevice}
            >
              <MenuText>
                설정
              </MenuText>
            </MenuButton>
          </Panel>
          <Panel2 title="홈페이지">
          </Panel2>
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