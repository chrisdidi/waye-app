import React from "react";
import { View } from "react-native";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 20px;
`;

const LogoContainer = styled.View`
  flex: 6;
`;

const ContentContainer = styled.View`
  flex: 4;
`;
const Email = ({}) => {
  return (
    <Container>
      <LogoContainer></LogoContainer>
      <ContentContainer></ContentContainer>
    </Container>
  );
};

export default Email;
