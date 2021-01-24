import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigation from "./HomeNavigation";
import DrawerMenu from "../components/DrawerMenu";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerType={"front"}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={HomeNavigation} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
