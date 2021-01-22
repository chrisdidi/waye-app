import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import styled from "../../styles/styled-components";
import icon from "../../assets/icon.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import firebase from "../../firebaseConfig";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AuthNavStackParamList } from "../../navigations/AuthNavigation";
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const LogoContainer = styled.View`
  flex: 6;
  padding: 30%;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.View`
  flex: 4;
  padding: 20px;
`;
const Logo = styled.Image`
  height: 80px;
  width: 80px;
  margin-bottom: 24px;
`;

const Name = styled.Text`
  color: white;
  font-size: 24px;
  text-align: center;
  font-family: ${(props) => props.theme.mainFontBold};
`;

const InputWrapper = styled.View`
  margin-bottom: 12px;
  width: 100%;
`;

type Inputs = {
  email: string;
};

type EmailScreenNavigationProp = StackNavigationProp<
  AuthNavStackParamList,
  "Email"
>;
type Props = {
  route: EmailScreenNavigationProp;
  navigation: EmailScreenNavigationProp;
};
const Email = ({ navigation }: Props) => {
  const { control, handleSubmit, watch, errors } = useForm<Inputs>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkEmail = ({ email }: Inputs) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        email,
        "adskfj12123ihlakjdjfa124j27tgyajbjhasfd8o7yp23q"
      )
      .catch((e) => {
        console.log(e.code);
        if (e.code === "auth/user-not-found") {
          navigation.navigate("Password", {
            email,
            action: "signUp",
          });
        } else if (e.code === "auth/wrong-password") {
          navigation.navigate("Password", {
            email,
            action: "signIn",
          });
        } else {
          Alert.alert("You tried too many times! Try again later!");
        }
      });
  };
  console.log(errors);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <LogoContainer>
            <Logo source={icon} resizeMode="contain" />
            <Name>WAYE</Name>
          </LogoContainer>
          <ContentContainer>
            {errors.email?.type === "pattern" && (
              <ErrorMessage message="Please enter a valid email!" />
            )}
            <InputWrapper>
              <Controller
                name="email"
                rules={{
                  min: 5,
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }}
                defaultValue=""
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder="example@email.com"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </InputWrapper>
            <Button
              onPress={handleSubmit(checkEmail)}
              loading={isLoading}
              title="NEXT"
            />
          </ContentContainer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Email;
