import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "../../styles/styled-components";
import IconButton from "../../components/IconButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavStackParamList } from "../../navigations/AuthNavigation";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { RouteProp } from "@react-navigation/native";
import Button from "../../components/Button";
import firebase from "../../firebaseConfig";
import ErrorMessage from "../../components/ErrorMessage";
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Content = styled.View`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BoldText = styled.Text`
color: ${(props) => props.theme.colors.main}
  font-family: ${(props) => props.theme.mainFontSemiBold};
  font-size: 18px;
  margin-left: 12px;
`;

const PasswordContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 100%;
`;
type PasswordScreenNavigationProp = StackNavigationProp<
  AuthNavStackParamList,
  "Password"
>;

interface FormTypes {
  password: string;
}

type PasswordScreenRouteProp = RouteProp<AuthNavStackParamList, "Password">;
type Props = {
  route: PasswordScreenRouteProp;
  navigation: PasswordScreenNavigationProp;
};
const Password = ({ navigation, route }: Props) => {
  const { email, action } = route.params;
  const { control, errors, handleSubmit } = useForm<FormTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  console.log(errors);
  const onSubmit = ({ password }: FormTypes) => {
    setAuthLoading(true);
    if (action === "signIn") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setAuthLoading(false);
        })
        .catch((e) => {
          Alert.alert(e.message);
          setAuthLoading(false);
        });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setAuthLoading(false);
        })
        .catch((e) => {
          Alert.alert(e.message);
          setAuthLoading(false);
        });
    }
  };
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          <IconButton
            loading={isLoading}
            onPress={() => {
              navigation.goBack();
            }}
            icon={<FontAwesome5 name="caret-left" size={24} color="white" />}
          />
          <BoldText>
            {action === "signUp"
              ? "Seems like you're new here!"
              : "Welcome back! " + email}
          </BoldText>
        </Content>
        <PasswordContainer>
          {errors?.password?.type === "min" && (
            <ErrorMessage message="Password must be longer than 6 characters!" />
          )}
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              min: 6,
              required: true,
            }}
            render={({ value, onChange, onBlur }) => (
              <Input
                label="Password"
                secureTextEntry={true}
                placeholder="******"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <ButtonContainer>
            <Button
              loading={authLoading}
              onPress={handleSubmit(onSubmit)}
              title={action === "signIn" ? "SIGN IN" : "CREATE ACCOUNT"}
            />
          </ButtonContainer>
        </PasswordContainer>
      </SafeAreaView>
    </Container>
  );
};

export default Password;
