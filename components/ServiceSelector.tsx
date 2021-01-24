import React from "react";
import styled from "../styles/styled-components";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import * as Haptics from "expo-haptics";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProps, withTheme } from "styled-components";
import { theme } from "../styles/theme";

const Container = styled.TouchableWithoutFeedback``;

const Box = styled.View`
  display: flex;
  width: 160px;
  height: 100px;
  border-radius: 40px;
  position: relative;
  elevation: 1;
  background-color: white;
  margin: 8px 12px;
  shadow-offset: 0px 3px;
  shadow-color: ${(props) => props.theme.colors.secondary};
  shadow-opacity: 0.3;
`;

const InsideBox = styled.View`
  flex: 1;
  border-radius: 40px;
  flex-direction: row;
  overflow: hidden;
`;
const EmojiBox = styled.View`
  background-color: ${(props) => props.theme.colors.grey50};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.View`
  background-color: white;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;
const CenterText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

const CheckBox = styled.View`
  height: 28px;
  width: 28px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.secondary};
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 8px;
  margin-top: -8px;
  align-items: center;
  justify-content: center;
`;
interface IProps extends ThemeProps<any> {
  emoji: string;
  name: string;
  onPress: any;
  isSelected: boolean;
}
const ServiceSelector: React.FC<IProps> = ({
  emoji,
  name,
  onPress,
  isSelected,
}) => {
  return (
    <Container
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <Box>
        <InsideBox>
          <EmojiBox>
            <CenterText>{emoji}</CenterText>
          </EmojiBox>
          <TextBox>
            <CenterText>{name}</CenterText>
          </TextBox>
        </InsideBox>
        {isSelected && (
          <CheckBox>
            <FontAwesome name="check" size={18} color={theme.colors.main} />
          </CheckBox>
        )}
      </Box>
    </Container>
  );
};

export default withTheme(ServiceSelector);
