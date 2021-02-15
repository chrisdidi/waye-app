import React, { useContext, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import styled from "../styles/styled-components";
import { OrderType } from "../type";
import { Ionicons } from "@expo/vector-icons";
import Status from "./Status";
import BorderButton from "./BorderButton";
import { gql, useMutation } from "@apollo/client";
import { ORDER_FRAGMENT } from "../fragments";
import { MeStore } from "../context/MeStore";
import { NotificationStore } from "../context/NotificationStore";

const Container = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.grey50};
  border-radius: ${(props) => props.theme.borderRadius};
  overflow: hidden;
  margin-bottom: 16px;
`;

const Top = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.blue50};
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GrayText = styled.Text`
  color: ${(props) => props.theme.colors.grey500};
  margin-bottom: 4px;
`;

const SemiboldGrayText = styled.Text`
  color: ${(props) => props.theme.colors.grey500};
  margin-bottom: 4px;
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

const NoteLabel = styled.Text`
  color: ${(props) => props.theme.colors.grey700};
  font-family: ${(props) => props.theme.mainFontSemiBold};
  margin-top: 12px;
`;

const IDContainer = styled.View`
  width: auto;
  flex-direction: column;
`;

const Footer = styled.View`
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.View`
  width: 100%;
  padding: 16px;
`;

interface IProps {
  order: OrderType;
}

const CANCEL_ORDER_MUTATION = gql`
  mutation cancelOrder($id: Int!) {
    update_order_by_pk(pk_columns: { id: $id }, _set: { status: Cancelled }) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;
const OrderBox: React.FC<IProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { data } = useContext(MeStore);
  const { toast } = useContext(NotificationStore);

  const [cancelOrder, { loading }] = useMutation(CANCEL_ORDER_MUTATION);
  const toggleDetails = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowDetails(!showDetails);
  };

  const onCancelOrder = ({ id }: any) => {
    cancelOrder({
      variables: {
        id,
      },
    }).catch((e) => {
      console.log(e);
      console.log(e.message);
      console.log(e.extensions);
      toast("An error has occured. Please try again.");
    });
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={toggleDetails}>
        <Top>
          <IDContainer>
            <GrayText>
              <GrayText>Order #{order.id}&nbsp;&nbsp;</GrayText>
              <SemiboldGrayText>
                {order.type === "property" && "Property Viewing"}
                {order.type === "shopping" && "Personal Shopper"}
              </SemiboldGrayText>
            </GrayText>
          </IDContainer>
          {showDetails ? (
            <Ionicons name="chevron-up" size={16} color="gray" />
          ) : (
            <Ionicons name="chevron-down" size={16} color="gray" />
          )}
        </Top>
      </TouchableWithoutFeedback>
      {showDetails && order.type === "property" && (
        <Body>
          <NoteLabel>Address:</NoteLabel>
          <SemiboldGrayText>{order.delivery_address}</SemiboldGrayText>
          <NoteLabel>Instructions:</NoteLabel>
          <SemiboldGrayText>{order.description || "N/A"}</SemiboldGrayText>
        </Body>
      )}
      {showDetails && order.type === "shopping" && (
        <Body>
          <NoteLabel>Delivery Address</NoteLabel>
          <SemiboldGrayText>{order.delivery_address}</SemiboldGrayText>
          <NoteLabel>Items</NoteLabel>
          <SemiboldGrayText>
            {order.description && decodeURI(order.description)}
          </SemiboldGrayText>
          <NoteLabel>Budget:</NoteLabel>
          <SemiboldGrayText>RM{order.budget}</SemiboldGrayText>
        </Body>
      )}
      <Footer>
        <Status type={order.type} status={order.status} />
        {order?.status === "Ongoing" && <BorderButton label="Message Driver" />}
        {order.status === "Waiting" && (
          <BorderButton
            label="Cancel"
            loading={loading}
            disabled={loading}
            onPress={() => {
              onCancelOrder({ id: order.id });
            }}
          />
        )}
      </Footer>
    </Container>
  );
};

export default OrderBox;
