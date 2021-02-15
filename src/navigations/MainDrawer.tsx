import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigation from "./HomeNavigation";
import DrawerMenu from "../components/DrawerMenu";
import OrdersNavigation from "./OrdersNavigation";
import Settings from "../screens/settings/Settings";
import ProfileNavigation from "./ProfileNavigation";
import DriverNavigation from "./DriverNavigation";
import Chatroom from "../screens/home/Chatroom";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType={"front"}
      screenOptions={{ unmountOnBlur: true }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeNavigation} />
      <Drawer.Screen
        name="Orders"
        options={{ unmountOnBlur: true }}
        component={OrdersNavigation}
      />
      <Drawer.Screen name="Profile" component={ProfileNavigation} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Driver" component={DriverNavigation} />
      <Drawer.Screen name="Chatroom" component={Chatroom} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
