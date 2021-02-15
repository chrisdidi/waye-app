import React, { useContext } from "react";
import { DefaultTheme, ThemeProps } from "styled-components";
import styled, { withTheme } from "../styles/styled-components";
import { OrderType } from "../type";
import { TouchableOpacity } from "react-native";
import Button from "./Button";
import { gql, useMutation } from "@apollo/client";
import { ORDER_FRAGMENT } from "../fragments";
import { MeStore } from "../context/MeStore";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const ShadowContainer = styled.View`
  width: 100%;
  border-radius: 16px;
`;
const Container = styled.View`
  margin-top: 12px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
`;

const Header = styled.View`
  width: 100%;
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
`;

const Footer = styled.View`
  width: 100%;
  padding: 16px;
  padding-top: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MainColorText = styled.Text`
  color: white;
`;

const SemiBoldText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

const LargeSemiboldText = styled.Text`
  font-size: 18px;
`;

const Body = styled.View`
  width: 100%;
  padding: 0px 16px;
`;

const ACCEPT_ORDER_MUTATION = gql`
  mutation acceptOrder($id: Int!, $driver_id: Int!) {
    update_order_by_pk(
      pk_columns: { id: $id }
      _set: { status: Ongoing, driver_id: $driver_id }
    ) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;

const COMPLETE_ORDER_MUTATION = gql`
  mutation completeOrder($id: Int!) {
    update_order_by_pk(pk_columns: { id: $id }, _set: { status: Complete }) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;

const CompleteButton = styled.View`
  background-color: ${(props) => props.theme.colors.green400};
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 12px;
`;
interface IProps extends ThemeProps<DefaultTheme> {
  order: OrderType;
}

const DriverOrderBox: React.FC<IProps> = ({ order, theme }) => {
  const navigation = useNavigation();
  const [acceptOrder, { loading, data }] = useMutation(ACCEPT_ORDER_MUTATION);
  const [
    completeOrder,
    { loading: completeLoading, data: completeData },
  ] = useMutation(COMPLETE_ORDER_MUTATION);
  const { data: meData } = useContext(MeStore);
  let backgroundColor = theme.colors.main;
  if (order.type === "property") {
    backgroundColor = theme.colors.blue400;
  }
  if (order.type === "shopping") {
    backgroundColor = theme.colors.indigo400;
  }

  const onAcceptOrder = () => {
    acceptOrder({
      variables: {
        id: order.id,
        driver_id: meData?.users[0]?.id,
      },
    })
      .then(() => {
        navigation.navigate("DriverOrders");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onCompleteOrder = () => {
    completeOrder({
      variables: {
        id: order.id,
      },
    }).catch((e) => {
      console.log(e);
    });
  };
  return (
    <ShadowContainer
      style={{
        shadowColor: backgroundColor,
        shadowOffset: {
          height: 4,
          width: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      }}
    >
      <Container style={{ backgroundColor }}>
        <Header>
          <MainColorText>Order #{order.id}</MainColorText>
          <MainColorText>
            <SemiBoldText>
              {order.type === "property" && "Property Viewing"}
              {order.type === "shopping" && "Personal Shopper"}
            </SemiBoldText>
          </MainColorText>
        </Header>
        {order.type === "shopping" && (
          <Body>
            <MainColorText>
              <SemiBoldText>
                <LargeSemiboldText>Description{`\n`}</LargeSemiboldText>
              </SemiBoldText>
              <MainColorText>
                {typeof order.description === "string" &&
                  decodeURI(order.description)}
                {`\n`}
              </MainColorText>
            </MainColorText>
            <MainColorText>
              <SemiBoldText>
                <LargeSemiboldText>Budget</LargeSemiboldText>
              </SemiBoldText>
            </MainColorText>
            <MainColorText>
              RM{order.budget}
              {`\n`}
            </MainColorText>
            <MainColorText>
              <SemiBoldText>
                <LargeSemiboldText>Delivery Address</LargeSemiboldText>
              </SemiBoldText>
            </MainColorText>
            <MainColorText>
              {order.delivery_address}
              {`\n`}
            </MainColorText>
          </Body>
        )}
        {order.type === "property" && (
          <Body>
            <MainColorText>
              <SemiBoldText>
                <LargeSemiboldText>Instructions{`\n`}</LargeSemiboldText>
              </SemiBoldText>
              <MainColorText>
                <MainColorText>
                  {typeof order.description === "string" &&
                    decodeURI(order.description)}
                  {`\n`}
                  {`\n`}
                </MainColorText>
                <SemiBoldText>
                  <LargeSemiboldText>Viewing Address{`\n`}</LargeSemiboldText>
                </SemiBoldText>
              </MainColorText>
              <MainColorText>
                {order.delivery_address}
                {`\n`}
              </MainColorText>
            </MainColorText>
          </Body>
        )}
        <Footer>
          <MainColorText>
            <SemiBoldText>
              Earn: RM {order.type === "property" && 20}
              {order.type === "shopping" && 35}
            </SemiBoldText>
          </MainColorText>
          {order.status === "Waiting" && (
            <Button
              title={"Accept Order"}
              onPress={onAcceptOrder}
              loading={loading}
              disabled={loading}
            />
          )}

          {order.status === "Ongoing" && (
            <Button
              title={"Send Message"}
              onPress={() => {
                navigation.navigate("Chatroom", {
                  orderId: order.id,
                });
              }}
              loading={loading}
              disabled={loading}
            />
          )}
        </Footer>
        {order.status === "Ongoing" && (
          <Footer>
            <TouchableOpacity
              onPress={completeLoading ? () => {} : onCompleteOrder}
              style={{ width: "100%" }}
            >
              <CompleteButton>
                <MainColorText>
                  <SemiBoldText>Complete</SemiBoldText>
                </MainColorText>
              </CompleteButton>
            </TouchableOpacity>
          </Footer>
        )}
      </Container>
    </ShadowContainer>
  );
};

export default withTheme(DriverOrderBox);
