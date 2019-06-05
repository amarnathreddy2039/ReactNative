import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Image,
	Alert,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	ScrollView,
	Button,
	BackHandler,
	AsyncStorage,
	FlatList,
	
} from 'react-native';
import { SafeAreaView } from 'react-navigation';


class HomeScreen extends Component {
	/* handling back button */
	constructor(props) {
		super(props);

		//back button handler
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

		this.state = {
			loading: true,
			catalogSource: [],
			imageURL: '',
			catalogList: [
				{
					id: 1,
					title: 'Lorem, ipsum.',
					detials: 'Lorem ipsum dolor sit amet consectetur.',
					imagepath:
						'http://res.cloudinary.com/zipjet/image/upload/q_auto:good/v1461140826/Shirt_Hanger_qpq0us.jpg',
					originalprice: 'Â£18.00',
					offerprice: 'Â£16.00',
					isSelected: false
				},
				{
					id: 2,
					title: 'Lorem, ipsum.',
					detials: 'Lorem ipsum dolor sit amet consectetur.',
					imagepath:
						'http://res.cloudinary.com/zipjet/image/upload/q_auto:good/v1461314811/ProductBundle_2Suits_xio2p2.jpg',
					originalprice: 'Â£18.00',
					offerprice: 'Â£16.00',
					isSelected: false
				},
				{
					id: 3,
					title: 'Lorem, ipsum.',
					detials: 'Lorem ipsum dolor sit amet consectetur.',
					imagepath:
						'http://res.cloudinary.com/zipjet/image/upload/q_auto:good/v1518689964/Blouse_t1pt7h_qeoe8r.jpg',
					originalprice: 'Â£20.00',
					offerprice: 'Â£18.00',
					isSelected: false
				},
				{
					id: 4,
					title: 'Lorem, ipsum.',
					detials: 'Lorem ipsum dolor sit amet consectetur.',
					imagepath:
						'http://res.cloudinary.com/zipjet/image/upload/q_auto:good/v1461140827/Trousers_nqu1cs.jpg',
					originalprice: 'Â£22.00',
					offerprice: 'Â£18.00',
					isSelected: false
				}
			]
		};
	}

	static navigationOptions  = ({ navigation }) => {
		return {
		title: 'ZipJet',
		headerRight: <TouchableOpacity  onPress={() => alert('This is a button 2 !')} >
		<Image source={require('../resource/images/cart_icon.png')}
		style={{ width: 32, height: 32, resizeMode: 'contain', alignSelf: 'center', marginRight:20}}/>
		<Text style={{ position: 'absolute',
								left: 0,
								right: 0,
								top: -7,
								color:'red',
								textAlign:'right',
								marginRight:20,
								bottom: 0
	 }}>90</Text>   
		</TouchableOpacity >,

	}
	  };

	  
	// imagepath: require('../resource/images/zipjet_logo.png'),
	componentWillMount() {
		//update displaying values
		this.listener = this.props.navigation.addListener("didFocus", this.getData);

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentWillUnmount() {
		this.listener.remove();
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick() {
		console.log('handle back button!!');
		BackHandler.exitApp();
	}

	async getData(){
		
		let obj = await AsyncStorage.getItem("someObj");			 
		alert('recieved --> '+obj);
		console.log('recieved --> '+obj);


	}
	async componentDidMount() {
		console.log('Home-->componentDidMount');

	}
	_OndetialsClick(item) {
		console.log('index : ' + item.title);
		//	this.props.navigation.navigate('ProductDetailsScreen',{"item":{item}}) //total obj
		this.props.navigation.navigate('ProductDetailsScreen', {
			id: item.id,
			title: item.title,
			detials: item.detials,
			imagepath: item.imagepath,
			originalprice: item.originalprice,
			offerprice: item.offerprice
		});
	}

	render() {
		let { catalogList } = this.state;
		const { navigate } = this.props.navigation;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#D3D3D3' }}>
				<View style={styles.container}>
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							flexDirection: 'column'
						}}
					>
						<View style={[ styles.container, (margin = 5) ]}>
							{/* <View style={styles.IconsBlocks}> */}
							<FlatList
								numColumns={2}
								data={this.state.catalogList}
								contentContainerStyle={{ marginBottom: 5, backgroundColor: '#D3D3D3' }}
								renderItem={({ item }) => (
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
											<Image style={styles.icon} source={{ uri: item.imagepath }} />
											<Text style={styles.cardView_title}>{item.title} </Text>
											<Text style={styles.cardView_details}>{item.detials} </Text>
											<Text style={styles.cardView_details}>Price : {item.originalprice} </Text>
											<Button
												style={styles.cardView_button}
												title="Details"
												onPress={() => this._OndetialsClick(item)}
											/>
										</View>
									</View>
								)}
								keyExtractor={(item, index) => index}
							/>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
		flexWrap: 'wrap',
		backgroundColor: '#D3D3D3'
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
		marginTop: 2
	},
	cardView_button: {
		backgroundColor: '#cccccc',
		borderRadius: 5,
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 5,
		flexDirection: 'row',
		bottom: 0,
		marginTop: 4,
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
		flexDirection: 'row',
		bottom: 0,
		width: '90%'
	},

	RectangleShapeView: {
		marginTop: 20,
		width: 120 * 2,
		height: 120,
		backgroundColor: '#FFC107'
	}
});