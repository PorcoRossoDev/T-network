// src/navigation/StackNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
// import {
//   CustomerStack,
//   HomeScreen,
//   UserStack,
// } from "../stack"


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
