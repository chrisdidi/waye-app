import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "../styles/styled-components";

const Container = styled.View`
    flex: 1;
    absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.Text`
  color: white;
`;
const LoadingScreen = () => {
  return (
    <Container>
      <ActivityIndicator color="white" />
      <Text>Loading...</Text>
    </Container>
  );
};

export default LoadingScreen;
