import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
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

const IDContainer = styled.View`
  width: auto;
  flex-direction: column;
`;

const Footer = styled.View`
  padding: 12px;
`;

interface IProps {
  order: OrderType;
}
const OrderBox: React.FC<IProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <Container>
      <TouchableOpacity onPress={toggleDetails}>
        <Top>
          <IDContainer>
            <GrayText>Order #{order.id}</GrayText>
          </IDContainer>
          {showDetails ? (
            <Ionicons name="chevron-up" size={16} color="gray" />
          ) : (
            <Ionicons name="chevron-down" size={16} color="gray" />
          )}
        </Top>
      </TouchableOpacity>
      <Footer>
        <Status type={order.type} status={order.status} />
      </Footer>
    </Container>
  );
};

export default OrderBox;
