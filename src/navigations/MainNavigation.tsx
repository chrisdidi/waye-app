import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import useMe from "../hooks/useMe";
import { ActivityIndicator, View } from "react-native";
import styled from "../styles/styled-components";
import HomeNavigation from "./HomeNavigation";
import Name from "../screens/setup/Name";
import { MeStore } from "../context/MeStore";
import MainDrawer from "./MainDrawer";

const Stack = createStackNavigator();

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const MainNavigation = () => {
  const { data, loading } = useContext(MeStore);
  return loading || !data ? (
    <LoadingContainer>
      <ActivityIndicator color="white" />
    </LoadingContainer>
  ) : data.users?.length > 0 && data.users[0].name ? (
    <MainDrawer />
  ) : (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Setup" component={Name} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
