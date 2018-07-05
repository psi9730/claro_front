// @flow

import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import toast from '../../utils/toast';
import {RENTAL_DETAIL_SCREEN} from '../../../screens';
type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};
const UsernameInput = styled.TextInput`
  width: 100%;
  margin-bottom: 10px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 10px;
  margin-top:10px;
  
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
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
const PasswordInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  background-color: white;
  
`;
const ImageContainer = styled.View`
    position: absolute;
`;
const TextLeftContainer = styled.View`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;

const CoverText = styled.Text`
  font-size: 24px;
  color: black;
`;

const CoverView = styled.View`
  flex-grow: 2;
  flex-direction: row;
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

class UserProfileView extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state={
      checked: false,
    }
  }

  componentDidMount() {
    this.props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: false,
    });
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const {t, loading} = this.props;

    return (
      <Container>
        <TitleText style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', padding: 30, fontSize: 25, marginBottom: 18, backgroundColor:'white', color: 'black', fontWeight:'bold'}}>
          내 정보 관리
        </TitleText>
        <View style={{flex:1, alignSelf: 'flex-start', paddingBottom:35, paddingLeft: 30, paddingRight:30, display: 'flex', flexDirection:'column',justifyContent: 'flex-start',alignItems:'flex-start'}}>
          <ScrollView style={ {flexGrow:1}} contentContainerStyle={{flexGrow: 1, display:'flex',flexDirection:'column',justifyContent: 'flex-start', alignItems:'flex-start'}}>

          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default UserProfileView;
/*<ScrollView style={ {flexGrow:1}} contentContainerStyle={{flexGrow: 1}}>
  <Text>1. -목적: 이용자 식별 및 본인여부 확인</Text>
  <Text>   -항목: 이름, 아이디, 비밀번호</Text>
  <Text>   -보유 및 이용기간 : 회원탈퇴 후 5일까지</Text>
  <Text> </Text>
  <Text>2. -목적: 민원 등 고객 고충처리</Text>
  <Text>   -항목: 이메일, 휴대전화번호</Text>
  <Text>   -보유 및 이용기간 : 회원탈퇴 후 5일까지</Text>
  <Text>3. -목적: 만 14세 미만 아동 확인</Text>
  <Text>   -항목: 법적 생년월일</Text>
  <Text>   -보유 및 이용기간 : 회원탈퇴 후 5일까지</Text>
</ScrollView>*/