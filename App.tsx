import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import firebase from "./firebaseConfig";
import { theme } from "./styles/theme";
import { ThemeProvider } from "./styles/styled-components";
import AuthNavigation from "./navigations/AuthNavigation";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn === null && <AppLoading />}
      <ThemeProvider theme={theme}>
        <View style={{ flex: 1 }}>
          {isLoggedIn !== null &&
            (isLoggedIn ? (
              <View style={styles.container}>
                <Text>Logged In</Text>
              </View>
            ) : (
              <AuthNavigation />
            ))}
        </View>
      </ThemeProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
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
