import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import TrackExpenseScreen from '../Screens/TrackExpenseScreen';

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
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
    screen: TrackExpenseScreen,
    navigationOptions: {
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