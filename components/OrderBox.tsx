import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "../styles/styled-components";
import { OrderType } from "../type";
import { Ionicons } from "@expo/vector-icons";

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
  padding: 16px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GrayText = styled.Text`
  color: ${(props) => props.theme.colors.grey500};
`;

const StatusCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.yellow400};
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
          <GrayText>Order #{order.id}</GrayText>
          {showDetails ? (
            <Ionicons name="chevron-up" size={16} color="gray" />
          ) : (
            <Ionicons name="chevron-down" size={16} color="gray" />
          )}
        </Top>
        <StatusCircle />
      </TouchableOpacity>
    </Container>
  );
};

export default OrderBox;
