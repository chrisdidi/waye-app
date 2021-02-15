import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { RefreshControl } from "react-native";
import MessageRow from "../../components/MessageRow";
import { MessagesStore } from "../../context/MessagesStore";
import { MeStore } from "../../context/MeStore";
import styled from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
const SmallText = styled.Text`
  color: ${(props) => props.theme.colors.grey700};
  padding: 24px 12px;
`;

const MESSAGES_SUBSCRIBE = gql`
  query getMessages($where: order_bool_exp!) {
    order(
      where: $where
      order_by: {
        chat_history_aggregate: { max: { created_at: desc_nulls_last } }
      }
    ) {
      id
      driver_id
      type
      chat_history_aggregate(where: { seen: { _eq: false } }) {
        aggregate {
          count(columns: id)
        }
      }
      chat_history {
        sender_id
        id
        created_at
        sender {
          name
        }
        message
      }
    }
  }
`;
const DriverMessagesContent = ({ route }: any) => {
  const { data: meData } = useContext(MeStore);
  const { messages } = useContext(MessagesStore);

  const { data, loading, error, refetch } = useQuery(MESSAGES_SUBSCRIBE, {
    variables: {
      where: {
        driver_id: { _eq: meData?.users[0]?.id },
        status: { _eq: route?.params?.status },
        latest_message: { _is_null: false },
      },
    },
    skip: !Boolean(meData?.users[0]?.id),
    notifyOnNetworkStatusChange: true,
  });

  const onRefresh = async () => {
    await refetch();
  };

  useEffect(() => {
    if (messages) {
      refetch();
    }
  }, [messages]);
  return (
    <Container>
      <ScrollContainer
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }
      >
        {!loading &&
          (data?.order?.length > 0 ? (
            data?.order.map((order: any) => (
              <MessageRow
                serviceType={order.type}
                previewMessage={order.chat_history[0]?.message}
                unseenMessages={order.chat_history_aggregate.aggregate.count}
                orderId={order.id}
                key={order.id}
              />
            ))
          ) : (
            <SmallText>No history found.</SmallText>
          ))}
      </ScrollContainer>
    </Container>
  );
};

export default DriverMessagesContent;
