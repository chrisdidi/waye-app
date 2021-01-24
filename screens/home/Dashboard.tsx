import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styled from "../../styles/styled-components";
import Constants from "expo-constants";
import Icon from "../../assets/icon.png";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  height: auto;
  width: 100%;
  padding: 16px;
  padding-top: ${Constants.statusBarHeight + 16}px;
  background-color: ${(props) => props.theme.colors.secondary};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Touchable = styled.TouchableOpacity``;

const Logo = styled.Image`
  height: 40px;
  width: 40px;
`;

const Body = styled.ScrollView`
  flex: 1;
  background-color: pink;
`;
const Dashboard = ({ navigation }: any) => {
  console.log(navigation);
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome size={24} name="reorder" color="white" />
        </Touchable>
        <Logo source={Icon} />
        <Touchable
          onPress={() => {
            navigation.navigate("MessagesList");
          }}
        >
          <FontAwesome size={24} name="paper-plane" color="white" />
        </Touchable>
      </Header>
      <Body></Body>
    </Container>
  );
};

export default Dashboard;
