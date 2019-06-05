import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


//reseting stack
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'homescreen' })],
  });

class SplashScreen extends Component {


  /* toolbar */
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.timerID = null;
    this.state={ 
        isVisible : true,   
      }
  }

  Hide_Splash_Screen=()=>{ 
    this.setState({ 
      isVisible : false  
    });
 
  }
 
  componentDidMount() {
    this.timerID = setTimeout(() => {
        var that = this; 
        that.Hide_Splash_Screen(); 
      //  this.props.navigation.navigate('homescreen');
       this.props.navigation.dispatch(resetAction);
    }, 3000);
  }
  componentWillUnmount() {
    if (this.timerID != null) {
        clearInterval(this.timerID);
    }
}

  render() {
    return (
      <View style={styles.container}>

        <Image source={require('../resource/images/zipjet_logo.png')} 
          style={{ width: 200, height: 150, resizeMode: 'contain', alignSelf: 'center' }}/>   

      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: "center",
    padding: 10
  },
  progresscontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: "space-evenly",
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  circles: {
    flex: 1,
    justifyContent: 'center',
  },
  progress: {
    margin: 10,
  },
});



export default SplashScreen;