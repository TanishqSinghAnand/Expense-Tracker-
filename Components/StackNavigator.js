import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Adding from "../Screens/Adding";
import HomeScreen from "../Screens/HomeScreen";
var tsa = "Tanishq"
const StackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: true,
        title: "Home",
        margin:0,
        headerStyle: {
          backgroundColor: "#000",
          // borderWidth:'0.3px',
          borderColor:"#444",
        },
        headerTintColor: "#f000ff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      },
    },
    AddingScreen: {
      screen: Adding,
      navigationOptions: {
        headerShown: true,
      },
    },
  },
  {
    initialRouteName: "HomeScreen",
  }
);

export default StackNavigator;