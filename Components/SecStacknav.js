import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Track from "../Screens/Track";
import TrackExpenseScreen from "../Screens/TrackExpenseScreen";
var tsa = "Tanishq";
const SecStackNavigator = createStackNavigator(
  {
    TrackExpenseScreen: {
      screen: TrackExpenseScreen,
      navigationOptions: {
        headerShown: true,
        title: "Home",
        margin: 0,
        headerStyle: {
          backgroundColor: "#000",
          // borderWidth:'0.3px',
          borderColor: "#444",
        },
        headerTintColor: "#f000ff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      },
    },
    Track: {
      screen: Track,
      navigationOptions: {
        headerShown: true,
      },
    },
  },
  {
    initialRouteName: "TrackExpenseScreen",
  }
);

export default SecStackNavigator;
