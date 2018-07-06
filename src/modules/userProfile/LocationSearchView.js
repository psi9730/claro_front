import { connect } from 'react-redux';
import React, { Component } from 'react';

import {Button, Image, Keyboard, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import toast from '../../utils/toast';
import easi6Logo from '../../assets/images/easi_6.png';
import searchIcn from '../../assets/images/searchIcn.png';
import locationIcnGray from '../../assets/images/locationIcnGray.png';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import {SERIAL_NUMBER_SCREEN, SERIAL_NUMBER_SOLUTION_SCREEN} from '../../../screens';
import {PASSWORD_EDIT_SCREEN,USER_PROFILE_SCREEN} from '../../../screens';
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
  name: string,
  login: string,
  password: string,
  phoneNumber: string,
  homeNumber: string,
  email: string,
  location: string,
  postcode: string,
  detailLocation: string,
  devices: any,
  updatePasswordRequest: Function,
  getLociationRequest: Function,
  locations: any,
};

type State = {
  secure: boolean,
};

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
  margin-bottom: 20px;
  margin-top:3px;
  
`;
const PostText = styled.Text`
  font-size: 15px;
  color: black;
  margin-bottom: 8px;
  margin-top:8px;
  align-self: center;
`
const GrayLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
`;
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 20px;
  padding-bottom: 5px;
`;

const ContentTextInput = styled.TextInput`
 padding-right:10px;
 flex:1;
 border-bottom-width:1px;
`
const RemoteContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

const TextLeftView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
`;
class LocationSearchView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      error: false,
      search: "",
      isSearch: false,
    };
  }
  props: Props;
  componentWillMount() {
  }

  search(){
    this.props.getLocationRequest(this.state.search).catch();
  }
  setLocation(){
  }
  render() {
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={LocationSearchView.dismissKeyboard}
        >
          <Container>
            <View><TitleText style={{color:'black',fontSize: 25, fontWeight:'bold'}} >
              주소찾기
            </TitleText></View>
            <RemoteContainer><ContentTextInput value={this.state.search} editable={true}/>
                <TouchableOpacity onPress={() => this.search(this.state.search)} style={{flexGrow:0, flexShrink:0, flexBasis:'auto', borderBottom: 1}}>
                  <Image source={searchIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch'
                  }}/>
                </TouchableOpacity>
            </RemoteContainer>
            { this.state.isSearch===false ?(<View>
            <IntroduceText style={{fontWeight: 'bold'}}>
              {'도로명, 건물명 또는 지번 중 편한 방법으로\n검색하세요.'}
            </IntroduceText>
            <IntroduceText>
              {'\n예) 건물명 : 예림빌딩 \n  도로명 : 가산로 129 \n  지역번 : 가산동 144-3'}
            </IntroduceText></View>): (
              <View>
                <GrayLine/>
                <PostText style={{alignSelf: 'center', color:'gray'}}> 주소 검색 결과 {_.size(this.props.locations)} 건 </PostText>
                {_.map(this.props.locations, (location, index) => {
                  return (
                    <TouchableOpacity  onPress={() => this.setLocation()}>
                      <View key={index} style={{flex: 1}}>
                        <GrayText style={{marginLeft: 20}}> 등록제품 {index + 1} </GrayText>
                        <RemoteContainer>
                          <TextLeftView>
                            <Image source={locationIcnGray} style={{
                              flexGrow: 0,
                              flexShrink: 0,
                              flexBasis: 'auto',
                              height: 20,
                              width: 20,
                              resizeMode: 'stretch',
                              alignSelf: 'center'
                            }}/>
                          </TextLeftView>
                          <TextLeftView>
                            <RemoteText
                              style={{
                                color: 'black',
                                fontWeight: 'bold'
                              }}>{location.nickname} ({location.deviceInfo.modelName})
                            </RemoteText>
                            <RemoteText>
                              {location.detail}
                            </RemoteText>
                          </TextLeftView>
                        </RemoteContainer>
                        <GrayLine/>
                      </View>
                    </TouchableOpacity>
                  )
                  }
                  )
                }
                </View>
            )}
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  LocationSearchView;