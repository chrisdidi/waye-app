import {
  DrawerContentComponentProps,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MeStore } from "../context/MeStore";
import { auth } from "../firebaseConfig";
import styled from "../styles/styled-components";
import avatar from "../assets/avatar.png";

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 4;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Body = styled.View`
  flex: 5;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Footer = styled.View`
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MenuContainer = styled.View`
  flex: 2;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SignOutContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
`;

const SignOutButton = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.theme.colors.red500};
  font-size: 18px;
`;

const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 24px;
  margin-right: 12px;
`;

const AvatarContainer = styled.TouchableOpacity`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

interface IProps extends DrawerContentComponentProps<any> {}

const DrawerMenu: React.FC<IProps> = ({ navigation }) => {
  const { data } = useContext(MeStore);
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <AvatarContainer>
            <Avatar
              source={
                Boolean(data.users[0]?.avatar)
                  ? { uri: data.users[0].avatar }
                  : avatar
              }
            />
            <MenuItem>{data.users[0].name}</MenuItem>
          </AvatarContainer>
        </Header>
        <Body>
          <MenuContainer>
            <MenuItem>Home</MenuItem>
            <MenuItem>Orders</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Help</MenuItem>
          </MenuContainer>
          <SignOutContainer>
            <TouchableOpacity
              onPress={() => {
                auth().signOut();
              }}
            >
              <SignOutButton>Sign Out</SignOutButton>
            </TouchableOpacity>
          </SignOutContainer>
        </Body>
        <Footer></Footer>
      </SafeAreaView>
    </Container>
  );
};

export default DrawerMenu;
