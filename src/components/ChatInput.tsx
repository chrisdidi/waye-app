import React from "react";
import styled from "../styles/styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableOpacity } from "react-native";

const Container = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  padding-bottom: 20px;
  background-color: ${(props) => props.theme.colors.secondary};

  flex-direction: row;
`;

const Box = styled.View`
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 20px;
`;

const InputContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-right: 8px;
`;
const InputBox = styled.TextInput`
  padding: 8px;
  flex: 1;
  background-color: white;
  border-radius: 20px;
`;

interface IProps {
  message: string;
  onMessageChange: any;
  onSend: any;
}
const ChatInput: React.FC<IProps> = ({ message, onMessageChange, onSend }) => {
  return (
    <Container>
      <InputContainer>
        <InputBox
          value={message}
          onChangeText={(e) => {
            onMessageChange(e);
          }}
        ></InputBox>
      </InputContainer>
      <TouchableOpacity onPress={onSend}>
        <Box>
          <Ionicons name="md-paper-plane" size={18} color="white" />
        </Box>
      </TouchableOpacity>
    </Container>
  );
};

export default ChatInput;
