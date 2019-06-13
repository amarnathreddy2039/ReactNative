import React, {Component} from "react"
import {Text, TouchableOpacity,Image, View,AsyncStorage} from "react-native"

class rightbutton extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		   cartCountValue: 0,
		   cartArray:[]
	  };
	  this.setPress = () => {
		if (!!this.props.method) {
		  this.props.method();
		}
	  }
	 
	  this.getData=this.getData.bind(this);
	
	}

	componentDidMount() {
		
		this.getData();
	
	}
	
	async getData() {
		var myArray = [];
		myArray = await AsyncStorage.getItem('someObj');
		if (myArray != null) {
			
			myArray = JSON.parse(myArray);
			console.log('myArray store--> ', myArray);
			
			let tempTotal = 0;
			myArray.map((data,index) => {
				tempTotal = tempTotal + data.quantity;
				
			});
			console.log('myArray cartcount', tempTotal);
			this.setState({ cartCountValue : tempTotal});
			//console.log('myArray statecount',this.state.cartCountValue);
		
			}
	}
	_cartIconClick(){
		
			  this.navigate('AddtocartScreen');
		
		  }
	render() {
		//const { navigate } = this.props.navigation;

	  return (
	  <View >	
		<TouchableOpacity onPress={this.setPress} >
		<Image source={require('../resource/images/cart_icon.png')}
		style={{ width: 32, height: 32, resizeMode: 'contain', alignSelf: 'center', marginRight:20}}/>
		 <Text style={{ position: 'absolute',left: 0, right: 0,top: -7,color:'red',textAlign:'right',marginRight:20,
      bottom: 0}}>{this.state.cartCountValue}</Text>   
		</TouchableOpacity >
	  </View>)
	}
  }
  export default rightbutton;