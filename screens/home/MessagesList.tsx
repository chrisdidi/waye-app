import React from "react";
import { View, Text } from "react-native";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const MessagesList = () => {
  return (
    <Container>
      <Text>Message List</Text>
    </Container>
  );
};

export default MessagesList;
