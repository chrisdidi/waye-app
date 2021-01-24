import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import firebase from "./firebaseConfig";
import { theme } from "./styles/theme";
import { ThemeProvider } from "./styles/styled-components";
import AuthNavigation from "./navigations/AuthNavigation";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloProvider, makeVar } from "@apollo/client";
import client, { authTokenVar } from "./apolloClient";
import MainNavigation from "./navigations/MainNavigation";
import { MeProvider } from "./context/MeStore";
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        AsyncStorage.setItem("jwt", token);
        authTokenVar(token);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <ApolloProvider client={client}>
      {isLoggedIn !== null && fontsLoaded ? (
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <MeProvider>
              <View style={{ flex: 1 }}>
                {isLoggedIn !== null &&
                  (isLoggedIn ? <MainNavigation /> : <AuthNavigation />)}
              </View>
            </MeProvider>
          </ThemeProvider>
          <StatusBar style="auto" />
        </NavigationContainer>
      ) : (
        <AppLoading />
      )}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
