
// imports from package.json
import React, {Component} from 'react';
import {Platform, StyleSheet,View,Text, StatusBar,TouchableOpacity,TouchableHighlight,Image} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';

// imports from src
import Splashscreen from './src/components/SplashScreen';
import Homescreen from './src/components/HomeScreen';
import ProductDetails from './src/components/ProductDetails';
import Addtocart from './src/components/Addtocart';
import AddAddess from './src/components/AddAddess';

// const Badge = ({count})=>(
//   <View style ={styles.cirlce}>
//     <Text style={styles.count}>{count}</Text>
//   </View>o
// );
//for tab bar Menu creation
const HomeNavOptions = ({ navigation }) => {
  return {
    headerTitleStyle: { alignSelf: 'center' , textAlign:"center",flex:1 },
     
    // title: <Image source={require('./src/resource/images/zipjet_logo.png')}
    // style={{ width: 100, height: 32, resizeMode: 'contain',flex:1}}/>,

    headerLeft: <Image source={require('./src/resource/images/left_menu_icon.png')}
    style={{ width: 32, height: 32,position: 'absolute', resizeMode: 'contain', alignSelf: 'center' }}/>,

    headerRight: <TouchableOpacity  onPress={() =>navigation.navigate('AddtocartScreen')} >
    <Image source={require('./src/resource/images/cart_icon.png')}
    style={{ width: 32, height: 32, resizeMode: 'contain', alignSelf: 'center', marginRight:20}}/>
    <Text style={{ position: 'absolute',
                            left: 0,
                            right: 0,
                            top: -7,
                            color:'red',
                            textAlign:'right',
                            marginRight:20,
                            bottom: 0
 }}>0</Text>   
    </TouchableOpacity >
   } 

  } 

  const DetailNavOptions = ({ navigation }) => {
    return {
      headerTitleStyle: { alignSelf: 'center' , textAlign:"center",flex:1 },
       
      // title: <Image source={require('./src/resource/images/zipjet_logo.png')}
      // style={{ width: 100, height: 32, resizeMode: 'contain',flex:1}}/>,
  
      headerRight:  <TouchableOpacity  onPress={() => alert('This is a button!')} >
      <Image source={require('./src/resource/images/cart_icon.png')}
      style={{ width: 32, height: 32, resizeMode: 'contain', alignSelf: 'center', marginRight:20}}/>
      <Text style={{ position: 'absolute',
                              left: 0,
                              right: 0,
                              top: -7,
                              color:'red',
                              textAlign:'right',
                              marginRight:20,
                              bottom: 0
   }}>0</Text>   
      </TouchableOpacity >
     } 
  
    }
      
//adding screens to stack
// homescreen: { screen: Homescreen,navigationOptions : HomeNavOptions}, 
const AppNavigator = createStackNavigator({
  splashScreen: { screen: Splashscreen},
  homescreen: { screen: Homescreen},   
  ProductDetailsScreen: { screen: ProductDetails },
  AddtocartScreen:{ screen: Addtocart },
  AddAddessScreen:{screen: AddAddess},
    
});


const AppContainer = createAppContainer(AppNavigator);

class App extends Component{

  render(){

    return <AppContainer />;
   
  }
}

export default App;

// const styles = StyleSheet.Create({
//   circle:{
//    width:36,
//    height:36,
//    borderRadius:18 , 
//    backgroundColor:'red'
//   },
//   count:{color:'#FFF'}
// });

