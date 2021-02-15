import { gql, useMutation, useSubscription } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ChatInput from "../../components/ChatInput";
import Message from "../../components/Message";
import { MeStore } from "../../context/MeStore";
import { MESSAGES_FRAGMENT } from "../../fragments";
import { StatusBarHeight } from "../../StatusBarHeight";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  padding: 16px;
  padding-top: ${StatusBarHeight + 16}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const VideoContainer = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.yellow100};
`;

const YellowSemiboldText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.theme.colors.yellow600};
`;
const ChatContainer = styled.ScrollView`
  flex: 6;
  background-color: white;
`;

const MessageListContainer = styled.View`
  width: 100%;
  min-height: 100%;
`;
const CenterView = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const GrayText = styled.Text`
  color: ${(props) => props.theme.colors.grey700};
`;

const WhiteBoldText = styled.Text`
  color: white;
  font-size: 18px;
  font-family: ${(props) => props.theme.mainFontBold};
`;
interface IProps {
  navigation: NavigationProp<any>;
  route: any;
}

const MESSAGES_SUBSCRIPTIONS = gql`
  subscription getMessages($orderId: Int!) {
    messages(
      where: { order_id: { _eq: $orderId } }
      order_by: { created_at: asc }
    ) {
      ...MessagesPart
    }
  }
  ${MESSAGES_FRAGMENT}
`;

const SEND_MESSAGE = gql`
  mutation insertMessage($message: String, $senderId: Int!, $orderId: Int!) {
    insert_messages_one(
      object: { message: $message, order_id: $orderId, sender_id: $senderId }
    ) {
      ...MessagesPart
    }
  }
  ${MESSAGES_FRAGMENT}
`;
const Chatroom: React.FC<IProps> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { data: meData } = useContext(MeStore);

  const scrollRef = useRef<any>(null);
  const [insertMessage, { loading: messageLoading }] = useMutation(
    SEND_MESSAGE
  );
  const [message, setMessage] = useState("");
  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTIONS, {
    variables: {
      orderId,
    },
  });

  const newMessage = () => {
    if (!messageLoading) {
      if (message.length > 0) {
        insertMessage({
          variables: {
            message,
            orderId,
            senderId: meData?.users[0].id,
          },
        })
          .then(() => {
            setMessage("");
            scrollRef.current.scrollToEnd();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <Container>
        <Header>
          <TouchableOpacity onPress={navigation.goBack}>
            <FontAwesome5 name="angle-left" size={28} color="white" />
          </TouchableOpacity>
          <WhiteBoldText>Order #{orderId}</WhiteBoldText>
        </Header>
        <VideoContainer>
          <YellowSemiboldText>Live Stream Coming Soon</YellowSemiboldText>
        </VideoContainer>
        <ChatContainer ref={scrollRef}>
          <MessageListContainer>
            {loading && (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            )}
            {!loading &&
              (data?.messages?.length > 0 ? (
                data.messages.map((message: any) => (
                  <Message message={message} key={message.id} />
                ))
              ) : (
                <CenterView>
                  <GrayText>No chat record yet.</GrayText>
                </CenterView>
              ))}
            <View style={{ width: "100%", height: 70 }}></View>
          </MessageListContainer>
        </ChatContainer>
        <ChatInput
          message={message}
          onMessageChange={(e: string) => {
            setMessage(e);
          }}
          onSend={newMessage}
        />
      </Container>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default Chatroom;
