import React from "react";
import { TextInput, View } from "react-native";
import styled from "../styles/styled-components";

const Container = styled.View`
  width: 100%;
`;
const Wrapper = styled.View`
  width: 100%;
  padding: 16px 18px;
  background-color: ${(props) => props.theme.colors.grey50};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const InputField = styled.TextInput`
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.colors.grey700};
`;

const Label = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  font-size: 16px;
  margin-left: 8px;
  margin-bottom: 8px;
  color: white;
`;
interface IProps {
  placeholder: string;
  value: any;
  onChange: any;
  onBlur: any;
  secureTextEntry?: boolean;
  label?: string;
}
const Input: React.FC<IProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  secureTextEntry = false,
  label,
}) => (
  <Container>
    {label && <Label>{label}</Label>}
    <Wrapper>
      <InputField
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => onChange(value)}
      />
    </Wrapper>
  </Container>
);
export default Input;
