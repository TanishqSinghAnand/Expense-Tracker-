import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import Adding from "./Adding";
import DialogInput from "react-native-dialog-input";
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: firebase.auth().currentUser.email,
      methods: [],
      isDialogVisible: false,
      addedName: "",
      id: null,
      Debit: [
        { Credit: [{ amt: 555, des: "TSA" }] },
        { Debit: [{ amt: 555, des: "TSA" }] },
      ],
    };
  }
  getPayMet = async () => {
    await db
      .collection("methods")
      .where("mailId", "==", this.state.mail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ methods: doc.data().methods });
        });
      });
    // console.log("State Methods =>>>>" + this.state.methods);
  };
  async componentDidMount() {
    console.log("Doc ID =>>>>" + this.state.id);
    await db
      .collection("methods")
      .where("mailId", "==", this.state.mail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var id = doc.id;
          this.setState({ methods: doc.data().methods, id: id });
          console.log(doc.id);
        });
      });
    console.log("Doc ID =>>>>" + this.state.id);
    await db
      .collection("methods")
      .doc("p9XTnGjhp4TO0vDMrQlA")
      .update({ Cash: this.state.Debit });
  }
  addPay = async (inputedtext) => {
    // if (isDialogVisible === false){
    // db.collection('')
    var localArray = this.state.methods;
    var addedName = inputedtext;
    // console.log("Added Pay =>>>>" + aaddName);
    localArray.push(addedName);
    var id;
    // console.log("Local Array =>>>>" + localArray);
    await db
      .collection("methods")
      .where("mailId", "==", this.state.mail)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          id = doc.id;
          db.collection("methods").doc(doc.id).update({
            methods: localArray,
          });
        });
      });
    var fbt = `{${addedName}: [
          { Credit: [{ amt: 5, des: "Defualt" }] },
          { Debit: [{ amt: 5, des: "Defualt " }] },
        ]}`;
    console.log(fbt);
    db.collection("methods")
      .doc(id)
      .update({
        addedName: [
          { Credit: [{ amt: 5, des: "Defualt" }] },
          { Debit: [{ amt: 5, des: "Defualt " }] },
        ],
      })
      .then(console.log("Done"));
    this.getPayMet();
    // console.log("State Methods =>>>>" + this.state.methods);
  };

  tsa = () => {
    return (
      <DialogInput
        isDialogVisible={this.state.isDialogVisible}
        title={"Add Payment Method"}
        message={"Enter the Payment method name"}
        hintInput={"Eg. ICICI Card"}
        submitInput={(inputText) => {
          console.log(inputText);
          this.addPay(inputText);

          this.setState({ addedName: inputText, isDialogVisible: false });
        }}
        closeDialog={() => {
          this.setState({ isDialogVisible: false });
          console.log("Dialog closed");
        }}
      ></DialogInput>
    );
  };
  navToAdd = ({ props }) => {
    const navigation = this.props.navigation;

    // console.log("Function working");
    this.props.navigation.navigate("AddingScreen");
    // console.log("Executed")
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    const navigation = this.props.navigation;

    // console.log("Item =>>"+item)
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(
              "AddingScreen",
              (props = { met: item })
            )
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
        {this.tsa()}
        <TouchableOpacity
          onPress={() => {
            this.setState({ isDialogVisible: true });
            // this.addPay()
          }}
          style={styles.addPay}
        >
          <Text style={styles.addPayText}>Add a paymont method</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#000",
  },
  addPay: {
    backgroundColor: "#fff",
    color: "white",
    alignItems: "center",
    width: 300,
    margin: 10,
    height: 35,
    justifyContent: "center",
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
    height: 25,
    marginTop: 10,
    justifyContent: "center",
  },
  MetText: {
    color: "#6af",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HomeScreen;
