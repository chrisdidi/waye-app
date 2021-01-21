import React from "react";
import { TextInput, View } from "react-native";
import styled from "../styles/styled-components";

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

interface IProps {
  placeholder: string;
  value: string;
  onChange: any;
}
const Input: React.FC<IProps> = ({ placeholder, value, onChange }) => (
  <Wrapper>
    <InputField placeholder={placeholder} value={value} onChange={onChange} />
  </Wrapper>
);
export default Input;
