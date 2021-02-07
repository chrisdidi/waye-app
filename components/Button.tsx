import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { DefaultTheme, ThemeProps } from "styled-components";
import styled, { withTheme } from "../styles/styled-components";

const Container = styled.View<any>`
  width: 100%;
  padding: 16px 18px;
  background-color: ${(props) => props.bgColor};
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.mainFontSemiBold};
  text-align: center;
`;

interface IProps extends ThemeProps<DefaultTheme> {
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
  theme,
}) => {
  return (
    <TouchableOpacity onPress={disabled ? () => {} : onPress}>
      <Container bgColor={disabled ? theme.colors.grey300 : theme.colors.main}>
        <Title>
          {loading ? <ActivityIndicator size={17} color="white" /> : title}
        </Title>
      </Container>
    </TouchableOpacity>
  );
};

export default withTheme(Button);
