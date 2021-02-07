import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Profile from "../screens/profile/Profile";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
