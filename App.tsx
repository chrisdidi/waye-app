import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import firebase from "./src/firebaseConfig";
import { theme } from "./src/styles/theme";
import { ThemeProvider } from "./src/styles/styled-components";
import AuthNavigation from "./src/navigations/AuthNavigation";
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
import MainNavigation from "./src/navigations/MainNavigation";
import { MeProvider } from "./src/context/MeStore";
import { StatusBarHeight } from "./src/StatusBarHeight";
import TopNotification from "./src/components/TopNotification";
import NotificationStoreProvider from "./src/context/NotificationStore";
import MessagesStoreProvider from "./src/context/MessagesStore";
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
      {isLoggedIn === null && !fontsLoaded ? (
        <AppLoading />
      ) : (
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <MeProvider>
              <NotificationStoreProvider>
                <View style={{ flex: 1 }}>
                  <TopNotification />
                  {isLoggedIn !== null &&
                    (isLoggedIn ? (
                      <MessagesStoreProvider>
                        <MainNavigation />
                      </MessagesStoreProvider>
                    ) : (
                      <AuthNavigation />
                    ))}
                </View>
              </NotificationStoreProvider>
            </MeProvider>
          </ThemeProvider>
          <StatusBar style="auto" />
        </NavigationContainer>
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
