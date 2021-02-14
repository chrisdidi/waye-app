import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import styled from "../../styles/styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { MeStore } from "../../context/MeStore";
import avatar from "../../assets/avatar.png";
import { NotificationStore } from "../../context/NotificationStore";
import FormInput from "../../components/FormInput";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/Button";
import { auth } from "../../firebaseConfig";
import { gql, useMutation } from "@apollo/client";
import { USERS_FRAGMENT } from "../../fragments";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 16px;
  padding-top: ${Constants.statusBarHeight + 12}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoldWhiteText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: white;
  font-size: 24px;
`;

const Body = styled.View`
  padding: 20px;
`;

const Avatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-right: 12px;
  background-color: ${(props) => props.theme.colors.grey100};
`;
const AvatarContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const PrimaryBoldText = styled.Text`
  color: ${(props) => props.theme.colors.main};
  font-family: ${(props) => props.theme.mainFontSemiBold};
  font-size: 12px;
`;

const FormContainer = styled.View`
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.grey100};
  padding: 16px;
  width: 100%;
  margin-top: 20px;
`;

const Footer = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SignOutText = styled.Text`
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 18px;
  text-align: center;
  color: ${(props) => props.theme.colors.red400};
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile($id: Int!, $set: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $set) {
      ...UsersPart
    }
  }
  ${USERS_FRAGMENT}
`;
interface FormType {
  name?: string;
  email?: string;
}
const Orders: React.FC<any> = ({ navigation }) => {
  const { data, loading, error } = useContext(MeStore);
  const { toast } = useContext(NotificationStore);
  const [authLoading, setAuthLoading] = useState(false);

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_PROFILE);
  const { control, watch, getValues, handleSubmit } = useForm<FormType>({
    defaultValues: {
      email: data.users[0]?.email,
      name: data.users[0]?.name,
    },
  });

  const toastError = () => {
    toast("Coming soon!");
  };

  const onSubmit = async () => {
    let { email, name } = getValues();
    if (email && email !== auth().currentUser?.email) {
      setAuthLoading(true);
      await auth()
        .currentUser?.updateEmail(email)
        .then(() => {
          updateUser({
            variables: {
              id: data?.users[0].id,
              set: {
                name,
                email,
              },
            },
          }).catch((e) => {
            toast("An error has occured. Try again later.");
          });
        })
        .catch((e) => {
          if (
            e.message ===
            "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
          ) {
            return toast("Please sign in again to update your email.");
          }
          return toast("An error has occured. Please try again later.");
        })
        .finally(() => {
          setAuthLoading(false);
        });
    } else {
      updateUser({
        variables: {
          id: data?.users[0].id,
          set: {
            name,
            email,
          },
        },
      }).catch((e) => {
        toast("An error has occured. Try again later.");
      });
    }
  };
  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome name="reorder" size={24} color="white" />
        </TouchableOpacity>
        <BoldWhiteText>My Profile</BoldWhiteText>
      </Header>
      {loading && <ActivityIndicator />}
      {!loading && data && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Body>
            <TouchableOpacity onPress={toastError}>
              <AvatarContainer>
                <Avatar
                  source={
                    data?.users[0]?.avatar
                      ? { uri: data?.users[0]?.avatar }
                      : avatar
                  }
                />
                <PrimaryBoldText>Change Profile Photo</PrimaryBoldText>
              </AvatarContainer>
            </TouchableOpacity>
            <FormContainer>
              <Controller
                control={control}
                name="name"
                defaultValue={data?.users[0]?.name}
                render={({ onBlur, onChange, value }) => (
                  <FormInput
                    value={value}
                    onChange={onChange}
                    onBlur={() => {
                      Keyboard.dismiss();
                    }}
                    label="Name"
                    placeholder="Your name"
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                defaultValue={data?.users[0]?.email}
                render={({ onBlur, onChange, value }) => (
                  <FormInput
                    value={value}
                    onChange={onChange}
                    onBlur={() => {
                      Keyboard.dismiss();
                    }}
                    label="E-mail"
                    placeholder="your@email.com"
                  />
                )}
              />
              <Button
                onPress={handleSubmit(onSubmit)}
                loading={updateLoading || authLoading}
                disabled={
                  authLoading ||
                  updateLoading ||
                  watch().email === "" ||
                  watch().name === "" ||
                  (watch().email === data?.users[0]?.email &&
                    watch().name === data?.users[0]?.name)
                }
                title="Save Changes"
              />
            </FormContainer>
          </Body>
        </TouchableWithoutFeedback>
      )}
      <Footer>
        <TouchableOpacity
          onPress={() => {
            auth().signOut();
          }}
        >
          <SignOutText>Sign Out</SignOutText>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
};

export default Orders;
