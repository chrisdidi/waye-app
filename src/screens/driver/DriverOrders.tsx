import React from "react";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import styled from "../../styles/styled-components";
import { FontAwesome } from "@expo/vector-icons";
import DriverOrdersTab from "../../navigations/DriverOrdersTab";

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 16px;
  padding-top: ${Constants.statusBarHeight + 12}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoldWhiteText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: white;
  font-size: 24px;
`;

const DriverOrders: React.FC<any> = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome name="reorder" size={24} color="white" />
        </TouchableOpacity>
        <BoldWhiteText>Orders</BoldWhiteText>
      </Header>
      <DriverOrdersTab />
    </Container>
  );
};

export default DriverOrders;
