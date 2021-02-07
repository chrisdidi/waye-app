import React from "react";
import { DefaultTheme, ThemeProps } from "styled-components";
import { ORDER_STATUS } from "../enum";
import styled, { withTheme } from "../styles/styled-components";
import * as Animatable from "react-native-animatable";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Label = styled.Text<{ color: string }>`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.color};
`;

const StatusBall = styled.View<{ color: string }>`
  height: 12px;
  width: 12px;
  border-radius: 12px;
  margin-right: 6px;
  background-color: ${(props) => props.color};
  position: relative;
  align-items: center;
  justify-content: center;
`;
const InnerBall = styled.View<{ color: string }>`
  height: 14px;
  width: 14px;
  border-radius: 12px;
  background-color: ${(props) => props.color};
  opacity: 0.5;
  align-items: center;
  justify-content: center;
`;
interface IProps extends ThemeProps<DefaultTheme> {
  status?: ORDER_STATUS;
  type: string;
}

const Status: React.FC<IProps> = ({ status, type, theme }) => {
  let message = () => {
    switch (status) {
      case "Waiting":
        return "Looking for a driver...";
      case "Cancelled":
        return "Order has been canceled!";
      case "Complete":
        return "Order completed!";
      default:
        return type === "property"
          ? "Driver is viewing your property..."
          : "Driver is picking your order up...";
    }
  };

  let color = () => {
    switch (status) {
      case "Waiting":
        return theme.colors.yellow400;
      case "Cancelled":
        return theme.colors.red400;
      case "Complete":
        return theme.colors.green400;
      default:
        return theme.colors.blue400;
    }
  };
  return (
    <Container>
      <StatusBall color={color()}>
        {(status === "Waiting" || status === "Ongoing") && (
          <Animatable.View
            animation={{
              0: { scaleX: 1, scaleY: 1 },
              0.5: { scaleX: 1.5, scaleY: 1.5 },
              1: { scaleX: 1, scaleY: 1 },
            }}
            iterationCount="infinite"
          >
            <InnerBall color={color()} />
          </Animatable.View>
        )}
      </StatusBall>
      <Label color={color()}>{message()}</Label>
    </Container>
  );
};

export default withTheme(Status);
