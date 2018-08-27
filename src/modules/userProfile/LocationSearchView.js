import { connect } from 'react-redux';
import React, { Component } from 'react';

import {Button, Image, Keyboard, ScrollView, Toast, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import autoBind from 'react-autobind';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import searchIcn from '../../assets/images/searchIcn.png';
import locationIcnGray from '../../assets/images/locationIcnGray.png';
import _ from 'lodash'
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
 padding-left: 10px;
 flex:1;
 border-bottom-width:1px;
`
const RemoteContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const ImageView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    justify-content: center;
    align-items: center;
`
const TextLeftView = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
`;
const RemoteText = styled.Text`
`

class LocationSearchView extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      error: false,
      search: "",
      isSearch: false,
      rnAdres: "",
      lnmAdres: "",
    };
  }
  props: Props;
  componentWillMount() {
  }

  search(){
    this.props.getLocationRequest(this.state.search).then(()=>{ console.log(this.props.locations,_.nth(this.props.locations,0),'locations'); console.log(Array.isArray(this.props.locations)); if(this.props.locations) this.setState({isSearch:true})}).catch((e)=>console.log(e));
  }
  setLocation(rnAdres,lnmAdres,postcode){
    this.props.onChangeLocation(rnAdres, lnmAdres,postcode);
    this.props.navigator.pop();
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
            <RemoteContainer><ContentTextInput value={this.state.search}  onChangeText={(search)=>this.setState({search: search})} editable={true}/>
                <TouchableOpacity onPress={() => this.search(this.state.search)} style={{flexGrow:0, flexShrink:0, flexBasis:'auto', paddingRight: 4,borderBottomWidth: 1, justifyContent: 'center', paddingBottom: 12, alignItems: 'center'}}>
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
            { this.state.isSearch===false ?(<View style={{flex:1}}>
            <IntroduceText style={{fontWeight: 'bold'}}>
              {'도로명, 건물명 또는 지번 중 편한 방법으로\n검색하세요.'}
            </IntroduceText>
            <IntroduceText>
              {'\n예) 건물명 : 예림빌딩 \n  도로명 : 가산로 129 \n  지역번 : 가산동 144-3'}
            </IntroduceText></View>): (
              <View style={{flex:1, paddingBottom: 20,marginTop:20}}>
                <GrayLine/>
                <PostText style={{alignSelf: 'center', color:'gray'}}> 주소 검색 결과 {Array.isArray(this.props.locations) ? _.size(this.props.locations) : 1} 건 </PostText>
                <ScrollView style={ {flexGrow:1}}>
                {
                  Array.isArray(this.props.locations) ? (
                  _.map(this.props.locations, (location, index) => {
                  return (
                    <TouchableOpacity style={{flex:1}} key={index} onPress={() => this.setLocation(location.rnAdres.text,location.lnmAdres.text,location.zipNo.text)}>
                      <View style={{flex: 1}}>
                        <RemoteContainer>
                          <ImageView>
                            <Image source={locationIcnGray} style={{
                              marginRight: 10,
                              flexGrow: 0,
                              flexShrink: 0,
                              flexBasis: 'auto',
                              height: 20,
                              width: 20,
                              resizeMode: 'stretch',
                              alignSelf: 'center'
                            }}/>
                          </ImageView>
                          <TextLeftView>
                            <RemoteText
                              style={{
                                color: 'black',
                                fontWeight: 'bold'
                              }}>{location.rnAdres.text}
                            </RemoteText>
                            <RemoteText>
                              {location.lnmAdres.text}
                            </RemoteText>
                          </TextLeftView>
                        </RemoteContainer>
                        <GrayLine/>
                      </View>
                    </TouchableOpacity>
                  )
                  }
                  )) : (  <TouchableOpacity style={{flex:1}}  onPress={() => this.setLocation(this.props.locations.rnAdres.text,this.props.locations.lnmAdres.text,this.props.locations.zipNo.text)}>
                    <View style={{flex: 1}}>
                      <RemoteContainer>
                        <ImageView>
                          <Image source={locationIcnGray} style={{
                            marginRight: 10,
                            flexGrow: 0,
                            flexShrink: 0,
                            flexBasis: 'auto',
                            height: 20,
                            width: 20,
                            resizeMode: 'stretch',
                            alignSelf: 'center'
                          }}/>
                        </ImageView>
                        <TextLeftView>
                          <RemoteText
                            style={{
                              color: 'black',
                              fontWeight: 'bold'
                            }}>{this.props.locations.rnAdres.text}
                          </RemoteText>
                          <RemoteText>
                            {this.props.locations.lnmAdres.text}
                          </RemoteText>
                        </TextLeftView>
                      </RemoteContainer>
                      <GrayLine/>
                    </View>
                  </TouchableOpacity> )
                }
                </ScrollView>
                </View>
            )}
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  LocationSearchView;
