// @flow
import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, findNodeHandle, Text, TextInput, ScrollView, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import toast from '../../utils/toast';
import { CheckBox } from 'react-native-elements'
import {LOGIN_SCREEN, LOCATION_SEARCH_SCREEN, USER_PROFILE_SCREEN} from '../../../screens';
import * as EmailValidator from 'email-validator';
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
  margin-bottom: 8px;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 5px;
  padding-bottom: 4px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const LoginText = styled.Text`
  align-self: flex-start;
  font-size: 15px;
  color: gray;
  margin-bottom: 5px;
  margin-top:5px;
  
`;
const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
const ErrorText = styled.Text`
  align-self: flex-start;
  color: red;
`
const NavButton = styled.TouchableOpacity`
  flex-grow:0;
  flex-shrink:0;
  flex-basis: auto;
  height: 40px;
  width: 100%;
  margin-bottom: 5px;
  background-color: #00CC39;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const PostButton = styled.TouchableOpacity`
  flex-grow:1;
  flex-shrink:1;
  flex-basis: auto;
  margin: 5px
  background-color: #00CC39;
  display:flex;
  justify-content: center;
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
const TextsInput = styled.TextInput`
  width: 100%;
  margin-bottom: 8px;
  font-size: 20px;
  padding-left:5px;
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
  padding: 30px;
  padding-bottom: 35px;
  
`;
const TextCenterContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: center;
    align-items: center;
`;

const ButtonLeftContainer = styled.View`
    flex-grow:3;
    flex-shrink:3;
    flex-basis: 0;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-self: stretch;
`;
const TextRightContainer = styled.View`
    flex-grow:7;
    flex-shrink:7;
    flex-basis: 0;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;
const TextAndButtonView = styled.View`
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

class ClaroSignupView extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };
  constructor(props) {
    console.log("constructor");
    super(props);
    autoBind(this);
    this.state={
      checked: false,
      password:"",
      username:"",
      email:"",
      checkedId: 0,
      passwordCheck:"",
      postcode:"",
      roadAddr:"",
      jibunAddr:"",
      detailLocation:"",
      phoneNumber:"",
      usernameError: null,
      passwordError: null,
      homeNumberError: null,
      phoneNumberError: null,
      postcodeError: null,
      nameError: null,
    }
  }

  componentDidMount() {

  }

  onChangeUsername(username) {
    this.setState({username});
  }

  onChangePassword(password) {
    this.setState({password});
  }
  onChangePasswordCheck(passwordCheck){
    this.setState({passwordCheck});
  }
  onChangeName(name){
    this.setState({name});
  }
  onChangeEmail(email){
    this.setState({email});
  }
  onChangePhoneNumber(phoneNumber){
    this.setState({phoneNumber});
  }
  onChangePostcode(postcode){
    this.setState({postcode})
  }
  onChangeRoadAddr(roadAddr){
    this.setState({roadAddr})
  }
  onChangeJibunAddr(jibunAddr){
    this.setState({jibunAddr})
  }
  onChangeDetailLocation(detailLocation){
    this.setState({detailLocation});
  }
  onChangeHomeNumber(homeNumber){
    this.setState({homeNumber});
  }


  _focusNextField(nextField) {
  //    this.refs[nextField].focus()
  }
  handleAddress= (data) =>{
    var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
    var extraRoadAddr = ''; // 도로명 조합형 주소 변수
    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
      extraRoadAddr += data.bname;
    }
    // 건물명이 있고, 공동주택일 경우 추가한다.
    if(data.buildingName !== '' && data.apartment === 'Y'){
      extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
    }
    // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    if(extraRoadAddr !== ''){
      extraRoadAddr = ' (' + extraRoadAddr + ')';
    }
    // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
    if(fullRoadAddr !== ''){
      fullRoadAddr += extraRoadAddr;
    }

    this.setState({postcode: data.zonecode})
    this.setState({roadAddress: fullRoadAddr})
    this.setState({jibunAddress: data.jibunAddress});
  }
  onCheckedId(e){
    this.props.checkIdRequest(e.target.value);
  }
  onChangeLocation(jibunAddr, roadAddr, postcode){
    this.setState({
      jibunAddr, roadAddr, postcode
    })
  }
  onGetPostCodePressed(){
    this.props.navigator.push({...LOCATION_SEARCH_SCREEN,  passProps: {onChangeLocation: this.onChangeLocation}});
  }
  parseSignupError(e){

  }
  parseError(e){
    const message = e.message;
    this.setState({
      usernameError: null,
      passwordError: null,
      homeNumberError: null,
      phoneNumberError: null,
      postcodeError: null,
      nameError: null,
    })
    if(message.search("은 이미 사용 중인 이메일 주소입니다"))
      this.setState({usernameError: message})
    else if(message.search("은 이미 사용 중인 로그인입니다."))
      this.setState({passwordError: message})

  }
  onSignupPressed() {
    this.setState({
      usernameError: null,
      passwordError: null,
      homeNumberError: null,
      phoneNumberError: null,
      postcodeError: null,
      nameError: null,
    })
    console.log(EmailValidator.validate(this.state.email),"validate");
    if(!this.state.username){
      this.setState({usernameError: this.props.t('enter_your_id')})
    } else if(!this.state.password){
    //  this.refs.password.focus();
      this.setState({passwordError: this.props.t('enter_your_password')})
    } else if(this.state.passwordCheck!==this.state.password){
      this.setState({passwordError: this.props.t('password_different')})
    } else if(this.state.username.length<7){
      this.setState({usernameError: this.props.t('id_length_short')})
    } else if(this.state.password.length<8) {
      this.setState({passwordError: this.props.t('password_length_short')})
    } else if (this.state.email.length<3 || !EmailValidator.validate(this.state.email)) {
      this.setState({emailError: this.props.t('check_email_form')})
    } else if (this.state.phoneNumber.length<10){
      this.setState({phoneNumberError: this.props.t('phone_length_short')})
    } else if (this.state.postcode.length<1){
      this.setState({postcodeError: this.props.t('enter_your_postcode')})
    } else if(this.state.name.length<7){
      this.setState({nameError: this.props.t('name_length_short')})
    } else if (this.state.homeNumber.length<8){
      this.setState({homeNumberError: this.props.t('home_length_short')})
    } else {
      Keyboard.dismiss();
      this.props.claroSignupRequest(this.state.username, this.state.password,this.state.name, this.state.email,this.state.phoneNumber,this.state.homeNumber, this.state.postcode, this.state.roadAddr,
        this.state.jibunAddr,this.state.detailLocation).then(()=>this.props.navigator.push({...LOGIN_SCREEN})).catch((e)=>this.parseError(e));
    }
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{paddingBottom:30, flexGrow: 1}} >
          <Container >
            <LoginText style={{fontSize: 20, marginBottom: 15, color: 'black', fontWeight:'bold'}}>
              정보입력
            </LoginText>
            <LoginText style={{margin:5 }}>
              아이디
            </LoginText>
            <UsernameInput style={{backgroundColor:'white'}}
              onChangeText={this.onChangeUsername}
              autoFocus={true}
              value={this.state.username} autoCapitalize='none'
              blurOnSubmit={false}
              ref={username => this.username = username}
              onSubmitEditing={() => {  this._focusNextField('password') }}
            />
            <ErrorText>
              {this.state.usernameError}
            </ErrorText>
            {
               this.state.checkedId===0  ?  null  :
              <LoginText style={{color: 'green', margin: 5}}>
                사용가능한 아이디입니다.
              </LoginText>
            }
            <LoginText style={{margin:5}}>
              비밀번호
            </LoginText>
            <PasswordInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangePassword}
              value={this.state.password}
              autoCapitalize='none'
              secureTextEntry
              style={{marginBottom: 5}}
              blurOnSubmit={false}
              ref={password=> this.password = password}
              onSubmitEditing={() => { this.focusTextInput(this.refs.password)}}
            />
            <ErrorText>
              {this.state.passwordError}
            </ErrorText>
            <LoginText style={{margin:5}}>
              비밀번호 확인
            </LoginText>
            <TextsInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangePasswordCheck}
              value={this.state.passwordCheck}
              autoCapitalize='none'
              secureTextEntry
              style={{marginBottom: 5}}
              blurOnSubmit={false}
              ref={(input) => { this.passwordCheck = input; }}
              onSubmitEditing={() => {this.focusTextInput(this.refs.passwordCheck) }}
            />
            <LoginText style={{margin:5}}>
              이름
            </LoginText>
            <TextsInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangeName}
              value={this.state.name}
              autoCapitalize='none'
              style={{marginBottom: 5}}
              blurOnSubmit={false}
              ref={(input) => { this.name = input; }}
              onSubmitEditing={() => { this.focusTextInput(this.refs.name)}}
            />
            <ErrorText>
              {this.state.nameError}
            </ErrorText>
            <LoginText style={{margin:5}}>
              이메일
            </LoginText>
            <TextsInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangeEmail}
              value={this.state.email}
              autoCapitalize='none'
              style={{marginBottom: 5}}
              blurOnSubmit={true}
              ref={(input) => { this.email = input; }}
            />
            <ErrorText>
              {this.state.emailError}
            </ErrorText>
            <CheckBox
              title='정보/이벤트 메일 수신에 동의합니다.'
              containerStyle={{backgroundColor: 'white', width: '100%',borderColor:'white' }}
              checked={this.state.checked}
              uncheckedColor='black'
              checkedColor='black'
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <LoginText style={{margin:5}}>
              휴대번호
            </LoginText>
            <TextsInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangePhoneNumber}
              value={this.state.phoneNumber}
              autoCapitalize='none'
              style={{marginBottom: 5}}
              blurOnSubmit={true}
              ref={(input) => { this.phoneNumber = input; }}
            />
            <ErrorText>
              {this.state.phoneNumberError}
            </ErrorText>
            <CheckBox
              title='정보/이벤트 메일 수신에 동의합니다.'
              containerStyle={{backgroundColor: 'white', width: '100%',borderColor:'white' }}
              checked={this.state.checked2}
              uncheckedColor='black'
              checkedColor='black'
              onPress={() => this.setState({checked2: !this.state.checked2})}
            />
            <LoginText style={{margin:5}}>
              전화번호
            </LoginText>
            <TextsInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangeHomeNumber}
              value={this.state.homeNumber}
              autoCapitalize='none'
              style={{marginBottom: 5}}
              blurOnSubmit={true}
              ref={(input) => { this.homeNumber = input; }}
            />
            <ErrorText>
              {this.state.homeNumberError}
            </ErrorText>
            <LoginText style={{margin:5}}>
              우편주소
            </LoginText>
            <TextAndButtonView >
              <TextRightContainer>
                <TextsInput
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  onChangeText={this.onChangePostcode}
                  value={this.state.postcode}
                  editable={false}
                  autoCapitalize='none'
                  style={{marginBottom: 5, flex:1}}
                  ref={(input) => { this.postcode = input; }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => { this.focusTextInput(this.refs.roadAddr) }}
                />
              </TextRightContainer>
              <ButtonLeftContainer>
                <PostButton
                  style={{backgroundColor: 'gray'}}
                  onPress={()=> this.onGetPostCodePressed()}
                >
                  <ButtonText style={{alignSelf: 'center', color:'white'}}>
                    우편번호
                  </ButtonText>
                </PostButton>
              </ButtonLeftContainer>
            </TextAndButtonView>

            <LoginText style={{margin:5}}>
              도로주소
            </LoginText>
            <TextsInput
              editable={false}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangeRoadAddr}
              value={this.state.roadAddr}
              autoCapitalize='none'
              style={{marginBottom: 5}}
              ref={(input) => { this.roadAddr= input; }}
              onSubmitEditing={() => { this.focusTextInput(this.refs.jibunAddr) }}
              blurOnSubmit={false}
            />
            <LoginText style={{margin:5}}>
              지번주소
            </LoginText>
            <TextsInput
              editable={false}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangeJibunAddr}
              value={this.state.jibunAddr}
              autoCapitalize='none'
              style={{marginBottom: 5}}
              ref={(input) => { this.jibunAddr= input; }}
              blurOnSubmit={false}
              onSubmitEditing={() => { this.focusTextInput(this.refs.detailLocation)}}
            />
            <ErrorText>
              {this.state.postcodeError}
            </ErrorText>
            <LoginText style={{margin:5}}>
              상세주소
            </LoginText>
            <TextsInput
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={this.onChangeDetailLocation}
              value={this.state.detailLocation}
              autoCapitalize='none'
              ref={(input) => { this.detailLocation= input; }}
              style={{marginBottom: 30}}
            />
            <NavButton
              style={{backgroundColor: 'white',borderWidth: 1, borderColor: '#333333' }}
              onPress={()=> this.onSignupPressed()}
            >
              <TextCenterContainer>
                <ButtonText style={{alignSelf: 'center', color:'black'}}>
                  회원가입
                </ButtonText>
              </TextCenterContainer>
            </NavButton>
          </Container>
      </ScrollView>
    );
  }
}

export default ClaroSignupView;
