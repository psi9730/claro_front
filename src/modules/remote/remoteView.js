/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View
} from 'react-native';
import autoBind from 'react-autobind';
import RemoteBarView from '../remote/remoteBar/remoteBarViewContainer';
import toast from '../../utils/toast';
import Storage, {KEYS} from '../../utils/ClaroStorage';
import { Icon } from 'react-native-elements'
import {ThemeProvider} from 'styled-components';
import ClaroTheme from '../../utils/ClaroTheme';
import Plus from '../../assets/images/plus.png'
import {REMOTE_DETAIL_SCREEN} from '../../../screens';
// import {SERIAL_NUMBER_SCREEN} from '../../../screens';
type Props = {
  restoreOutsideAirInfo: Function,
  restoreIndoorAirInfo: Function,
  togglePower_: Function,
  toggleAI_: Function,
  toggleSterilizing_: Function,
  toggleAirCleaning_: Function,
  AI: number,
  sterilizing: number,
  power: number,
  serialNumber: string,
  airCleaning: number,
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding-bottom: 5px;
`;
const TextView = styled.View`
    flex-grow:1;
    flex-shrink:2;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  padding: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;
const OutAirView = styled.View`
    flex-grow:2;
    flex-shrink:1;
    flex-basis: auto;
    padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StatusView = styled.View`
    flex-grow:1;
    flex-shrink:2;
    flex-basis: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
const FunctionContainer = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    padding: 5px;
    flex-direction: row;
    justify-content: flex-start;
`;

const TextContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
const TextLeftContainer = styled.View`
    flex-grow:1;
    flex-shrink:1;
    flex-basis: auto;
    display:flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
`;

const NavView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 45px;
`;

const RemoteText = styled.Text`
  font-size: 15px;
  color: #909090;
`;

const GrayLineContainer = styled.View`
    display:flex;
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 25px;
    height: 25px;
    flex-direction: row;
    justify-content:center;
    align-items:center;
`;
const GrayLine = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    height: 2px; 
    background-color: gray;
`;

const IconView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 30px;
`;


class RemoteView extends Component<Props, State> {
  constructor(props) {
    console.log("Constructor is implemented");
    super(props);
    autoBind(this);
  }
  state: State = {
  };

  componentWillMount() {
    this.props.navigator.setStyle({
      navBarBackgroundColor: 'steelblue',
      statusBarTextColorScheme: 'light',
      navBarNoBorder: true,
      navBarTextColor: 'white',
      statusBarColor: 'steelblue',
    });
  }
  componentWillReceiveProps(nextProps){
    this.props.navigator.setStyle({
      navBarBackgroundColor: 'steelblue',
      statusBarTextColorScheme: 'light',
      navBarNoBorder: true,
      statusBarColor: 'steelblue',
      navBarTextColor: 'white',

    });
  }
  goToRemoteView(){
    console.log("Plus Button is pressed");
    this.props.navigator.push({
      ...REMOTE_DETAIL_SCREEN,
    });
  }

  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  props: Props;

  render() {
    this.props.navigator.setStyle({
      statusBarTextColorScheme: 'light',
      navBarBackgroundColor: 'steelblue',
      statusBarTextColorSchemeSingleScreen: 'light',
      navBarNoBorder: true,
      topBarElevationShadowEnabled: false,
      navBarTextColor: 'white',
      statusBarColor: 'steelblue',
      navBarButtonColor: 'white',
      navBarSubtitleColor: 'white',
      navBarLeftButtonColor: 'white', // Change color of left nav bar button
    });
    return (
      <ThemeProvider theme={ClaroTheme}>
        <TouchableWithoutFeedback
          onPress={RemoteView.dismissKeyboard}
        >
          <Container>
            <StatusView style={{backgroundColor : 'steelblue'}}>
              <FunctionContainer style={{justifyContent: 'flex-end'}}>
              <TextContainer style={{padding: 30 }}><Text style={{fontSize:40, color: 'white', paddingBottom:5, fontWeight: 'bold' }}>좋음</Text><Text  style={{color: 'white'}}>통합공기청정도</Text></TextContainer>
                <TextLeftContainer style={{padding: 30 }}><Text style={{color: 'white'}}>완전깨끗</Text></TextLeftContainer>
              </FunctionContainer>
            </StatusView>
            <TextView>
            <FunctionContainer>
              <TextContainer><Text>미세먼지(PM 10)</Text></TextContainer>
              <TextLeftContainer><Text style={{fontWeight: 'bold' }} >25 </Text>
                <Text>ug/m3</Text></TextLeftContainer>
            </FunctionContainer>
            <FunctionContainer>
              <TextContainer><Text>초미세먼지(PM 2.5)</Text></TextContainer>
              <TextLeftContainer><Text style={{fontWeight: 'bold' }} >25 </Text><Text>ug/m3</Text></TextLeftContainer>
            </FunctionContainer>
            <FunctionContainer>
              <TextContainer><Text>GAS/VOCs</Text></TextContainer>
              <TextLeftContainer><Text style={{fontWeight: 'bold' }} >오염 </Text></TextLeftContainer>
            </FunctionContainer>
          </TextView>
            <GrayLine/>
            <OutAirView>
              <FunctionContainer style={{paddingBottom: 20}}>
                <TextContainer><Text style={{fontSize:20, fontWeight: 'bold' }}>외부 공기 정보 </Text></TextContainer>
                <TextLeftContainer><Text>금천구 가산</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>미세먼지(PM 10)</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >25 </Text><Text>ug/m3</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>초미세먼지(PM 2.5)</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >25 </Text><Text>ug/m3</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>오존</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >0.035 </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>이산화질소</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >0.016 </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>일산화탄소</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >0.3 </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
              <FunctionContainer>
                <TextContainer><Text>이황상가스</Text></TextContainer>
                <TextLeftContainer><Text style={{fontWeight: 'bold' }} >0.004 </Text><Text>ppm</Text></TextLeftContainer>
              </FunctionContainer>
            </OutAirView>

            <GrayLineContainer>
              <GrayLine/>
              <IconView>
                <TouchableHighlight
                  onPress={()=> this.goToRemoteView()}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={Plus}
                  />
                </TouchableHighlight>
              </IconView>
              <GrayLine/>
            </GrayLineContainer>
            <NavView>
              <RemoteBarView />
            </NavView>
          </Container>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    );
  }
}

export default  RemoteView