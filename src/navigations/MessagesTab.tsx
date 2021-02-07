import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withTheme } from "../styles/styled-components";
import { ThemeProps, WithThemeFnInterface } from "styled-components";
import MessagesContent from "../screens/home/MessagesContent";
const Tab = createMaterialTopTabNavigator();

interface IProps extends ThemeProps<any> {}
const ProfileTab: React.FC<IProps> = ({ theme }) => {
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
        component={MessagesContent}
      />
      <Tab.Screen
        name="COMPLETED"
        options={{ title: "COMPLETED" }}
        component={MessagesContent}
      />
    </Tab.Navigator>
  );
};

export default withTheme(ProfileTab);
