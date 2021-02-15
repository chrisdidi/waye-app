import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "../styles/styled-components";

const Container = styled.View`
  width: 100%;
  padding: 6px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const IdContainer = styled.View`
    border-radius: 50px;
    height: 80px;
    width: 80px;
    align-items: center;
    background-color: ${(props) => props.theme.colors.blue50}
    justify-content: center;
    flex-direction: column;
`;

const SmallGreyText = styled.Text`
  font-size: 10px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey400};
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;
const GreyText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey400};
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

const RightContainer = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
`;

const Col = styled.View``;

const BlackSemiBoldText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.grey700};
`;

const BlackBoldText = styled.Text`
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.grey700};
`;

const BlackSmallText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  font-size: 12px;
  color: ${(props) => props.theme.colors.grey500};
`;
interface IProps {
  unseenMessages?: number;
  previewMessage?: string;
  orderId: number;
  serviceType: string;
}
const MessageRow: React.FC<IProps> = ({
  unseenMessages,
  previewMessage,
  orderId,
  serviceType,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chatroom", { orderId });
      }}
    >
      <Container>
        <IdContainer>
          <SmallGreyText>ORDER</SmallGreyText>
          <GreyText>#{orderId}</GreyText>
        </IdContainer>
        <RightContainer>
          <Col>
            <BlackSemiBoldText>
              {serviceType === "property" && "Property Viewing"}
            </BlackSemiBoldText>
            {unseenMessages !== undefined && unseenMessages > 0 ? (
              <GreyText>{unseenMessages} messages.</GreyText>
            ) : (
              <BlackSmallText>{previewMessage}</BlackSmallText>
            )}
          </Col>
        </RightContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default MessageRow;
