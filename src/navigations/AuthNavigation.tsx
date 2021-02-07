import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Email from "../screens/auth/Email";
import Password from "../screens/auth/Password";

export type AuthNavStackParamList = {
  Email: any;
  Password: { email: string; action: "signUp" | "signIn" };
};

const Stack = createStackNavigator<AuthNavStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Email" headerMode="none">
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
