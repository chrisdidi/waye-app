import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withTheme } from "../styles/styled-components";
import { ThemeProps } from "styled-components";
import DriverMessagesContent from "../screens/home/DriverMessagesContent";
const Tab = createMaterialTopTabNavigator();

interface IProps extends ThemeProps<any> {}
const DriverMessagesTab: React.FC<IProps> = ({ theme }) => {
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
      <Tab.Screen
        name="ONGOING"
        options={{ title: "ON GOING" }}
        initialParams={{ status: "Ongoing" }}
        component={DriverMessagesContent}
      />
      <Tab.Screen
        name="COMPLETED"
        options={{ title: "COMPLETED" }}
        initialParams={{ status: "Complete" }}
        component={DriverMessagesContent}
      />
    </Tab.Navigator>
  );
};

export default withTheme(DriverMessagesTab);
