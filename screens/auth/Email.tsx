import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styled from "../../styles/styled-components";
import icon from "../../assets/icon.png";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const LogoContainer = styled.View`
  flex: 6;
  padding: 30%;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.View`
  flex: 4;
  padding: 20px;
`;
const Logo = styled.Image`
  height: 80px;
  width: 80px;
  margin-bottom: 24px;
`;

const Name = styled.Text`
  color: white;
  font-size: 24px;
  text-align: center;
  font-family: ${(props) => props.theme.mainFontBold};
`;

const InputWrapper = styled.View`
  margin-bottom: 12px;
  width: 100%;
`;
const Email = ({}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <LogoContainer>
            <Logo source={icon} resizeMode="contain" />
            <Name>WAYE</Name>
          </LogoContainer>
          <ContentContainer>
            <InputWrapper>
              <Input
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputWrapper>
            <Button
              onPress={() => {
                setIsLoading(!isLoading);
              }}
              loading={isLoading}
              title="NEXT"
            />
          </ContentContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Email;
