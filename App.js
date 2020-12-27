import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./Screens/WelcomeScreen";
import AppNavigator from './Components/BottomTabNavigation'
import AppTabNavigator from './Components/BottomTabNavigation'

export default function App() {
  return (
    <View style={{ display: "flex",flex:1 }}>
      <AppContainer />
    </View>
  );
}

const switchNavigator = createSwitchNavigator({
    BottomTab: { screen: AppTabNavigator },

  WelcomeScreen: { screen: WelcomeScreen },
});

const AppContainer = createAppContainer(switchNavigator);
