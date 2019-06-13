import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert, Text, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Counter from 'react-native-counters';
import RightButton from './rightbutton';

const detialsArray = [];

class ProductDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataObj: [],
			dataArray: {},
			quantity: 0,
			detialsObj: null
		};
	}

	async componentWillMount() {
		console.log('componentWillMount');
		const { navigate } = this.props.navigation;
		const propsData = this.props.navigation.getParam('ProductDetailsScreen');
	}

	onChange(number, type) {
		console.log(number, type); // 1, + or -
		this.setState({ quantity: number });
		
		console.log('count : ' + this.state.quantity);
	}

	static navigationOptions = ({navigation,screenProps}) =>{
	
		return({
		 // headerStyle:{backgroundColor:screenProps?screenProps.themeColor:'#00ff00'},
		 title:'Product Details',
		  headerRight:<RightButton title='0' method={()=>{navigation.navigate('AddtocartScreen')}} />,
		 
	  })
	  
	}
	async _addtocartButonClick() {
		//const cuurentObject = this;
		this.state.dataObj.push({
			product_id: this.props.navigation.state.params.id,
      name: this.props.navigation.state.params.name,
      details:this.props.navigation.state.params.details,
			product_price: this.props.navigation.state.params.product_price,
			product_image: this.props.navigation.state.params.product_image,
			cartitem_price: this.state.quantity * this.props.navigation.state.params.product_price,
			quantity: this.state.quantity
		});

		const temp = {
			product_id: this.props.navigation.state.params.id,
			name: this.props.navigation.state.params.name,
      details:this.props.navigation.state.params.details,
			product_price: this.props.navigation.state.params.product_price,
			product_image: this.props.navigation.state.params.product_image,
			cartitem_price: this.state.quantity * this.props.navigation.state.params.product_price,
			quantity: this.state.quantity
		};

		//console.log('setData-->', this.state.dataObj);

		try {
			var myArray = [];
			myArray = await AsyncStorage.getItem('someObj');
			//alert('length-->',myArray);
			if (myArray != null) {
				console.log('myArray != if');

				myArray = JSON.parse(myArray);

				//this.state.dataObj.push(myArray);
				//console.log('dataObj-push-->', this.state.dataObj);

				let isExist = false;
				console.log('selectedObj == ', JSON.stringify(this.state.dataObj));

				this.state.dataObj=myArray;

				console.log('myArray before == ', myArray);

				myArray.map(async (item, index) => {
					if (item.product_id == this.props.navigation.state.params.id) {

						
						console.log('product_id == ', item.product_id , this.props.navigation.state.params.id);

						isExist = true;
						const updateCartArray = [ ...this.state.dataObj ];
						updateCartArray[index] = {
							...updateCartArray[index],
							product_id: this.props.navigation.state.params.id,
							name: this.props.navigation.state.params.name,
							details:this.props.navigation.state.params.details,
			        product_price: this.props.navigation.state.params.product_price,
							product_image: this.props.navigation.state.params.product_image,
							cartitem_price: this.state.quantity * this.props.navigation.state.params.product_price,
							quantity: this.state.quantity

						};
						console.log('updateArray-->', JSON.stringify(updateCartArray));

						await AsyncStorage.setItem('someObj', JSON.stringify(updateCartArray)).then(
							this.props.navigation.navigate('homescreen')
						);
					}
				});
				console.log('myArray after == ', myArray);

				if (!isExist) {
					myArray.push(temp);		
					console.log('myArray !isExist == ', myArray);
					await AsyncStorage.setItem('someObj', JSON.stringify(myArray)).then(
						this.props.navigation.navigate('homescreen')
					);
				}
			} else {
				console.log('myArray != else');

				await AsyncStorage.setItem('someObj', JSON.stringify(this.state.dataObj)).then(
					this.props.navigation.navigate('homescreen')
				);
			}
		} catch (error) {
			// Error retrieving data
		}
	}

	render() {
		//for getting data from Home screen

		return (
      <View style={styles.container}>
        <View style={styles.container}>
			<View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
				<View
					style={{
						padding: 2,
						margin: 2,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 5,
						backgroundColor: '#fafafa'
					}}
				>
					<Image style={styles.icon} source={{ uri: this.props.navigation.state.params.product_image }} />
					<Text style={styles.cardView_title}>{this.props.navigation.state.params.name} </Text>
					<Text style={styles.cardView_title}>
						Price : {this.props.navigation.state.params.product_price}
					</Text>
					<Counter style={styles.cardView_title} start={1} onChange={this.onChange.bind(this)} />
				</View>
        </View>

        <TouchableOpacity style={styles.buttonColor} onPress={() => this._addtocartButonClick()}>
					<Text
						style={{
							flex: 1,
							color: 'white',
              textAlign: 'center',
              alignContent:'center',
              alignSelf:'center',
							fontSize: 18,
							justifyContent: 'center'
						}}
					>
						Add to Cart
					</Text>
				</TouchableOpacity>
			</View>
			</View>
		);
	}
}

export default ProductDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
		flexWrap: 'wrap',
		backgroundColor: 'white'
	},
	cardView_title: {
		fontSize: 20,
		color: '#000',
		textAlign: 'center',
		marginTop: 2
	},
	cardView_details: {
		fontSize: 14,
		color: '#000',
		textAlign: 'center',
		padding: 2,
		marginTop: 4
	},
	cardView_button: {
    flex:1,
		backgroundColor: '#cccccc',
		borderRadius: 5,
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 5,
		flexDirection: 'row',
		bottom: 0,
		marginTop: 8,
		marginBottom: 4,
		width: '90%'
	},
	labelText: {
		fontSize: 15,
		textAlign: 'center',
		color: 'red'
	},
	icon: {
		height: 200,
		width: 130,
		marginBottom: 5,
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 5
	},

	button: {
		backgroundColor: '#cccccc',
		borderRadius: 5,
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 5,
		flexDirection: 'row',
		bottom: 0,
		width: '90%'
	},
	buttonColor: {
		backgroundColor: '#1682C5',
		borderRadius: 5,
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		alignItems: 'center',
    padding: 5,
    marginBottom:5,
		flexDirection: 'row',
		bottom: 1,
		width: '100%'
	},

	RectangleShapeView: {
		marginTop: 20,
		width: 120 * 2,
		height: 120,
		backgroundColor: '#FFC107'
	}
});