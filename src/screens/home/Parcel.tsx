import React from "react";
import styled from "../../styles/styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundOverlayColors } from "../../constants";
import Button from "../../components/Button";

const Wrapper = styled(LinearGradient)`
  flex: 1;
  padding-top: 20%;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  shadow-color: ${(props) => props.theme.colors.grey700};
  shadow-opacity: 0.4;
  elevation: 2;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  padding: 28px 20px;
  position: relative;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 24px;
  color: ${(props) => props.theme.colors.secondary};
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 12px;
  align-self: center;
  padding-bottom: 28px;
  background-color: white;
  shadow-color: ${(props) => props.theme.colors.grey700};
  shadow-opacity: 0.2;
  elevation: 2;
`;
const Parcel = () => {
  return (
    <Wrapper colors={BackgroundOverlayColors}>
      <Container>
        <Title>Parcel{`\n`}Collection</Title>
      </Container>
      <ButtonContainer>
        <Button loading={false} title="Place Order" onPress={() => {}} />
      </ButtonContainer>
    </Wrapper>
  );
};

export default Parcel;
