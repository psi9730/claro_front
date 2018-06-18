// @flow

import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import toast from '../../utils/toast';
import easi6Logo from '../../assets/images/easi_6.png';
import { CheckBox } from 'react-native-elements'
import naver from '../../assets/images/naver.png'
import facebook from '../../assets/images/facebook.png'
import {RENTAL_DETAIL_SCREEN} from '../../../screens';
import ScrollView from './scrollView';
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
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const LoginText = styled.Text`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: auto;
  align-self: flex-start;
  font-size: 15px;
  color: black;
  margin-bottom: 10px;
  margin-top:10px;
  
`;
const ButtonText = styled.Text`
  font-size: 15px;
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
const CheckBoxView = styled.View`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: auto;
  width: 100%;
  margin-bottom: 5px;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TextBoxView = styled.View`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: 40px;
  width: 100%;
  margin-bottom: 5px;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;


const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 30px;
  padding-bottom: 35px;
`;

const TextLeftContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const CheckBoxContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;

const GrayLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
`;

class AcceptSignupView extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state={
      checked1: false,
      checked2: false,
      checked3: false,
      modal1Visible: false,
      modal2Visible: false,
    }
  }

  componentDidMount() {
    /*    this.props.navigator.setDrawerEnabled({
          side: 'left',
          enabled: false,
        });
      */
  }
  onChangeCheckBox1(){      //전체체크
    if(this.state.checked1===false)
      this.setState({
        checked1: true,
        checked2: true,
        checked3: true,
      })
    else
      this.setState({
        checked1: false,
        checked2: false,
        checked3: false,
      })
  }
  onChangeCheckBox2(){      //필수이용약관동의
    this.setState({
      checked2: !this.state.checked2
    })
  }
  onChangeCheckBox3(){      //개인정보 수집 및 이용
    this.setState({
      checked3: !this.state.checked3
    })

  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const {t, loading} = this.props;

    return (
          <Container>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modal1Visible}
              onRequestClose={() => {
                this.setState({modal1Visible:false})
              }}>
              <View style={{flex:1, marginTop: 22}}>
                  <ScrollView style={ {flexGrow:1}}  text='   제 1 조(목적)
                이 약관은 이 웹사이트의 소유주인 CAMPER S.L.과 캠퍼의 한국 공식 파트너사인
                비엔에프패션엔컬쳐인터내셔날(이하 "회사"라 한다)이 운영하는 캠퍼 공식 온라인
                스토어 Camper.com/kr(이하 “몰”이라 한다)에서 제공하는 인터넷 쇼핑 서비스(이하 “서비스”라
                한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로
                합니다.
                ※「PC 통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을
                준용합니다」
                제 2 조(정의)
                ○,1 “몰”이란 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여
                컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며,
                아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
                ③ ‘회원’이라 함은 “몰”에 개인정보를 제공하여 회원등록을 한 자로서, “몰”의 정보를 지속적으로
                제공받으며, “몰”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
                제 3 조 (약관 등의 명시와 설명 및 개정)
                ○,1 “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할
                수 있는 곳의 주소를 포함), 전화번호, 모사전송번호․ 이메일 주소, 사업자등록번호,
                통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 몰의 초기
                서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록
                할 수 있습니다.
                ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
                청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의
                연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                ③ “몰”은 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률,
                전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률, 방문판매 등에 관한 법률,
                소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의
                초기화면에 그 적용일자 7 일이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게
                약관내용을 변경하는 경우에는 최소한 30 일 이상의 사전 유예기간을 두고 공지합니다. 이 경우
                "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                ○,5 “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만
                적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만
                이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제 4 항에 의한
                개정약관의 공지기간 내에 ‘몰“에 송신하여 ”몰“의 동의를 받은 경우에는 개정약관 조항'/>
                  <View style={{flexGrow:0, flexShrink:0, flexBasis: 20}}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setState({modal1Visible: false});
                      }}>
                      <Text style={{alignSelf: 'flex-end', fontWeight:'bold',textDecorationLine:'underline'}} >전문을 모두 읽었습니다.</Text>
                    </TouchableHighlight>
                  </View>
                </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modal2Visible}
              onRequestClose={() => {
                this.setState({modal1Visible:false})
              }}>
              <View style={{flex:1, marginTop: 22}}>
                <ScrollView style={ {flex:1}}  text='   제 1 조(목적)
                이 약관은 이 웹사이트의 소유주인 CAMPER S.L.과 캠퍼의 한국 공식 파트너사인
                비엔에프패션엔컬쳐인터내셔날(이하 "회사"라 한다)이 운영하는 캠퍼 공식 온라인
                스토어 Camper.com/kr(이하 “몰”이라 한다)에서 제공하는 인터넷 쇼핑 서비스(이하 “서비스”라
                한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로
                합니다.
                ※「PC 통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을
                준용합니다」
                제 2 조(정의)
                ○,1 “몰”이란 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여
                컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며,
                아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
                ③ ‘회원’이라 함은 “몰”에 개인정보를 제공하여 회원등록을 한 자로서, “몰”의 정보를 지속적으로
                제공받으며, “몰”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
                제 3 조 (약관 등의 명시와 설명 및 개정)
                ○,1 “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할
                수 있는 곳의 주소를 포함), 전화번호, 모사전송번호․ 이메일 주소, 사업자등록번호,
                통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 몰의 초기
                서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록
                할 수 있습니다.
                ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
                청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의
                연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                ③ “몰”은 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률,
                전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률, 방문판매 등에 관한 법률,
                소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의
                초기화면에 그 적용일자 7 일이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게
                약관내용을 변경하는 경우에는 최소한 30 일 이상의 사전 유예기간을 두고 공지합니다. 이 경우
                "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                ○,5 “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만
                적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만
                이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제 4 항에 의한
                개정약관의 공지기간 내에 ‘몰“에 송신하여 ”몰“의 동의를 받은 경우에는 개정약관 조항
                '/>
                <View style={{flexGrow:0, flexShrink:0, flexBasis: 20,marginRight:5}}>
                  <TouchableHighlight
                    onPress={() => {
                          this.setState({modal2Visible: false});
                    }}>
                    <Text style={{alignSelf: 'flex-end', fontWeight:'bold',textDecorationLine:'underline'}} >전문을 모두 읽었습니다.</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <LoginText style={{fontSize: 25, color: 'black', fontWeight:'bold'}}>
              약관동의
            </LoginText>
            <CheckBox
              title='클라로의 모든 약관을 확인하고 전체 동의합니다'
              containerStyle={{backgroundColor: 'white', flex:0, width: '100%',borderColor:'white' }}
              checked={this.state.checked1}
              uncheckedColor='black'
              checkedColor='black'
              onPress={()=>this.onChangeCheckBox1()}
            />
            <GrayLine/>
            <CheckBoxView
            >
              <CheckBoxContainer>
                <CheckBox
                  title='(필수) 이용약관 동의'
                  containerStyle={{backgroundColor: 'white', width: '100%',borderColor:'white' }}
                  checked={this.state.checked2}
                  uncheckedColor='black'
                  checkedColor='black'
                  onPress={()=>this.onChangeCheckBox2()}
                />
              </CheckBoxContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'flex-end', textDecorationLine:'underline'}} onPress={()=>this.setState({modal1Visible:true})}>
                  전체보기
                </ButtonText>
              </TextLeftContainer>
            </CheckBoxView>
            <View style={{flex:1}}>
           <ScrollView style={ {flexGrow:1}}  text='   제 1 조(목적)
                이 약관은 이 웹사이트의 소유주인 CAMPER S.L.과 캠퍼의 한국 공식 파트너사인
                비엔에프패션엔컬쳐인터내셔날(이하 "회사"라 한다)이 운영하는 캠퍼 공식 온라인
                스토어 Camper.com/kr(이하 “몰”이라 한다)에서 제공하는 인터넷 쇼핑 서비스(이하 “서비스”라
                한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로
                합니다.
                ※「PC 통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을
                준용합니다」
                제 2 조(정의)
                ○,1 “몰”이란 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여
                컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며,
                아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
                ③ ‘회원’이라 함은 “몰”에 개인정보를 제공하여 회원등록을 한 자로서, “몰”의 정보를 지속적으로
                제공받으며, “몰”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
                제 3 조 (약관 등의 명시와 설명 및 개정)
                ○,1 “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할
                수 있는 곳의 주소를 포함), 전화번호, 모사전송번호․ 이메일 주소, 사업자등록번호,
                통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 몰의 초기
                서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록
                할 수 있습니다.
                ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
                청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의
                연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                ③ “몰”은 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률,
                전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률, 방문판매 등에 관한 법률,
                소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의
                초기화면에 그 적용일자 7 일이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게
                약관내용을 변경하는 경우에는 최소한 30 일 이상의 사전 유예기간을 두고 공지합니다. 이 경우
                "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                ○,5 “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만
                적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만
                이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제 4 항에 의한
                개정약관의 공지기간 내에 ‘몰“에 송신하여 ”몰“의 동의를 받은 경우에는 개정약관 조항'/>
            </View>
            <CheckBoxView
            >
              <CheckBoxContainer>
                <CheckBox
                  title='(필수) 개인정보 수집 및 이용'
                  containerStyle={{backgroundColor: 'white', width: '100%',borderColor:'white' }}
                  checked={this.state.checked3}
                  uncheckedColor='black'
                  checkedColor='black'
                  onPress={()=>this.onChangeCheckBox3()}
                />
              </CheckBoxContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'flex-end', fontWeight:'bold',textDecorationLine:'underline'}} onPress={()=>this.setState({modal2Visible:true})} >
                  전체보기
                </ButtonText>
              </TextLeftContainer>
            </CheckBoxView>
            <View style={{height:100, marginBottom:10}}>
            <ScrollView style={ {flexGrow:1}} text='   제 1 조(목적)
                이 약관은 이 웹사이트의 소유주인 CAMPER S.L.과 캠퍼의 한국 공식 파트너사인
                비엔에프패션엔컬쳐인터내셔날(이하 "회사"라 한다)이 운영하는 캠퍼 공식 온라인
                스토어 Camper.com/kr(이하 “몰”이라 한다)에서 제공하는 인터넷 쇼핑 서비스(이하 “서비스”라
                한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로
                합니다.
                ※「PC 통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을
                준용합니다」
                제 2 조(정의)
                ○,1 “몰”이란 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여
                컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며,
                아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
                ③ ‘회원’이라 함은 “몰”에 개인정보를 제공하여 회원등록을 한 자로서, “몰”의 정보를 지속적으로
                제공받으며, “몰”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
                제 3 조 (약관 등의 명시와 설명 및 개정)
                ○,1 “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할
                수 있는 곳의 주소를 포함), 전화번호, 모사전송번호․ 이메일 주소, 사업자등록번호,
                통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 몰의 초기
                서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록
                할 수 있습니다.
                ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
                청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의
                연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                ③ “몰”은 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률,
                전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률, 방문판매 등에 관한 법률,
                소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의
                초기화면에 그 적용일자 7 일이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게
                약관내용을 변경하는 경우에는 최소한 30 일 이상의 사전 유예기간을 두고 공지합니다. 이 경우
                "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                ○,5 “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만
                적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만
                이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제 4 항에 의한
                개정약관의 공지기간 내에 ‘몰“에 송신하여 ”몰“의 동의를 받은 경우에는 개정약관 조항'/>
            </View>
            <NavButton
              style={{alignSelf: 'center', backgroundColor: 'white',borderWidth: 1 }}
              onPress={()=> this.props.navigator.push({
                ...CLARO_SIGNUP_FORM_SCREEN,
              })}
            >
              <TextLeftContainer style={{flexGrow: 1, flexShrink: 1}}>
                <ButtonText style={{alignSelf: 'center'}}>
                  다음단계
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
          </Container>
    );
  }
}

export default AcceptSignupView;
