import React, { useContext, useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import styled from "../../styles/styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { USERS_FRAGMENT } from "../../fragments";
import { MeStore } from "../../context/MeStore";
import { auth } from "../../firebaseConfig";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Header = styled.View`
  padding: 20px;
`;

const Body = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;
const Placeholder = styled.View`
  flex: 3;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.mainFontBold};
  color: ${(props) => props.theme.colors.main};
  font-size: 24px;
`;

const InputName = styled.TextInput.attrs({
  placeholderTextColor: "rgba(255,255,255,0.3)",
})`
  color: white;
  font-size: 24px;
  text-align: center;
  font-family: ${(props) => props.theme.mainFontSemiBold};
`;

const ButtonWrapper = styled.View`
  padding: 20px;
  padding-bottom: 28px;
  align-items: center;
  height: auto;
  width: 100%;
  justify-content: center;
`;

const INSERT_USER = gql`
  mutation insertUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      ...UsersPart
    }
  }
  ${USERS_FRAGMENT}
`;
const Name = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, { loading, error }] = useMutation(INSERT_USER);

  console.log(error);
  const { refetch } = useContext(MeStore);
  const onSubmit = () => {
    setIsLoading(true);
    newUser({
      variables: {
        object: {
          firebase_id: auth().currentUser?.uid,
          email: auth().currentUser?.email,
          name,
        },
      },
    }).then(() => {
      refetch().then(() => {
        setIsLoading(false);
      });
    });
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Header>
            <Title>Welcome to WAYE! What's your name?</Title>
          </Header>
          <Body>
            <InputName
              autoFocus={true}
              placeholder="YOUR NAME"
              value={name}
              onChangeText={(e) => {
                setName(e);
              }}
            />
          </Body>
          <Placeholder />
          <ButtonWrapper>
            <IconButton
              loading={isLoading}
              onPress={onSubmit}
              size={60}
              disabled={name === "" || isLoading}
              icon={<FontAwesome name="check" color="white" size={28} />}
            />
          </ButtonWrapper>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
  );
};

export default Name;
