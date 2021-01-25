import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styled from "../../styles/styled-components";
import Constants from "expo-constants";
import Icon from "../../assets/icon.png";
import {
  useIsFocused,
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { ADVERTISEMENTS_FRAGMENT } from "../../fragments";
import ServiceSelector from "../../components/ServiceSelector";
import useOrders from "../../hooks/useOrders";
import { ORDER_STATUS } from "../../enum";
import { auth } from "../../firebaseConfig";
import { MeStore } from "../../context/MeStore";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  height: auto;
  width: 100%;
  padding: 16px;
  padding-top: ${Constants.statusBarHeight + 16}px;
  background-color: ${(props) => props.theme.colors.secondary};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Touchable = styled.TouchableOpacity``;

const Logo = styled.Image`
  height: 40px;
  width: 40px;
`;

const Body = styled.ScrollView`
  flex: 1;
`;

const AdvertisementsContainer = styled.FlatList`
  flex: 1;
  height: 260px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.grey200};
`;

const AdvertisementBox = styled.View<any>`
  flex: 1;
  padding: 6px;
  position: relative;
  width: ${(props) => props.width}px;
`;

const AdvertisementImage = styled.Image`
  flex: 1;
  border-radius: 8px;
`;

const AdsTitle = styled.Text`
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 18px;
  color: ${(props) => props.theme.colors.grey700};
`;

const AdsDescription = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.grey400};
`;

const AdsTextContainer = styled.View`
  width: 100%;
  height: auto;
  padding: 4px 8px;
`;

const SubmitButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  padding: 12px 20px;
  shadow-color: ${(props) => props.theme.colors.grey400};
  shadow-opacity: 0.4;
  padding-bottom: 28px;
  background-color: white;
  width: 100%;
`;

const SubmitButton = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Labels = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.theme.colors.grey700};
  font-size: 18px;
  margin-bottom: 8px;
`;

const Sections = styled.View`
  width: 100%;
  padding: 16px;
`;

const OrderText = styled.Text`
  font-family: ${(props) => props.theme.mainFontSemiBold};
  color: ${(props) => props.theme.colors.main};
  text-align: center;
  font-size: 20px;
`;

const LoadingBox = styled.View`
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

const ServicesContainer = styled.View`
  width: 100%;
  height: 124px;
  position: relative;
`;
const GET_ADVERTISEMENTS = gql`
  {
    advertisements {
      ...AdvertisementsPart
    }
  }
  ${ADVERTISEMENTS_FRAGMENT}
`;

const Dashboard = ({ navigation }: any) => {
  const { width } = Dimensions.get("window");
  const { data, loading, error, refetch } = useQuery(GET_ADVERTISEMENTS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { data: meData } = useContext(MeStore);
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
    refetch: ordersRefetch,
  } = useOrders({
    fetchPolicy: "network-only",
    user_id: meData?.users[0]?.id,
    status: [
      {
        status: { _eq: "Waiting" },
      },
      {
        status: { _eq: "Ongoing" },
      },
    ],
  });

  const [service, setService] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      await ordersRefetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome size={24} name="reorder" color="white" />
        </Touchable>
        <Logo source={Icon} />
        <Touchable
          onPress={() => {
            navigation.navigate("MessagesList");
          }}
        >
          <FontAwesome size={24} name="paper-plane" color="white" />
        </Touchable>
      </Header>
      <Body
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {data?.advertisements?.length > 0 && (
          <AdvertisementsContainer
            data={data.advertisements}
            keyExtractor={(item: any) => item.id.toString() + item.image_url}
            renderItem={({ item }: any) => {
              return (
                <TouchableOpacity>
                  <AdvertisementBox width={width}>
                    <AdvertisementImage source={{ uri: item?.image_url }} />
                    <AdsTextContainer>
                      <AdsTitle>{item.title}</AdsTitle>
                      <AdsDescription>{item.description}</AdsDescription>
                    </AdsTextContainer>
                  </AdvertisementBox>
                </TouchableOpacity>
              );
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        <Sections>
          <Labels>What can we do for you today?</Labels>
          <ServicesContainer>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                width: "100%",
                height: 124,
              }}
            >
              <ServiceSelector
                emoji="🛒"
                name="Shopping"
                onPress={() => {
                  navigation.navigate("Shopping");
                }}
                isSelected={service === "shopping"}
              />
              <ServiceSelector
                emoji="🏘️"
                name="Property Viewing"
                onPress={() => {
                  navigation.navigate("PropertyViewing");
                }}
                isSelected={service === "property"}
              />
              <ServiceSelector
                emoji="📦"
                name="Parcel pickup"
                onPress={() => {
                  navigation.navigate("Parcel");
                }}
                isSelected={service === "parcel"}
              />
            </ScrollView>
            <LinearGradient
              pointerEvents={"none"}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                flex: 1,
                width: "100%",
                height: 124,
              }}
              colors={[
                "white",
                "rgba(255,255,255, 0.1)",
                "transparent",
                "transparent",
                "transparent",
                "rgba(255,255,255, 0.1)",
                "white",
              ]}
            />
          </ServicesContainer>
        </Sections>
        <Sections>
          <Labels>Happening</Labels>
        </Sections>
        {ordersLoading && (
          <LoadingBox>
            <ActivityIndicator />
          </LoadingBox>
        )}
        {!ordersLoading &&
          (ordersData?.order?.length > 0 ? (
            <Text>ORDER HERE</Text>
          ) : (
            <LoadingBox>
              <Text>No active order.</Text>
            </LoadingBox>
          ))}
      </Body>
      {service !== "" && (
        <SubmitButtonContainer>
          <SubmitButton>
            <OrderText>Order now!</OrderText>
          </SubmitButton>
        </SubmitButtonContainer>
      )}
    </Container>
  );
};

export default Dashboard;
