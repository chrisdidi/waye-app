import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Orders from "../screens/orders/Orders";
import Profile from "../screens/profile/Profile";

const Stack = createStackNavigator();

const OrdersNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="OrdersScreen" component={Orders} />
    </Stack.Navigator>
  );
};

export default OrdersNavigation;
