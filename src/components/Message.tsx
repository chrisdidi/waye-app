import React, { useContext } from "react";
import { DefaultTheme, ThemeProps } from "styled-components";
import { MeStore } from "../context/MeStore";
import styled, { withTheme } from "../styles/styled-components";
import { MessageType } from "../type";

const Container = styled.View<any>`
  width: 100%;
  flex-direction: row;
  padding: 3px 6px;
  justify-content: ${(props) => props.justify};
`;

const MessageContainerWrapper = styled.View``;
const MessageContainer = styled.View<any>`
  background-color: ${(props) => props.bgColor};
  border-radius: 40px;
  padding: 12px;
  border-bottom-right-radius: ${(props) => props.bRight}px;
  border-bottom-left-radius: ${(props) => props.bLeft}px;
`;

const WhiteText = styled.Text<any>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

interface IProps extends ThemeProps<DefaultTheme> {
  message: MessageType;
}
const Message: React.FC<IProps> = ({ message, theme }) => {
  const { data } = useContext(MeStore);

  let isMe = message.sender_id === data?.users[0]?.id;
  return (
    <Container justify={isMe ? "flex-end" : "flex-start"}>
      <MessageContainerWrapper>
        <MessageContainer
          bLeft={isMe ? 40 : 0}
          bRight={isMe ? 0 : 40}
          bgColor={isMe ? theme.colors.main : theme.colors.grey50}
        >
          <WhiteText color={isMe ? "white" : theme.colors.grey700}>
            {message.message}
          </WhiteText>
        </MessageContainer>
      </MessageContainerWrapper>
    </Container>
  );
};

export default withTheme(Message);
