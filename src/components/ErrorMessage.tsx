import React from "react";
import { Text } from "react-native";
import styled from "../styles/styled-components";

const TextStyle = styled.Text`
  color: ${(props) => props.theme.colors.red500};
  font-family: ${(props) => props.theme.mainFontSemiBold};
  margin-bottom: 8px;
  text-align: center;
`;

interface IProps {
  message: string;
}
const ErrorMessage: React.FC<IProps> = ({ message }) => {
  return <TextStyle>{message}</TextStyle>;
};

export default ErrorMessage;
