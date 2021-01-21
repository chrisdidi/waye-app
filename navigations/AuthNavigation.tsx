import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Email from "../screens/auth/Email";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Email" headerMode="none">
      <Stack.Screen name="Email" component={Email} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
