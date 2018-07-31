// @flow

import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import { CheckBox } from 'react-native-elements'
import naver from '../../assets/images/naver.png'
import facebook from '../../assets/images/facebook.png'
import {SERIAL_NUMBER_SCREEN, REMOTE_SCREEN} from '../../../screens';
import _ from 'lodash';
import {clearAuthenticationToken} from '../../utils/authentication';
import {KEYS} from '../../utils/ClaroStorage';
import Storage from '../../utils/ClaroStorage';
import { NaverLogin, getProfile } from 'react-native-naver-login';
import FBSDK, {LoginManager, AccessToken, LoginButton,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  facebookLoginRequest: Function,
  loading: boolean,
  onLoginPressed: (username: string, password: string) => void,
};
const UsernameInput = styled.TextInput`
  width: 100%;
  margin-bottom: 10px;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 4px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const LoginText = styled.Text`
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
  padding-left: 4px;
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
  padding: 30px;
  padding-bottom: 35px;
  
`;
const ImageContainer = styled.View`
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
const ErrorText = styled.Text`
  color: red;
  align-self: flex-start;
`;

const initials = {
  kConsumerKey: 'VN6WKGFQ3pJ0xBXRtlN9',
  kConsumerSecret: 'AHBgzH9ZkM',
  kServiceAppName: 'dooboolab',
  kServiceAppUrlScheme: 'dooboolaburlscheme', // only for iOS
};
const naverInit = {
  kConsumerKey: 'jyvqXeaVOVmV',
  kConsumerSecret: '527300A0_COq1_XV33cf',
  kServiceAppName: '네이버 아이디로 로그인하기',
  kServiceAppUrlScheme: 'thirdparty20samplegame', // only for iOS
};

class LoginView extends Component<Props, State> {
  state = {
    username: '',
    password: '',
    errorMessage: null,
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state={
      checked: true,
      errorMessage: null,
      isNaverLoggingin: false,
      theToken: 'token has not fetched'
    }
  }
  componentWillMount(){
    (async() =>  {
      await clearAuthenticationToken();
    })()
  }
  componentDidMount() {

  }

  onChangeUsername(username) {
    this.setState({username});
  }


  onChangePassword(password) {
    this.setState({password});
  }
  parseLogin(e){
    console.log(e.message,'message');
    const message = e.message;
    this.setState({errorMessage: message})
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
      const result = await this.naverLogin(initials);
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

        // 성공시 다음 페이지로 넘어간다.
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
      } else {
        console.log('no result');
      }
    } catch (err) {
      console.log('error');
      console.log(err);
    }
  }
  onLoginPressed() {
    if (!this.state.username) {
      this.setState({errorMessage: this.props.t('enter_your_id')})
    } else if (!this.state.password) {
      this.setState({errorMessage: this.props.t('enter_your_password')})
    } else {
      Keyboard.dismiss();
      console.log("login");
      this.props.loginRequest(this.state.username, this.state.password).then(() => this.props.getDevicesRequest().then(() => {
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
      }).catch(e => console.log(e))).catch(e => this.parseLogin(e));

    }
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result, 'result');
      this.setState({facebookEmail: result.email})
      this.setState({facebookName: result.name});
    }
  }

  _fbAuth(){
    LoginManager.logInWithReadPermissions(["user_friends", "public_profile", "email"]).then((result)=>{
      if(result.isCancelled){
        console.log('login was canelled');
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log('userid and token', data.userID, data.accessToken);
            this.setState({facebookId: data.userID});
            this.setState({facebookAccessToken: data.accessToken})
          }
        );
        const infoRequest = new GraphRequest(
          '/me?fields=name,email',
          null,
          this._responseInfoCallback
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    }).then(()=>{
        this.props.facebookLoginRequest(this.state.facebookId, this.state.facebookAccessToken, this.state.facebookEmail, this.state.facebookName).catch((e)=>console.log(e))
      }
    ).catch( (error)=>{
      console.log('An error occured:'+ error);
    })
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={LoginView.dismissKeyboard}
        >
          <Container>
            <LoginText style={{fontSize: 25, marginBottom: 18, backgroundColor:'white', color: 'black', fontWeight:'bold'}}>
              로그인
            </LoginText>
            <LoginText style={{margin:10 }}>
              아이디
            </LoginText>
            <UsernameInput
              autoCapitalize='none'
              underlineColorAndroid="transparent"
              onChangeText={this.onChangeUsername}
              value={this.state.username}
            />
            <LoginText style={{margin:10,backgroundColor:'white',marginBottom:20, marginTop:20}}>
              비밀번호
            </LoginText>
            <PasswordInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangePassword}
              value={this.state.password}
              autoCapitalize='none'
              onSubmitEditing={this.onLoginPressed}
              blurOnSubmit
              secureTextEntry
              style={{marginBottom: 5}}
            />
            <ErrorText>
              {this.state.errorMessage}
            </ErrorText>
            <CheckBox
              title='정보/이벤트 메일 수신에 동의합니다.'
              containerStyle={{backgroundColor: 'white', width: '100%',borderColor:'white' }}
              checked={this.state.checked}
              uncheckedColor='black'
              checkedColor='black'
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1 }}
              onPress={()=> this.onLoginPressed()}
            >
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  로그인
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              style={{backgroundColor: '#3A589B'}}
              onPress={this._fbAuth}
            >
              <ImageContainer>
                <Image source={facebook} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </ImageContainer>
              <TextLeftContainer>
                <ButtonText style={{alignSelf: 'center'}}>
                  페이스북으로 로그인
                </ButtonText>
              </TextLeftContainer>
            </NavButton>
            <NavButton
              onPress={()=> this.onNaverLogin()}
            >
              <ImageContainer>
              <Image source={naver} resizeMode='center' style={{height:30, width:30, margin:10}}/>
              </ImageContainer>
              <TextLeftContainer>
              <ButtonText style={{alignSelf: 'center'}}>
                네이버로 로그인
              </ButtonText>
              </TextLeftContainer>
            </NavButton>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }

}

export default LoginView;
