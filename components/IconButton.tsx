import React, { useState } from "react";

import {
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styled from "../styles/styled-components";

const Wrapper = styled.View<any>`
  opacity: ${(props) => props.opacity};
    min-height: ${(props) => props?.size}px;
    min-width: ${(props) => props?.size}px;
    border-radius: ${(props) => (props?.size * 40) / 100}px;
    background-color: ${(props) => props.theme.colors.main}
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px rgba(250, 128, 113, 0.4);
    elevation: 2;
`;

interface IProps {
  onPress: any;
  loading: any;
  icon: any;
  size?: any;
  disabled?: boolean;
}

const IconButton: React.FC<IProps> = ({
  onPress,
  loading,
  icon,
  size = 40,
  disabled = false,
}) => {
  const animatePress = new Animated.Value(1);

  const animateIn = () => {
    Animated.timing(animatePress, {
      toValue: 0.7,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = () => {
    Animated.timing(animatePress, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={() => animateIn()}
      onPressOut={() => animateOut()}
      onPress={disabled ? () => {} : onPress}
      disabled={loading}
    >
      <Animated.View
        style={{
          transform: [
            {
              scale: animatePress,
            },
          ],
        }}
      >
        <Wrapper opacity={disabled ? 0.7 : 1} size={size}>
          {loading ? <ActivityIndicator /> : icon}
        </Wrapper>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
