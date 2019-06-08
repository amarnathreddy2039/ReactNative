import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
import Counter from "react-native-counters";
//import console = require('console');

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataObj: [],
      productArray: [],
      originalArray: [],
      quantity: 1
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "ZipJet"
    };
  };

  componentWillMount() {
    const { navigate } = this.props.navigation;
    const propsData = this.props.navigation.getParam("ProductDetailsScreen");
    console.log("Product data : " + JSON.stringify(propsData));
  }
  onChange(number, type) {
    console.log(number, type); // 1, + or -
    this.setState({ quantity: number });
    console.log("count : " + this.state.quantity);
  }

  async _addtocartButonClick() {
    //const cuurentObject = this;
    this.state.dataObj.push({
      id: this.props.navigation.state.params.id,
      title: this.props.navigation.state.params.title,
      detials: this.props.navigation.state.params.detials,
      imagepath: this.props.navigation.state.params.imagepath,
      originalprice: this.props.navigation.state.params.originalprice,
      offerprice: this.props.navigation.state.params.offerprice,
      quantity: this.state.quantity
    });
    const temp = {
      id: this.props.navigation.state.params.id,
      title: this.props.navigation.state.params.title,
      detials: this.props.navigation.state.params.detials,
      imagepath: this.props.navigation.state.params.imagepath,
      originalprice: this.props.navigation.state.params.originalprice,
      offerprice: this.props.navigation.state.params.offerprice,
      quantity: this.state.quantity
    };

    console.log("setData-->", this.state.dataObj);

    try {
      var myArray = [];
      myArray = await AsyncStorage.getItem("someObj");

      if (myArray != null) {
        console.log(" my array ", typeof myArray);

        myArray = JSON.parse(myArray);
        myArray.push(temp);
        console.log("myArray-push-->", myArray);

        
        await AsyncStorage.setItem("someObj", JSON.stringify(myArray)).then(
          this.props.navigation.navigate("homescreen")
        );
      } else {
        await AsyncStorage.setItem(
          "someObj",
          JSON.stringify(this.state.dataObj)
        ).then(this.props.navigation.navigate("homescreen"));
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  // async _addtocartButonClick() {
  //   //const cuurentObject = this;
  //   this.state.dataObj.push({
  //     id: this.props.navigation.state.params.id,
  //     title: this.props.navigation.state.params.title,
  //     detials: this.props.navigation.state.params.detials,
  //     imagepath: this.props.navigation.state.params.imagepath,
  //     originalprice: this.props.navigation.state.params.originalprice,
  //     offerprice: this.props.navigation.state.params.offerprice,
  //     quantity: this.state.quantity
  //   });

  //   //	console.log('setData-->'+JSON.stringify(this.state.dataObj));

  //   try {
  //     const myArray = await AsyncStorage.getItem("someObj");
  //     if (myArray !== null) {

  //       // We have data!!
  //       // console.log('local_storage --> '+myArray);

  //       let dummyArray = JSON.parse(JSON.stringify(myArray));
  //       console.log("local_storage --> " , dummyArray);

  //       this.state.dataObj.map(data => {
  // 	  this.state.productArray.push(data);
  // 	 // this.setState({ productArray: [this.state.productArray, data] })
  //       });
  //       console.log("productArray --> " , this.state.productArray );

  // 	console.log("productArray2 --> " ,dummyArray.push(this.state.productArray));
  //       //storing data in AsyncStorage
  //       await AsyncStorage.setItem(
  //         "someObj",
  //         JSON.stringify(this.state.productArray)
  // 	).then(this.props.navigation.navigate("homescreen"));

  //     } else {
  //       //storing data in AsyncStorage
  //       await AsyncStorage.setItem(
  //         "someObj",
  //         JSON.stringify(this.state.productArray)
  //       ).then(this.props.navigation.navigate("homescreen"));
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }

  //   // if(obj===null){

  //   // 	//storing data in AsyncStorage
  //   // await AsyncStorage.setItem("someObj", JSON.stringify(this.state.dataObj))
  //   // .then(this.props.navigation.navigate('homescreen'));

  //   // }else{
  //   // 	//storing data in AsyncStorage
  //   // await AsyncStorage.setItem("someObj", JSON.stringify(this.state.dataObj))
  //   // .then(this.props.navigation.navigate('homescreen'));

  //   // }
  // }

  render() {
    //for getting data from Home screen

    return (
      <View style={{ flex: 1, flexDirection: "column", margin: 5 }}>
        <View
          style={{
            padding: 2,
            margin: 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "#fafafa"
          }}
        >
          <Image
            style={styles.icon}
            source={{ uri: this.props.navigation.state.params.imagepath }}
          />
          <Text style={styles.cardView_title}>
            {this.props.navigation.state.params.title}
          </Text>

          <Text style={styles.cardView_details}>
            {this.props.navigation.state.params.detials}
          </Text>
          <Text style={styles.cardView_details}>
            Price : {this.props.navigation.state.params.originalprice}
          </Text>
          <Counter
            style={styles.cardView_details}
            start={1}
            onChange={this.onChange.bind(this)}
          />
          <Button
            style={styles.cardView_button}
            title="Add to Cart"
            //onPress={() => alert('Added Successfully')}
            onPress={() => this._addtocartButonClick()}
          />
        </View>
      </View>
    );
  }
}

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexWrap: "wrap",
    backgroundColor: "#D3D3D3"
  },
  cardView_title: {
    fontSize: 20,
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
    width: "90%"
  },
  labelText: {
    fontSize: 15,
    textAlign: "center",
    color: "red"
  },
  icon: {
    height: 200,
    width: 130,
    marginBottom: 5,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5
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
    width: "90%"
  },

  RectangleShapeView: {
    marginTop: 20,
    width: 120 * 2,
    height: 120,
    backgroundColor: "#FFC107"
  }
});
