import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList,
  AsyncStorage
} from "react-native";
import Counter from "react-native-counters";
import { SafeAreaView, NavigationActions } from "react-navigation";

export class Addtocart extends Component {
  constructor(props) {
    super(props);
    this.state = {
			cartArray: [],
			totalamount:0,
    };

    this.getData = this.getData.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Cart Details"
    };
  };

  componentWillMount() {
    console.log("cart-->componentWillMount");

    //update displaying values
    const { navigation } = this.props;
  }
  componentDidMount() {
    console.log("cart-->componentDidMount");
    //update displaying values
    const { navigation } = this.props;
    this.getData();
	}
	
  async  getData() {
		var myArray = [];
		 myArray = await AsyncStorage.getItem('someObj');
		if (myArray != null) {
		//	console.log('myArray store--> ', myArray);

		this.setState({cartArray:JSON.parse(myArray) });
			console.log('cartArray ', this.state.cartArray);

			let tempTotal=0;
			this.state.cartArray.map(data=>{
 
				 tempTotal=tempTotal+parseInt(data.product_price);
			})
   this.setState({totalamount:tempTotal});
		}

	}
  _OnCheckoutClick() {
    //	this.props.navigation.navigate('ProductDetailsScreen',{"item":{item}}) //total obj
    this.props.navigation.navigate("AddAddessScreen");
	}
	_onChange(item,number, type) {
		console.log(number, type); // 1, + or -
		
    }

  render() {
    let { cartArray } = this.state;
    const { navigate } = this.props.navigation;

    console.log("arraycount + ", cartArray);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#D3D3D3" }}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "column"
            }}
          >
            <View style={[styles.container, (margin = 5)]}>
              <FlatList
                numColumns={1}
                data={cartArray}
                contentContainerStyle={{
                  marginBottom: 5,
                  backgroundColor: "#D3D3D3"
                }}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                    <View
                      style={{
                        padding: 2,
                        margin: 2,
                        borderRadius: 5,
                        flexDirection: "row",
                        backgroundColor: "#fafafa",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <Image
                        style={styles.icon}
                        source={{ uri: item.product_image }}
                      />

                      <View style={styles.cardStyle}>
                        <Text style={styles.cardView_title}>{item.name} </Text>
                        <Text style={styles.cardView_details}>
                          {item.detials}
                        </Text>
                      </View>

                      <View style={styles.cardStyle}>
                        
												 <View style={[styles.cardStyle]}>
                        <Text style={styles.cardView_title}>
                          Rs. {item.product_price}
                        </Text>
                      </View>
											<Counter
                          style={[styles.cardView_title,{marginTop:10}]}
                          start={item.quantity}
                          onChange={this._onChange.bind(this)}
                        />
                      </View>
           

                      <Image
                        style={[styles.cardStyle, { width: 32, height: 32 }]}
                        source={require("../resource/images/delete_icon.png")}
                      />
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index}
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.buttonColor, { backgroundColor: null }]}
          >
            <Text
              style={{
                flex: 1,
                color: "black",
                textAlign: "right",
                fontSize: 15,
                justifyContent: "flex-end"
              }}
            >
              TOTAL AMOUNT: {this.state.totalamount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonColor}
            onPress={() => this._OnCheckoutClick()}
          >
            <Text
              style={{
                flex: 1,
                color: "white",
                textAlign: "center",
                fontSize: 18,
                justifyContent: "center"
              }}
            >
              CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Addtocart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#D3D3D3"
  },
  cardStyle: {
    width: 100,
    height: 15,
    padding: 2,
    margin: 2,
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center"
  },

  cardView_title: {
    fontSize: 15,
    color: "#000",
    textAlign: "center",
    marginTop: 2
  },
  cardView_details: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    padding: 2,
    marginTop: 2
  },
  cardView_button: {
    backgroundColor: "#cccccc",
    borderRadius: 5,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    bottom: 0,
    marginTop: 4,
    marginBottom: 4,
    width: 32,
    height: 32
  },
  labelText: {
    fontSize: 15,
    textAlign: "center",
    color: "red"
  },
  icon: {
    height: 100,
    width: 50,
    marginBottom: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
    padding: 5
  },

  button: {
    backgroundColor: "#cccccc",
    borderRadius: 5,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    bottom: 0,
    width: "90%"
  },
  buttonColor: {
    backgroundColor: "#1682C5",
    borderRadius: 5,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    bottom: 0,
    width: "100%"
  },

  RectangleShapeView: {
    marginTop: 20,
    width: 120 * 2,
    height: 120,
    backgroundColor: "#FFC107"
  }
});
