import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import db from "../config";
import firebase from "firebase";
export default class TrackExpenseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: firebase.auth().currentUser.email,
      methods: [],
      docID: null,
    };
  }
  getPayMet = async () => {
    await db
      .collection("methods")
      .where("mailId", "==", this.state.mail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ methods: doc.data().methods, id: doc.id });
        });
      });
  };
  componentDidMount() {
    this.getPayMet();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    const navigation = this.props.navigation;

    // console.log("Item =>>"+item)
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Track", (props = { met: item }))
          }
          style={styles.Met}
        >
          <Text key={i} style={styles.MetText}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.methods}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  addPay: {
    backgroundColor: "#fff",
    color: "white",
    alignItems: "center",
    width: 300,
    margin: 50,
    height: 35,
    justifyContent: "center",
    alignContent:"center"
  },
  addPayText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 1,
  },
  Met: {
    backgroundColor: "#5fa",
    color: "white",
    alignItems: "center",
    width: 200,
    height: 35,
    marginTop: 50,
    justifyContent: "center",
    borderRadius: 15,
  },
  MetText: {
    color: "#6af",
    fontWeight: "bold",
    fontSize: 20,
  },
});
