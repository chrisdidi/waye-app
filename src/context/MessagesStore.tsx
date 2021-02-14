import { gql, useSubscription } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MESSAGES_FRAGMENT } from "../fragments";
import { MeStore } from "./MeStore";
import { NotificationStore } from "./NotificationStore";

export const MessagesStore = createContext<any>(null);

const MESSAGES_SUBSCRIPTION = gql`
  subscription getMessages($id: Int!) {
    messages(
      where: { order: { user_id: { _eq: $id } } }
      order_by: { created_at: desc }
    ) {
      ...MessagesPart
    }
  }
  ${MESSAGES_FRAGMENT}
`;

const MessagesStoreProvider = ({ children }: any) => {
  const { data: meData } = useContext(MeStore);
  const { data, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: {
      id: meData?.users[0]?.id,
    },
    skip: !Boolean(meData?.users[0]?.id),
    fetchPolicy: "network-only",
    shouldResubscribe: true,
  });

  const { toast } = useContext(NotificationStore);

  const [messages, setMessages] = useState<any[] | null>(null);
  useEffect(() => {
    if (messages !== null && data?.messages.length > messages.length) {
      toast("Order #" + data.messages[0].id + ": You have a new message!");
      setMessages(data.messages);
    }
    if (data?.messages && messages === null) {
      setMessages(data.messages);
    }
  }, [data]);
  return (
    <MessagesStore.Provider value={{ messages }}>
      {children}
    </MessagesStore.Provider>
  );
};

export default MessagesStoreProvider;
