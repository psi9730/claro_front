// @flow
import React, {Component} from 'react';
import {Button, Image, Keyboard, StyleSheet, findNodeHandle, Text, TextInput, ScrollView, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import { CheckBox } from 'react-native-elements'
import {LOGIN_SCREEN, LOCATION_SEARCH_SCREEN} from '../../../screens';
import * as EmailValidator from 'email-validator';
type State = {
  username: string,
  password: string,
};

type Props = {
  t: Function,
  loading: boolean,
  facebookSignupRequest: Function,
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

class FacebookSignupView extends Component<Props, State> {
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
  onChangeLocation(jibunAddr, roadAddr, postcode){
    this.setState({
      jibunAddr, roadAddr, postcode
    })
  }
  onGetPostCodePressed(){
    this.props.navigator.push({...LOCATION_SEARCH_SCREEN,  passProps: {onChangeLocation: this.onChangeLocation}});
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
      this.setState({emailError: message})
    else if(message.search("은 이미 사용 중인 로그인입니다."))
      this.setState({usernameError: message})

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
    if (this.state.phoneNumber.length<10){
      this.setState({phoneNumberError: this.props.t('phone_length_short')})
    } else if (this.state.postcode.length<1){
      this.setState({postcodeError: this.props.t('enter_your_postcode')})
    } else if (this.state.homeNumber.length<8){
      this.setState({homeNumberError: this.props.t('home_length_short')})
    } else {
      Keyboard.dismiss();
      this.props.facebookSignupRequest(this.props.id, this.props.token, this.props.name, this.props.email,this.state.phoneNumber,this.state.homeNumber, this.state.postcode, this.state.roadAddr,
        this.state.jibunAddr,this.state.detailLocation).then(()=>this.props.navigator.resetTo({...LOGIN_SCREEN})).catch((e)=>this.parseError(e));
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
          <LoginText style={{margin:5}}>
            이름
          </LoginText>
          <TextsInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={this.onChangeName}
            value={this.props.name}
            autoCapitalize='none'
            editable={false}
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
            editable={false}
            onChangeText={this.onChangeEmail}
            value={this.props.email}
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

export default FacebookSignupView;
