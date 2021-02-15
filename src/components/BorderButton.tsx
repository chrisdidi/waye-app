import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "../styles/styled-components";

const TouchableOpacity = styled.TouchableOpacity``;

const Container = styled.View`
  padding: 12px 16px;
  border-radius: 12px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.main};
  border-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  color: ${(props) => props.theme.colors.main};
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

interface IProps {
  label?: string;
  onPress?: any;
  disabled?: boolean;
  loading?: boolean;
}
const BorderButton: React.FC<IProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity onPress={disabled ? () => {} : onPress}>
      <Container>
        {loading && <ActivityIndicator />}
        <Label>{label}</Label>
      </Container>
    </TouchableOpacity>
  );
};

export default BorderButton;
