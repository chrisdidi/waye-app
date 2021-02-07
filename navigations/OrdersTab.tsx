import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withTheme } from "../styles/styled-components";
import { ThemeProps } from "styled-components";
import MessagesContent from "../screens/home/MessagesContent";
import OrdersList from "../components/OrdersList";
const Tab = createMaterialTopTabNavigator();

interface IProps extends ThemeProps<any> {}
const OrdersTab: React.FC<IProps> = ({ theme }) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.colors.grey100,
      }}
      tabBarOptions={{
        activeTintColor: theme.colors.grey50,
        labelStyle: {
          fontFamily: theme.mainFontSemiBold,
        },
        indicatorContainerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        indicatorStyle: {
          backgroundColor: theme.colors.main,
          height: 4,
        },
      }}
    >
      <Tab.Screen name="INCOMPLETE" options={{ title: "ON GOING" }}>
        {(props) => <OrdersList {...props} status="ON GOING" />}
      </Tab.Screen>
      <Tab.Screen name="COMPLETED" options={{ title: "COMPLETED" }}>
        {(props) => <OrdersList {...props} status="Complete" />}
      </Tab.Screen>
      <Tab.Screen name="CANCELLED" options={{ title: "CANCELLED" }}>
        {(props) => <OrdersList {...props} status="Cancelled" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default withTheme(OrdersTab);
