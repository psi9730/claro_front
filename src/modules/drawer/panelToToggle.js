import React, {Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';
import up from '../../assets/images/Arrowhead-01-128.png'
import down from '../../assets/images/Arrowhead-Down-01-128.png'
import autoBind from 'react-autobind';
import {Platform} from 'react-native';
var styles = StyleSheet.create({
  container   : {
    backgroundColor: '#fff',
    margin:10,
    overflow:'hidden'
  },
  titleContainer : {
    flexDirection: 'row'
  },
  title       : {
    flex    : 1,
    padding : 10,
    color   :'#2a2f43',
    fontWeight:'bold'
  },
  button      : {

  },
  buttonImage : {
    width   : 30,
    height  : 25
  },
  body        : {
    padding     : 10,
    paddingTop  : 0
  }
});

class Panel extends Component<Props>{
  constructor(props){
    super(props);
    autoBind(this);
    this.icons = {
      'up'    : up,
      'down'  : down
    };

    this.state = {
      title       : props.title,
      expanded    : true,
      first: true,
      animation   : new Animated.Value()
    };
  }
  componentDidMount() {
  }
  toggle(){
    let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
    this.setState({
      expanded : !this.state.expanded,
    }, () => {
      console.log(this.state.expanded,this.state.title,this.state.maxHeight,this.state.minHeight,'change expanded')
    });
    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMaxHeight(event){
    console.log("calcultae maxheight",event.nativeEvent.layout.height,this.state.title);
    if(Platform.OS==='android'){
      this.setState({
        maxHeight: event.nativeEvent.layout.height
      })
    }
    else if (event.nativeEvent.layout.height){
      this.setState({
          maxHeight   : event.nativeEvent.layout.height
        },()=> {
          if (this.state.minHeight && this.state.first && this.state.maxHeight && Platform.OS==='ios') {
            console.log(this.state.minHeight,"minHeight!!",this.state.title);
            console.log(this.state.first,"first!!");
            console.log(this.state.maxHeight,"maxHeight!!",this.state.title);

            if (this.state.expanded === true) {
              this.toggle();
              this.setState({first: false});
            }
          }
        }
      )}}

  _setMinHeight(event){
    console.log("calculate minheight",event.nativeEvent.layout.height,this.state.title)
    if(Platform.OS==='android') {
      this.setState({
        minHeight: event.nativeEvent.layout.height
      }, ()=> setTimeout((function() {
        if (this.state.minHeight && this.state.first && this.state.maxHeight) {
          console.log(this.state.minHeight,"minHeight!!",this.state.title);
          console.log(this.state.first,"first!!");
          console.log(this.state.maxHeight,"maxHeight!!",this.state.title);
          if (this.state.expanded === true) {
            this.toggle();
            this.setState({first: false});
          }
        }
      }).bind(this), 3000));
    }
    else if (event.nativeEvent.layout.height){
      this.setState({
          minHeight   : event.nativeEvent.layout.height
        },()=> {
          if (this.state.minHeight && this.state.first && this.state.maxHeight && Platform.OS==='ios') {
            console.log(this.state.minHeight,"minHeight!!",this.state.title);
            console.log(this.state.first,"first!!");
            console.log(this.state.maxHeight,"maxHeight!!",this.state.title);

            if (this.state.expanded === true) {
              this.toggle();
              this.setState({first: false});
            }
          }
        }
      )}
  }

  render(){
    let icon = this.icons['down'];

    if(this.state.expanded){
      icon = this.icons['up'];
    }

    return (
      <Animated.View
        style={[styles.container,{height: this.state.animation}]}>
        <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1">
            <Image
              style={styles.buttonImage}
              source={icon}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>

      </Animated.View>
    );
  }
}

export default Panel;