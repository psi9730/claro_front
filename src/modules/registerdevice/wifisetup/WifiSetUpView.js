import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Button, Image, Keyboard, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../../utils/ClaroTheme';
import toast from '../../../utils/toast';
import {NICKNAME_SCREEN,WIFI_SOLUTION_SCREEN} from '../../../../screens';
type Props = {
    ssid: ?string,
    password: ?string,
    ip: ?string,
    sendWifiInfoRequest: Function,
    updateWifiSsid: Function,
    updateWifiPassword: Function,
    restoreWifiInfo: Function,
    navigator: ?Function,
    sendApRequest: Function,
};

type State = {

};
const TextsBoxInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  border-bottom-width: 2px;
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom-color: black;
`;
const TitleText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;
`;
const IntroduceText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: black;
  margin-bottom: 5px;
  margin-top:3px;
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
const TextCenterContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 30px;
  padding-bottom: 5px;
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

class WifiSetUpView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isError: false,
    };
  }
  props: Props;
  showToastForResponse() {
    toast("wifi 등록완료");
  }

  sendWifi() {
    if (this.props.ssid == null || this.props.ssid === '') {
      this.setState({isError:true});
      return;
    }
    if (this.props.password == null || this.props.password === '') {
      this.setState({isError:true});
      return;
    }
    Keyboard.dismiss();
    this.props.sendWifiInfoRequest(
      this.props.ssid,
      this.props.password,
      this.props.barcode,
    ).then(()=> {
      (
        async () => {
          this.setState({isError:false});
          this.props.navigator.push({
            ...NICKNAME_SCREEN,
          });
        })();}).catch((e)=>this.setState({isError:true}));
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={WifiSetUpView.dismissKeyboard}
        >
        <Container>
          {!this.state.isError ? (<TitleText style = {{fontSize: 25, color: 'black', fontWeight:'bold'}}>
            {'연결할 인터넷 공유기의 SSID와 P/W를 입력해주세요.'}
          </TitleText>) : (<View><TitleText style={{color:'red',fontSize: 25, fontWeight:'bold', marginBottom:8}}>
            연결이 완료되지 않았습니다.
            </TitleText>
            <TitleText style={{marginTop: 4, fontSize: 25, color: 'black', fontWeight:'bold'}}> SSID와 P/W를 다시 입력 해주세요.</TitleText></View>)
          }

          <IntroduceText style={  {textDecorationLine:'underline', marginBottom:30,  flexGrow:0, color:'black',alignSelf: 'flex-start',
            flexShrink:0,
            flexBasis: 'auto'}} onPress={()=>this.props.navigator.push({
            ...WIFI_SOLUTION_SCREEN
          })} >
            SSID, P/W 확인방법
          </IntroduceText>
          <IntroduceText/>
          <IntroduceText style={{color: 'gray'}}>
            SSID
          </IntroduceText>
          <TextsBoxInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={(ssid)=>this.props.updateWifiSsid(ssid)}
            value={this.props.ssid}
            autoCapitalize='none'
            style={{marginBottom: 25, fontSize: 18}}
            blurOnSubmit={true}
          />
          <IntroduceText style={{color: 'gray'}}>
            P/W
          </IntroduceText>
          <TextsBoxInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={(password)=>this.props.updateWifiPassword(password)}
            value={this.props.password}
            autoCapitalize='none'
            style={{marginBottom: 25, fontSize: 18}}
            blurOnSubmit={true}
          />
          <BottomButtonView>
          <NavButton
            style={{backgroundColor: 'white',borderWidth: 1 ,marginBottom:15}}
            onPress={()=> this.sendWifi()}
          >
            <TextCenterContainer>
              <ButtonText style={{alignSelf: 'center', color:'black'}}>
                연결
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

export default  WifiSetUpView;
