import React, { Component } from 'react';
import { View, Text,Image, TouchableOpacity, TextInput, StyleSheet, Alert,AsyncStorage } from 'react-native';
import RightButton from './rightbutton';


export class AddAddess extends Component {
	constructor(props) {
		super(props);
		state = {
			checkoutcart: {
				products: [],
				customer:{name: '',
				mobileno: '',
				address: '',
				totalamount:'',}
			},
			name: '',
				mobileno: '',
				address: '',
				totalamount:'',
		};
	}

	componentDidMount() {
		var cartArray = [];
		cartArray = this.props.navigation.state.params.cartArray;

		var totalamount=this.props.navigation.state.params.totalamount;
		console.log('products-->',cartArray);
		console.log('totalamount-->',totalamount);

			// this.setState({checkoutcart:this.state.checkoutcart.concat({
		// 	products:this.props.navigation.state.params.cartArray,
		// 	customer:{name: 'Amarnath',
		// 	mobileno: '1234569870',
		// 	address: 'valuelabs',
		// 	totalamount:this.props.navigation.state.params.totalamount}
		// })})
		// console.log('final array-->',this.state.checkoutcart);

	}
	handleName = (text) => {
		console.log('name-->',text);
		//this.setState({name: text });
		//console.log('name-->',this.state.name);
	};
	handleMobileNo = (text) => {
		console.log('mobileno-->',text);
		//this.setState({ mobileno:text});
		//console.log('mobileno-->',this.state.mobileno);
	};
	handleAddress = (text) => {
		console.log('address-->',text);
	//	this.setState({ address: text });
		//console.log('address-->',this.state.address);
	};

	static navigationOptions = ({navigation,screenProps}) =>{
		console.log('navigationOptions');
		return({
		 // headerStyle:{backgroundColor:screenProps?screenProps.themeColor:'#00ff00'},
		 title:'Address',
		  headerRight:<RightButton title='0' method={()=>{navigation.navigate('AddtocartScreen')}} />,
		 
	  })
	 
	}
	

	async removeItemValue() {
		console.log('delete item-->',item);
		  try {
			await AsyncStorage.removeItem('someObj');
		  //  return true;
		  }
		  catch(exception) {
			//return false;
		  }
		}

		async navHomeScreen(){
			try {
				await AsyncStorage.removeItem('someObj');

				this.props.navigation.navigate('homescreen');
			  //  return true;
			  }
			  catch(exception) {
				//return false;
			  }
			
		}
	 
	 _OnPlaceOrderClick() {
		Alert.alert(
			'Thank you',
			'Your Order was Successfully Completed',
			[ { text: 'OK', onPress: () => this.navHomeScreen()} ],
			{ cancelable: false }
		);
	
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.cardView_title}>Add Address</Text>
					<TextInput
						style={styles.input}
						underlineColorAndroid="transparent"
						placeholder="Customer Name"
						placeholderTextColor="#CDCDCD"
						autoCapitalize="none"
						onChangeText={this.handleName}
					/>
					<TextInput
						style={styles.input}
						underlineColorAndroid="transparent"
						placeholder="Mobile Number"
						placeholderTextColor="#CDCDCD"
						autoCapitalize="none"
						onChangeText={this.handleMobileNo}
					/>
					<TextInput
						style={[ styles.input, { height: 100 } ]}
						underlineColorAndroid="transparent"
						placeholder="Address"
						placeholderTextColor="#CDCDCD"
						autoCapitalize="none"
						onChangeText={this.handleAddress}
					/>
				</View>

				<TouchableOpacity style={[ styles.buttonColor, { backgroundColor: null } ]}>
					<Text
						style={{
							flex: 1,
							color: 'black',
							textAlign: 'right',
							fontSize: 15,
							justifyContent: 'flex-end'
						}}
					>
						TOTAL AMOUNT:{this.props.navigation.state.params.totalamount}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonColor} onPress={() => this._OnPlaceOrderClick()}>
					<Text
						style={{
							flex: 1,
							color: 'white',
							textAlign: 'center',
							fontSize: 18,
							justifyContent: 'center'
						}}
					>
						Place order
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
export default AddAddess;

const styles = StyleSheet.create({
	container: {
		paddingTop: 23,
		flex: 1,
		height: '100%',
		width: '100%',
		backgroundColor: 'white'
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: '#D3D3D3',
		borderWidth: 1
	},
	submitButton: {
		backgroundColor: '#7a42f4',
		padding: 10,
		margin: 15,
		height: 40
	},
	submitButtonText: {
		color: 'white'
	},
	buttonColor: {
		backgroundColor: '#1682C5',
		borderRadius: 5,
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 5,
		flexDirection: 'row',
		bottom: 5,
		width: '100%'
	},
	cardView_title: {
		fontSize: 15,
		color: '#000',
		textAlign: 'center',
		marginTop: 2
	}
});