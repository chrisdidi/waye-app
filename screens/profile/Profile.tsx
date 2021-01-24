import React from "react";
import { View, Text } from "react-native";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Profile = () => {
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
};

export default Profile;
