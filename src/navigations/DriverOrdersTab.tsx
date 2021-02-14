import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withTheme } from "../styles/styled-components";
import { ThemeProps } from "styled-components";
import { ScrollView } from "react-native";
import DriverOrderList from "../components/DriverOrderList";
const Tab = createMaterialTopTabNavigator();

interface IProps extends ThemeProps<any> {}
const DriverOrdersTab: React.FC<IProps> = ({ theme }) => {
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
        {(props) => (
          <ScrollView style={{ flex: 1, padding: 12 }}>
            <DriverOrderList
              {...props}
              status={[
                {
                  status: { _eq: "Ongoing" },
                },
                {
                  status: { _eq: "Waiting" },
                },
              ]}
            />
          </ScrollView>
        )}
      </Tab.Screen>
      <Tab.Screen name="COMPLETED" options={{ title: "COMPLETED" }}>
        {(props) => (
          <ScrollView style={{ flex: 1, padding: 12 }}>
            <DriverOrderList
              {...props}
              status={[{ status: { _eq: "Complete" } }]}
            />
          </ScrollView>
        )}
      </Tab.Screen>
      <Tab.Screen name="CANCELLED" options={{ title: "CANCELLED" }}>
        {(props) => (
          <ScrollView style={{ flex: 1, padding: 12 }}>
            <DriverOrderList
              {...props}
              status={[{ status: { _eq: "Cancelled" } }]}
            />
          </ScrollView>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default withTheme(DriverOrdersTab);
