import React from "react";
import styled from "../styles/styled-components";

const Container = styled.View`
  width: 100%;
  margin-bottom: 28px;
`;
const Wrapper = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.grey50};
  border-radius: ${(props) => props.theme.borderRadius};
  border: solid 1px ${(props) => props.theme.colors.main};
  flex-direction: row;
  align-items: center;
  padding: 0px 18px;
`;

const Prefix = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  margin-right: 4px;
`;
const Suffix = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  margin-left: 4px;
`;

const InputField = styled.TextInput`
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.colors.grey700};
  width: 100%;
  padding: 16px 0px;
`;

const Label = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  font-size: 16px;
  margin-left: 8px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.grey700};
`;
interface IProps {
  placeholder?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  secureTextEntry?: boolean;
  prefix?: string;
  suffix?: string;
  label?: string;
  multiline?: boolean;
  type?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | undefined;
}
const FormInput: React.FC<IProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  secureTextEntry = false,
  label,
  multiline = false,
  prefix,
  suffix,
  type = "default",
}) => (
  <Container>
    {label && <Label>{label}</Label>}
    <Wrapper>
      <Prefix>{prefix}</Prefix>
      <InputField
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        keyboardType={type}
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => onChange(value)}
        multiline={multiline}
      />
      <Suffix>{suffix}</Suffix>
    </Wrapper>
  </Container>
);
export default FormInput;
