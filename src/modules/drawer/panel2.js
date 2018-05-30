import React, {Component} from 'react';
import {StyleSheet, WebView, Text, View, Image, TouchableHighlight, Animated, Linking} from 'react-native';
import up from '../../assets/images/Arrowhead-01-128.png'
import down from '../../assets/images/Arrowhead-Down-01-128.png'
import home from '../../assets/images/home.png'
import autoBind from 'react-autobind';
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

class Panel2 extends Component<Props>{  //panel for no have children
  constructor(props){
    super(props);
    autoBind(this);
    this.icons = {
      'up'    : up,
      'down'  : down,
      'home' :home,
    };

    this.state = {
      title       : props.title,
      expanded    : true,
      first: true,
      animation   : new Animated.Value()
    };
  }
  componentDidMount() {

    setTimeout((function () {
      if(this.state.expanded===true)
        this.toggle();
    }).bind(this), 2000)
  }

  toggle(){
    let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
    this.setState({
      expanded : !this.state.expanded,
    }, () => {
      console.log(this.state.expanded);
    });
    this.state.animation.setValue(initialValue);
    console.log(initialValue,"initialValue");
    console.log(finalValue,"finalValue");
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMaxHeight(event){
    console.log("calculate maxheight",event.nativeEvent.layout.height)
    this.setState({
      maxHeight   : event.nativeEvent.layout.height
    })
  };

  _setMinHeight(event){
    console.log("calculate minheight",event.nativeEvent.layout.height)
    this.setState({
      minHeight   : event.nativeEvent.layout.height
    });
  }

  render(){
    let icon = this.icons['down'];

    if(this.state.expanded){
      console.log(this.state.expanded);
      icon = this.icons['up'];
    }

    return (
      <Animated.View
        style={[styles.container,{height: this.state.animation}]}>
        <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            onPress={() => Linking.openURL("http://www.google.com").catch(err => console.error('An error occurred', err))}
            >
            <Image
              style={styles.buttonImage}
              source={this.icons['home']}
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

export default Panel2;