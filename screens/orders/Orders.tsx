import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Orders = ({ navigation }: any) => {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Text>Orders</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Orders;
