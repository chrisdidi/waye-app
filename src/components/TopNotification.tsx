import React, { useContext, useEffect } from "react";
import { NotificationStore } from "../context/NotificationStore";
import { StatusBarHeight } from "../StatusBarHeight";
import styled from "../styles/styled-components";
import * as Animatable from "react-native-animatable";

const BigContainer = styled.View`
  width: 100%;
  z-index: 100;
  position: absolute;
`;
const Container = styled.View`
  padding: 8px;
  padding-top: ${StatusBarHeight + 6}px;
  background-color: ${(props) => props.theme.colors.main};
`;

const MessageText = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;
const TopNotification = () => {
  const { message, dismiss } = useContext(NotificationStore);

  useEffect(() => {
    let timeout: any;
    if (message !== null) {
      timeout = setTimeout(() => {
        dismiss();
      }, 2500);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [message]);
  return message !== null ? (
    <BigContainer>
      <Animatable.View animation="fadeOutUp" easing="ease-in" delay={1500}>
        <Animatable.View
          animation="fadeInDown"
          easing="ease-out"
          duration={400}
        >
          <Container>
            <MessageText>{message}</MessageText>
          </Container>
        </Animatable.View>
      </Animatable.View>
    </BigContainer>
  ) : (
    <></>
  );
};

export default TopNotification;
