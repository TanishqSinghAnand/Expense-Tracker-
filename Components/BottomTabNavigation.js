import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import TrackExpenseScreen from '../Screens/TrackExpenseScreen';
import  StackNavigator  from "./StackNavigator";
import SecStackNavigator from './SecStacknav'
const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: StackNavigator,
    navigationOptions: {
      tabBarOptions: {
        activeBackgroundColor: "#000",
        inactiveBackgroundColor: "#222",
      },
      //   tabBarIcon: (
      //     <Image
      //       source={require("../assets/icon.png")}
      //       style={{ width: 20, height: 20 }}
      //     />
      //   ),

      tabBarLabel: "Home Screen",
    },
  },
  TrackExpenseScreen: {
    screen: SecStackNavigator,
    navigationOptions: {
      tabBarOptions: {
        activeBackgroundColor: "#000",
        inactiveBackgroundColor: "#222",
      },
      //   tabBarIcon: (
      //     <Image
      //       source={require("../assets/icon.png")}
      //       style={{ width: 20, height: 20 }}
      //     />
      //   ),

      tabBarLabel: "Track Expense",
    },
  },
});

export default AppTabNavigator;