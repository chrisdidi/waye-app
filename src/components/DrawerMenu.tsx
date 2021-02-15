import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MeStore } from "../context/MeStore";
import { auth } from "../firebaseConfig";
import styled from "../styles/styled-components";
import avatar from "../assets/avatar.png";

const Container = styled.View`
  flex: 1;
  width: 100%;
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
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top-right-radius: 40px;
  border: solid 4px ${(props) => props.theme.colors.main};
  border-bottom-width: 0px;
  border-left-width: 0px;
  background-color: ${(props) => props.theme.colors.secondary};
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

const FooterSmallText = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.mainFont};
  font-size: 16px;
  margin-bottom: 4px;
`;

const FooterText = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 18px;
`;

interface IProps extends DrawerContentComponentProps<any> {}

const DrawerMenu: React.FC<IProps> = ({ navigation }) => {
  const { data } = useContext(MeStore);
  return (
    <Container>
      <SafeAreaView style={{ flex: 6 }}>
        <Header>
          <AvatarContainer
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MenuItem>Home</MenuItem>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Orders");
              }}
            >
              <MenuItem>Orders</MenuItem>
            </TouchableOpacity>
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
      </SafeAreaView>
      {data?.users[0]?.role === "Driver" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Driver");
          }}
          style={{ flex: 1 }}
        >
          <Footer>
            <FooterSmallText>Visit</FooterSmallText>
            <FooterText>Driver portal</FooterText>
          </Footer>
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}
    </Container>
  );
};

export default DrawerMenu;
