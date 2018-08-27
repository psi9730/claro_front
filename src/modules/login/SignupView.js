/* @flow */

import React, { Component } from 'react';
import {Modal,
  Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Linking, WebView, TouchableHighlight, ScrollView
} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import {
  ACCEPT_SIGNUP_SCREEN, NAVER_SIGNUP_SCREEN, LOGIN_SCREEN, REMOTE_SCREEN,
  SERIAL_NUMBER_SCREEN
} from '../../../screens';
import naver from '../../assets/images/naver.png'
import circle from '../../assets/images/white-circle.png'
import facebook from '../../assets/images/facebook.png'
import Storage, {KEYS} from '../../utils/ClaroStorage';
import { NaverLogin, getProfile } from 'react-native-naver-login';
import FBSDK, {LoginManager, AccessToken, LoginButton,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import _ from 'lodash';
type Props = {
};

type State = {
};

const LoginText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 18px;
  margin-top:18px;
  
`;
const IntroduceText = styled.Text`
  align-self: flex-start;
  font-size: 16px;
  color: gray;
  margin-bottom: 3px;
  margin-top:3px;
  
`;
const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: 46px;
  width: 100%;
  height: 46px;
  margin-bottom: 14px;
  background-color: #00CC39;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const TextContainer = styled.View`
    position: absolute;
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
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  background-color: white;
  padding: 30px;
  padding-bottom: 35px;
`;
const initials = {
  kConsumerKey: 'uamDmgf3d3J5K1GzxqTS',
  kConsumerSecret: 'mRol3D9tFd',
  kServiceAppName: 'claro',
};
const IOSinitials = {
  kConsumerKey: 'VN6WKGFQ3pJ0xBXRtlN9',
  kConsumerSecret: 'AHBgzH9ZkM',
  kServiceAppName: 'dooboolab',
  kServiceAppUrlScheme: 'dooboolaburlscheme', // only for iOS
};
class SignupView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      modal1Visible: false,
      modal2Visible: false,
    }
  }
  props: Props;
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  naverLogin = (props) => {
    return new Promise(function (resolve, reject) {
      console.log(props,'props');
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };
  getNaverProfile = async(token) => {
    let result = null;
    try {
      result = await getProfile(token);
    } catch (err) {
      console.log('err');
      console.log(err);
    }
    return result;
  }

  onNaverLogin = async() => {
    try {
      let result;
      if(Platform.OS==='ios')
        result = await this.naverLogin(IOSinitials);
      else
        result = await this.naverLogin(initials);
      console.log('token: ' + result);

      if (result) {
        console.log('yes result');
        const profileResult = await this.getNaverProfile(result);
        console.log('profile');
        console.log(profileResult);
        if (profileResult.resultcode === '024') {
          Alert.alert('로그인 실패', profileResult.message);
          return;
        }

        result.profile = profileResult;
        console.log(result, 'result');
        // 성공시 다음 페이지로 넘어간다.
        this.props.naverLoginRequest(profileResult.response.id, result).then(()=>
          {
            this.props.getDevicesRequest().then(() => {
              console.log(this.props.devices,'devices');
              if (_.size(this.props.devices) > 0) {
                (async() => {
                  await Storage.setItem(KEYS.serialNumber, _.nth(this.props.devices,0).serialNumber);
                })();
                this.props.navigator.resetTo({...REMOTE_SCREEN});
              }
              else {
                this.props.navigator.resetTo({...SERIAL_NUMBER_SCREEN})
              }
            }).catch(e => console.log(e))
          }
        ).catch((e)=> {
            const message = e.message;
            console.log(message,'message');
            if(message==="아이디가 존재하지 않습니다." || message==="timeout")
            {
              this.props.navigator.push({...ACCEPT_SIGNUP_SCREEN,  passProps: {
                  id: profileResult.response.id, name: profileResult.response.name, token: result, email:profileResult.response.email, platform: 'naver'
                },},)
            }
            else{
              this.setState({errorMessage:message})
            }
          }
        )
      } else {
        console.log('no result');
      }
    } catch (err) {
      console.log('error');
      console.log(err);
    }
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result, 'result');
      this.props.facebookLoginRequest(this.state.facebookId, this.state.facebookAccessToken).then(()=>
        {
          this.props.getDevicesRequest().then(() => {
            console.log(this.props.devices,'devices');
            if (_.size(this.props.devices) > 0) {
              (async() => {
                await Storage.setItem(KEYS.serialNumber, _.nth(this.props.devices,0).serialNumber);
              })();
              this.props.navigator.resetTo({...REMOTE_SCREEN});
            }
            else {
              this.props.navigator.resetTo({...SERIAL_NUMBER_SCREEN})
            }
          }).catch(e => console.log(e))
        }
      ).catch((e)=> {
          const message = e.message;
          console.log(message,'message');
          if(message==="아이디가 존재하지 않습니다." || message==="timeout")
          {
            this.props.navigator.push({...ACCEPT_SIGNUP_SCREEN,  passProps: {
                id: this.state.facebookId, name: result.name, token: this.state.facebookAccessToken, email: result.email, platform: 'facebook'
              },},)
          }
          else{
            this.setState({errorMessage:message})
          }
        }
      )
    }
  }

  _fbAuth(){
    LoginManager.logOut();
    console.log("go to facebook");
    if(Platform.OS==='ios')
      LoginManager.setLoginBehavior("web");
    LoginManager.logInWithReadPermissions(["user_friends", "public_profile", "email"]).then((result)=>{
      if(result.isCancelled){
        console.log('login was cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log('userid and token', data.userID, data.accessToken);
            this.setState({facebookId: data.userID});
            this.setState({facebookAccessToken: data.accessToken})
          }
        ).then(()=>{
            const infoRequest = new GraphRequest(
              '/me',
              { parameters: {
                  'fields': {
                    'string' : 'email,name,friends'
                  }
                }},
              this._responseInfoCallback,
            );
// Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        )
      }
    }).catch( (error)=>{
      console.log('An error occured:'+ error);
    })
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }
  render() {

    return (
      <ScrollView>
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={SignupView.dismissKeyboard}
        >
          <Container>
            <LoginText style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>
              회원 가입
            </LoginText>
            <IntroduceText>
              공기청정살균이 CLARO의 IoT
            </IntroduceText>
            <IntroduceText style={{marginBottom: 20}}>
              기능을 활용하기 위한 APP입니다.
            </IntroduceText>
            <IntroduceText>
              본 APP을 사용하시기 위해서는
            </IntroduceText>
            <IntroduceText>
              CLARO의 회원 가입과 제품등록 절차가
            </IntroduceText>
            <IntroduceText style={{marginBottom: 40}}>
              필요합니다.
            </IntroduceText>
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 }}
              onPress={()=> this.props.navigator.push({
                ...ACCEPT_SIGNUP_SCREEN,passProps: {
                 platform: 'claro'
                }
              })}
            >
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  회원가입
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              style={{backgroundColor: '#3A589B'}}
              onPress={this._fbAuth}
            >
              <TextContainer>
                <Image source={facebook} resizeMode='center' style={{backgroundColor: 'transparent', height:30, width:30, margin:10}}/>
              </TextContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center'}}>
                  페이스북으로 회원 가입
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              onPress={()=> this.onNaverLogin()}
            >
              <TextContainer>
                <Image source={naver} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </TextContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center'}}>
                  네이버로 회원 가입
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <View style={{  flexGrow:1,
                    flexShrink:1,
                    flexBasis: 'auto',display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
            <LoginText style={  {textDecorationLine:'underline',  fontSize:14, flexGrow:0, color:'black',alignSelf: 'center',
              flexShrink:0,
              flexBasis: 'auto'}}  onPress={()=>this.props.navigator.push({...LOGIN_SCREEN})}>
              로그인
            </LoginText>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
      </ScrollView>
    );
  };
}

export default SignupView;
