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
  View,
  Platform,
  Animated
} from 'react-native';
import autoBind from 'react-autobind';
import toast from '../../../utils/toast';
import { Icon } from 'react-native-elements'
import up from '../../../assets/images/Arrowhead-01-128.png'
import down from '../../../assets/images/Arrowhead-Down-01-128.png'
import powerIcn from '../../../assets/images/btnPowerN.png';
import powerIcnGreen from '../../../assets/images/btnPowerOn.png';
import AIIcnDim from '../../../assets/images/btnAiDim.png';
import AIIcn from '../../../assets/images/btnAiN.png';
import AIIcnBlue from '../../../assets/images/buttonAiOn.png';
import SterilizeIcnDim from '../../../assets/images/btnSterDim.png';
import SterilizeIcn from '../../../assets/images/btnSterN.png';
import SterilizeIcnBlue from '../../../assets/images/btnSterOn01.png';
import SterilizeIcnBlue2 from '../../../assets/images/btnSterOn02.png';
import PurifyIcnDim from '../../../assets/images/btnPuriDim.png';
import PurifyIcn from '../../../assets/images/btnPuriN.png';
import PurifyIcnBlue from '../../../assets/images/btnPuriOn01.png';
import PurifyIcnBlue2 from '../../../assets/images/btnPuriOn02.png';
import upIcn from '../../../assets/images/upIcn.png';
import {BoxShadow} from 'react-native-shadow'
type Props = {
  togglePower_: Function,
  toggleAI_: Function,
  toggleSterilizing_: Function,
  toggleAirCleaning_: Function,
  AI: number,
  sterilizing: number,
  power: number,
  serialNumber: string,
  airCleaning: number,
  height: number,
  _deltaY: number,
};

type State = {
};
const Container = styled.KeyboardAvoidingView`
  flex:1;
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 20;
`;
const IconText = styled.Text`
    flex-grow:0;
    flex-shrink:0;
    flex-basis:auto;
    font-size: 15px;
    color: black;
    opacity: 0.5;
`;
const IconView = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    marginTop: 14px;
    margin-bottom: 14px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const IconViewContainer = styled.View`
    flex-grow:1;
    flex-shrink:0;
    flex-basis: auto;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const GrayLine = styled.View`
    flex-grow:0;
    flex-shrink:0;
    flex-basis: 2px;
    width: 100%;
    background-color: black;
    opacity:0.4;
    top:  0px;
`;
const GrayLine2 = styled.View`
    width: 100%;
    backgroundColor:#f8f8f8;
`;

class RemoteBarView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.icons = {
      'up'    : up,
      'down'  : down
    };
    autoBind(this);
  }
  turnOffSterilizing(){
    this.props.toggleSterilizing_(0, this.props.barcode);
  }
  turnOffAirCleaning(){
    this.props.toggleAirCleaning_(0,this.props.barcode);
  }
  turnOffAI(){
    this.props.toggleAI_(0,this.props.barcode);
  }
  turnOffSleep(){
    this.props.toggleSleepRequest(0,this.props.barcode).catch((e)=>console.log(e));
  }
  toggleAI() {
    if(this.props.power===0){
      toast("전원이 꺼져있습니다.");
    }
    else if (this.props.AI === 0) {    //turn off state
      console.log("AI is 0");
      this.props.toggleAI_(1, this.props.barcode);
      this.turnOffSterilizing();
      this.turnOffSleep();
      this.turnOffAirCleaning();
    }
    else if (this.props.AI === 1) { //turn on state
      this.props.toggleAI_(0, this.props.barcode);
    }
  }
  toggleSterilizing(){
    console.log(this.props.sterilizing);
    console.log(this.props.sterilizingColor);
    if(this.props.power===0){
      toast("전원이 꺼져있습니다.");
    }
    else if (this.props.sterilizing === 0){
      this.turnOffAI();
      this.turnOffSleep();
      this.turnOffAirCleaning();
      this.props.toggleSterilizing_(1, this.props.barcode);
    }
    else if(this.props.sterilizing === 1){
      this.props.toggleSterilizing_(2, this.props.barcode);
    }
    else if(this.props.sterilizing === 2){
      this.props.toggleSterilizing_(0,this.props.barcode);
    }
  }

  toggleAirCleaning(){
    if(this.props.power===0){
      toast("전원이 꺼져있습니다.");
    }
    else if (this.props.airCleaning === 0){
      this.turnOffAI();
      this.turnOffSleep();
      this.turnOffSterilizing();
      this.props.toggleAirCleaning_(1,this.props.barcode);
    }
    else if(this.props.airCleaning === 1){
      this.props.toggleAirCleaning_(2, this.props.barcode);
    }
    else if(this.props.airCleaning === 2){
      this.props.toggleAirCleaning_(0,this.props.barcode);
    }
  }
  togglePower(){
    if(this.props.power === 0){
      this.props.togglePower_(1, this.props.barcode);
      this.props.toggleAI_(1, this.props.barcode);
    }
    else if(this.props.power === 1){
      this.turnOffAI();
      this.turnOffAirCleaning();
      this.turnOffSleep();
      this.turnOffSterilizing();
      this.props.togglePower_(0, this.props.barcode);
    }
  }
  goBack(){
    this.props.navigator.pop();
  }
  static dismissKeyboard() {
    Keyboard.dismiss();
  }

  props: Props;

  render() {
    let icon = this.icons['up'];
    return (
      Platform.OS ==='ios' ?(
            <Container style={{  shadowOffset: {width: 0, height: 2}}}>
              <Image source={upIcn} style={{position: 'absolute',alignSelf: 'center', top:-15,height:40, width:60, resizeMode:'stretch'}} />
              {this.props.power === 0 ?   <IconViewContainer >
                  <TouchableOpacity onPress={() => this.togglePower()}>
                    <IconView>
                      <Image source={powerIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                      <IconText>전원</IconText>
                    </IconView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleAI()}>
                    <IconView>
                      <Image source={AIIcnDim} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                      <IconText>AI</IconText>
                    </IconView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleSterilizing()}>
                    <IconView>
                      <Image source={SterilizeIcnDim} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                      <IconText>살균</IconText>
                    </IconView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
                    <IconView>
                      <Image source={PurifyIcnDim} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                      <IconText>공기 청정</IconText>
                    </IconView>
                  </TouchableOpacity>
                </IconViewContainer> :
                <IconViewContainer>
                  <TouchableOpacity onPress={() => this.togglePower()}>
                    <IconView>
                      {this.props.power === 0 ? <Image source={powerIcn} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/> : <Image source={powerIcnGreen} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>}
                      <IconText>전원</IconText>
                    </IconView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleAI()}>
                    <IconView>
                      {this.props.AI === 0 ? <Image source={AIIcn} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/> : <Image source={AIIcnBlue} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>}
                      <IconText>AI</IconText>
                    </IconView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleSterilizing()}>
                    <IconView>
                      {this.props.sterilizing === 0 ? <Image source={SterilizeIcn} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/> : (this.props.sterilizing === 1 ? <Image source={SterilizeIcnBlue} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/> : <Image source={SterilizeIcnBlue2} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>)}
                      <IconText>살균</IconText>
                    </IconView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
                    <IconView>
                      {this.props.airCleaning === 0 ? <Image source={PurifyIcn} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/> : (this.props.airCleaning === 1 ? <Image source={PurifyIcnBlue} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/> : <Image source={PurifyIcnBlue2} style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        height: 60,
                        width: 60,
                        marginBottom: 4,
                        resizeMode: 'stretch'
                      }}/>)}
                      <IconText>공기 청정</IconText>
                    </IconView>
                  </TouchableOpacity>
                </IconViewContainer>
              }
          </Container>) :(
        <Container>
          <GrayLine style = {{elevation: 2, transform: [{ rotate: '180deg'}]}} />
          <Image source={upIcn} style={{position: 'absolute',alignSelf: 'center', top:0,height:40, width:60, resizeMode:'stretch'}} />
          {this.props.power === 0 ?   <IconViewContainer >
              <TouchableOpacity onPress={() => this.togglePower()}>
                <IconView>
                  <Image source={powerIcn} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                  <IconText>전원</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleAI()}>
                <IconView>
                <Image source={AIIcnDim} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                  <IconText>AI</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSterilizing()}>
                <IconView>
                  <Image source={SterilizeIcnDim} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                  <IconText>살균</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
                <IconView>
                  <Image source={PurifyIcnDim} style={{flexGrow:0, flexShrink:0, flexBasis: 'auto', height:60, width:60,marginBottom: 4, resizeMode:'stretch'}} />
                  <IconText>공기 청정</IconText>
                </IconView>
              </TouchableOpacity>
            </IconViewContainer> :
            <IconViewContainer>
              <TouchableOpacity onPress={() => this.togglePower()}>
                <IconView>
                  {this.props.power === 0 ? <Image source={powerIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> : <Image source={powerIcnGreen} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>}
                  <IconText>전원</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleAI()}>
                <IconView>
                  {this.props.AI === 0 ? <Image source={AIIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> : <Image source={AIIcnBlue} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>}
                  <IconText>AI</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSterilizing()}>
                <IconView>
                  {this.props.sterilizing === 0 ? <Image source={SterilizeIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> : (this.props.sterilizing === 1 ? <Image source={SterilizeIcnBlue} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> : <Image source={SterilizeIcnBlue2} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>)}
                  <IconText>살균</IconText>
                </IconView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleAirCleaning()}>
                <IconView>
                  {this.props.airCleaning === 0 ? <Image source={PurifyIcn} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> : (this.props.airCleaning === 1 ? <Image source={PurifyIcnBlue} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/> : <Image source={PurifyIcnBlue2} style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                    height: 60,
                    width: 60,
                    marginBottom: 4,
                    resizeMode: 'stretch'
                  }}/>)}
                  <IconText>공기 청정</IconText>
                </IconView>
              </TouchableOpacity>
            </IconViewContainer>
          }
        </Container>
      )
    );
  }
}

export default  RemoteBarView
