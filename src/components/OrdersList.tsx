import { gql, useSubscription } from "@apollo/client";
import React, { useContext } from "react";
import { ActivityIndicator, Text } from "react-native";
import { MeStore } from "../context/MeStore";
import { ORDER_STATUS } from "../enum";
import { ORDER_FRAGMENT } from "../fragments";
import styled from "../styles/styled-components";
import { OrderType } from "../type";
import OrderBox from "./OrderBox";

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
`;

const GET_ORDERS = gql`
  subscription getOrders($where: order_bool_exp!) {
    order(where: $where, order_by: { created_at: asc }) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;
interface IProps {
  status: any[];
}
const OrdersList: React.FC<IProps> = ({ status }) => {
  const { data: meData } = useContext(MeStore);
  const { data, loading, error } = useSubscription<{ order?: OrderType[] }>(
    GET_ORDERS,
    {
      fetchPolicy: "network-only",
      variables: {
        where: {
          _and: [
            {
              user_id: {
                _eq: meData.users[0].id,
              },
            },
            {
              _or:
                status.length > 0 ? status : [{ status: { _is_null: false } }],
            },
          ],
        },
      },
    }
  );
  return (
    <Container>
      {loading && <ActivityIndicator />}
      {!loading &&
        (data?.order && data?.order?.length > 0 ? (
          data?.order?.map((order, index) => (
            <OrderBox order={order} key={index} />
          ))
        ) : (
          <Text>No order found.</Text>
        ))}
    </Container>
  );
};

export default OrdersList;
