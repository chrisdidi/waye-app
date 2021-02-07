import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import styled from "../../styles/styled-components";
import { Ionicons } from "@expo/vector-icons";
import MessagesTab from "../../navigations/MessagesTab";

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 16px;
  padding-top: ${Constants.statusBarHeight + 12}px;
  flex-direction: row;
  justify-content: space-between;
`;

const BoldWhiteText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: white;
  font-size: 24px;
`;

const MessagesList: React.FC<any> = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <BoldWhiteText>Messages</BoldWhiteText>
      </Header>
      <MessagesTab />
    </Container>
  );
};

export default MessagesList;
