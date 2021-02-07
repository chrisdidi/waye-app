import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Name from "../screens/setup/Name";

const Stack = createStackNavigator();

const SetupNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Name" component={Name} />
    </Stack.Navigator>
  );
};

export default SetupNavigation;
