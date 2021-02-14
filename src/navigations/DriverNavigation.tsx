import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/driver/Dashboard";
import DriverOrders from "../screens/driver/DriverOrders";
import DriverMessages from "../screens/driver/DriverMessages";
import { DefaultTheme, StyledProps } from "styled-components";
import { withTheme } from "../styles/styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

interface IProps extends StyledProps<DefaultTheme> {}
const DriverNavigation: React.FC<IProps> = ({ theme }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="dashboard"
                size={24}
                color={focused ? theme.colors.main : theme.colors.grey400}
              />
            );
          },
        }}
        component={Dashboard}
        name="DriverDashboard"
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="history"
                size={24}
                color={focused ? theme.colors.main : theme.colors.grey400}
              />
            );
          },
        }}
        component={DriverOrders}
        name="DriverOrders"
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="chatbubbles"
                size={24}
                color={focused ? theme.colors.main : theme.colors.grey400}
              />
            );
          },
        }}
        component={DriverMessages}
        name="DriverMessages"
      />
    </Tab.Navigator>
  );
};

export default withTheme(DriverNavigation);
