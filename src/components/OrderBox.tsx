import React, { useContext, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import styled from "../styles/styled-components";
import { OrderType } from "../type";
import { Ionicons } from "@expo/vector-icons";
import Status from "./Status";

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

const SemiBoldWhiteText = styled.Text`
  color: white;
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

const MessageButton = styled.View`
  background-color: ${(props) => props.theme.colors.blue400};
  padding: 6px;
  border-radius: 12px;
  elevation: 1;
  box-shadow: 0px 1px 2px rgba(60, 60, 60, 0.3);
`;

interface IProps {
  order: OrderType;
}
const OrderBox: React.FC<IProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowDetails(!showDetails);
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
        {order?.status === "Ongoing" && (
          <TouchableWithoutFeedback>
            <MessageButton>
              <Ionicons name="chatbubbles" size={14} color="white" />
            </MessageButton>
          </TouchableWithoutFeedback>
        )}
      </Footer>
    </Container>
  );
};

export default OrderBox;
