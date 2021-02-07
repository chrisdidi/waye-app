import React from "react";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SmallText = styled.Text`
  color: ${(props) => props.theme.colors.grey700};
`;

const MessagesContent = () => {
  return (
    <Container>
      <SmallText>No history found.</SmallText>
    </Container>
  );
};

export default MessagesContent;
