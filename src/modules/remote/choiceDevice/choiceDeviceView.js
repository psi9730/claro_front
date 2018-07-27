import React, {Component} from 'react';
import {Select, Option} from "react-native-chooser";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import autoBind from 'react-autobind';
import {KEYS} from '../../../utils/ClaroStorage';
import Storage from '../../../utils/ClaroStorage';

export default class ChoiceDeviceView extends Component {

  constructor(props) {
    super(props);
    this.state = {value : "Select Me Please"}
    autoBind(this);
    (async()=>{
      const serial_number = await Storage.getItem(KEYS.serialNumber);
      this.setState({serial_number});
    })();
    this.props.getDevicesRequest().then().catch((e)=>console.log(e));
  }
  componentWillMount(){
    (async()=>{
      const serial_number = await Storage.getItem(KEYS.serialNumber);
      this.setState({serial_number});
    })();
    this.props.getDevicesRequest().then().catch((e)=>console.log(e));
  }
  onSelect(value, label) {
    this.setState({value : value}, ()=>this.props.setDeviceInfoRequest(this.state.value).then( ()=>{this.setState({serial_number: value})}).catch((e)=>console.log(e)));
  }

  render() {
    return (
      <View >
        <Select
          onSelect = {this.onSelect.bind(this)}
          defaultText  = {this.state.value}
          style = {{borderWidth : 1, borderColor : "green"}}
          textStyle = {{}}
          backdropStyle  = {{backgroundColor : "#d3d5d6"}}
          optionListStyle = {{backgroundColor : "#F5FCFF"}}
        >
          {this.props.devices.map((listValue,index)=> {
            return <Option value={listValue.serialNumber} key={index}>{listValue.serialNumber}</Option>;
          })}
        </Select>
        <Text> now serial_number: {this.state.serial_number}</Text>
      </View>
    );
  }
}