import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Alert } from 'react-native';

export class AddAddess extends Component {
	constructor(props) {
		super(props);
		state = {
			email: '',
			password: ''
		};
	}

	static navigationOptions  = ({ navigation }) => {
		return {
		title: 'Customer Details',
	}
	  };

	handleEmail = (text) => {
		this.setState({ email: text });
	};
	handlePassword = (text) => {
		this.setState({ password: text });
	};
	login = (email, pass) => {
		alert('email: ' + email + ' password: ' + pass);
	};
    
    clearLocalStoragedata(){

    }
   async _OnPlaceOrderClick() {
        
             
        Alert.alert(
            'Thank you',
            'Your Order was Successfully Completed',
            [
             
              {text: 'OK', onPress: () =>this.props.navigation.navigate("homescreen")},
            ],
            {cancelable: false},
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
						onChangeText={this.handleEmail}
					/>
					<TextInput
						style={styles.input}
						underlineColorAndroid="transparent"
						placeholder="Mobile Number"
						placeholderTextColor="#CDCDCD"
						autoCapitalize="none"
						onChangeText={this.handlePassword}
					/>
					<TextInput
						style={[ styles.input, { height: 100 } ]}
						underlineColorAndroid="transparent"
						placeholder="Address"
						placeholderTextColor="#CDCDCD"
						autoCapitalize="none"
						onChangeText={this.handlePassword}
					/>
				</View>

                <TouchableOpacity						
                style={[styles.buttonColor,{backgroundColor: null}]}
					>
						<Text
							style={{
								flex: 1,
								color: 'black',
								textAlign: 'right',
								fontSize: 15,
								justifyContent: 'flex-end'
							}}
						>
							TOTAL AMOUNT: 0
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