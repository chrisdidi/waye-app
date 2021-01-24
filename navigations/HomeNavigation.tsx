import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Dashboard from "../screens/home/Dashboard";
import MessagesList from "../screens/home/MessagesList";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MessagesList" component={MessagesList} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
