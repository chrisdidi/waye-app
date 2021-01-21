import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import styled from "../styles/styled-components";

const Container = styled.View`
  width: 100%;
  padding: 16px 18px;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.mainFontSemiBold};
  text-align: center;
`;

interface IProps {
  title: string;
  onPress: any;
  disabled?: boolean;
  loading?: boolean;
}
const Button: React.FC<IProps> = ({
  disabled = false,
  title,
  loading,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Container>
        <Title>
          {loading ? <ActivityIndicator size={17} color="white" /> : title}
        </Title>
      </Container>
    </Pressable>
  );
};

export default Button;
