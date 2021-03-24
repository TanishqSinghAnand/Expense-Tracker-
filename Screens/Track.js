import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";
export class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: firebase.auth().currentUser.email,
      docID: null,
      Credit: [],
      Debit: [],
      docIDOfCollection: null,
      met: this.props.navigation.getParam("met"),
    };
  }
  getData = async (type) => {
    await db
      .collection("methods")
      .where("mailId", "==", this.state.mail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ docID: doc.id });
          console.log("Doc Data =>>", doc.id);
        });
      });
    await db
      .collection("methods")
      .doc(this.state.docID)
      .collection(this.state.met)
      .onSnapshot((snapshot) =>
        snapshot.forEach(async (doc) => {
          var docID = doc.id;
          await this.setState({
            docIDOfCollection: docID,
            Credit: doc.data().Credit,
          });
          console.log("evu", this.state.Credit);
          console.log(this.state.docIDOfCollection);
        })
      );
    await db
      .collection("methods")
      .doc(this.state.docID)
      .collection(this.state.met)
      .onSnapshot((snapshot) =>
        snapshot.forEach(async (doc) => {
          var docID = doc.id;
          await this.setState({
            docIDOfCollection: docID,
            Debit: doc.data().Debit,
          });
          console.log("evu", doc.data());
          console.log(doc.data().Debit);
        })
      );
  };
  componentDidMount() {
    this.getData();
  }
  renderItem = ({ item, i }) => {
    const navigation = this.props.navigation;

    // console.log("Item =>>"+item)
    return (
      <View>
        <View style={{ border: "2px solid White", margin: 20 }}>
          <Text style={{ color: "white" }} key={i}>
            Amount : {item.amt}
          </Text>
          <Text style={{ color: "white" }} key={i}>
            Description : {item.des}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: "#000", display: "flex", flex: 1 }}>
        <ScrollView>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.Credit}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Track;
