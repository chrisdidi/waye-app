import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import Dashboard from "../screens/home/Dashboard";
import MessagesList from "../screens/home/MessagesList";
import Parcel from "../screens/home/Parcel";
import PropertyViewing from "../screens/home/PropertyViewing";
import Shopping from "../screens/home/Shopping";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Dashboard"
      screenOptions={{ cardOverlayEnabled: true }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MessagesList" component={MessagesList} />
      <Stack.Screen
        name="PropertyViewing"
        component={PropertyViewing}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          cardStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen
        name="Parcel"
        component={Parcel}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          cardStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen
        name="Shopping"
        component={Shopping}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          cardStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
