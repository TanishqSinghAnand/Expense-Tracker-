import React from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import firebase from "firebase";
import db from "../config";
import DropDownPicker from "react-native-dropdown-picker";
class Adding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: firebase.auth().currentUser.email,
      amount: 0,
      type: "Credit",
      Debit: null,
      Credit: null,
      des: "",
      docID: null,
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
  updateData = async (type) => {
    if (this.state.type === "Credit") {
      await db
        .collection("methods")
        .doc(this.state.docID)
        .collection(this.state.met)
        .doc(this.state.docIDOfCollection)
        .update({
          Credit: this.state.Credit,
        })
        .then(alert("Successfully compleated"));
    } else if (this.state.type === "Debit") {
      await db
        .collection("methods")
        .doc(this.state.docID)
        .collection(this.state.met)
        .doc(this.state.docIDOfCollection)
        .update({
          Debit: this.state.Debit,
        })
        .then(alert("Successfully compleated"));
    }
  };
  addToLocal = (type) => {
    var localArray = [];
    if (this.state.type === "Credit") {
      localArray = [];
      localArray = this.state.Credit;
      var des = this.state.des;
      var amt = this.state.amount;
      if (amt != 0) {
        console.log("exu and local array before =>>>");
        console.log(localArray);
        var obj = { amt: this.state.amount, des: this.state.des };
        localArray.push(obj);
        console.log("obj =>>>" + obj);
        this.setState({ Credit: localArray });
        console.log("local array ==>>>>>");
        console.log(this.state.Credit);
        this.updateData();
      } else {
        alert("Please enter amount");
      }
    } else if (this.state.type === "Debit") {
      localArray = [];
      localArray = this.state.Credit;
      var des = this.state.des;
      var amt = this.state.amount;
      if (amt != 0) {
        console.log("exu and local array before =>>>");
        console.log(localArray);
        var obj = { amt: this.state.amount, des: this.state.des };
        localArray.push(obj);
        console.log("obj =>>>" + obj);
        this.setState({ Debit: localArray });
        console.log("local array ==>>>>>");
        console.log(this.state.Debit);
        this.updateData();
      }
    }
  };
  render() {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={{
            width: "75%",
            height: 35,
            alignSelf: "center",
            borderColor: "#fff",
            borderRadius: 10,
            // borderWidth: 1,
            marginTop: 20,
            padding: 10,
            color: "#101820FF",
            backgroundColor: "#42EADDFF",
            marginBottom: 20,
          }}
          placeholder={"Amount"}
          onChangeText={(text) => {
            this.setState({
              amount: text,
            });
          }}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={{
            width: "75%",
            height: 35,
            alignSelf: "center",
            borderColor: "#fff",
            borderRadius: 10,
            // borderWidth: 1,
            marginTop: 20,
            padding: 10,
            color: "#101820FF",
            backgroundColor: "#42EADDFF",
            marginBottom: 20,
          }}
          placeholder={"Description"}
          onChangeText={(text) => {
            this.setState({
              des: text,
            });
          }}
          underlineColorAndroid="transparent"
        />
        <DropDownPicker
          items={[
            {
              label: "Credit",
              value: "Credit",
            },
            {
              label: "Debit",
              value: "Debit",
            },
          ]}
          defaultValue={this.state.type}
          containerStyle={{ height: 50, width: 150 }}
          style={{ backgroundColor: "#42eaddff" }}
          itemStyle={{
            justifyContent: "flex-start",
            color: "#fff",
          }}
          dropDownStyle={{ backgroundColor: "#42eaddff" }}
          onChangeItem={async (item) => {
            console.log(this.state.type);
            var val = item.value;
            await this.setState({ type: val });
            console.log(this.state.type);
          }}
        />
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: "#42EADDFF",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
          onPress={() => this.addToLocal()}
        >
          <Text style={{ color: "#101820FF" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Adding;
