import { gql, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "../styles/styled-components";
import { OrderType } from "../type";
import * as Location from "expo-location";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import BorderButton from "./BorderButton";
import DriverOrderBox from "./DriverOrderBox";
import { ORDER_FRAGMENT } from "../fragments";

const Container = styled.View`
  flex: 1;
`;

const CenterView = styled.View`
  width: 100%;
  padding: 28px;
  align-items: center;
  justify-content: center;
`;

const GrayText = styled.Text`
  color: ${(props) => props.theme.colors.grey700};
  text-align: center;
`;

const SUBSCRIBE_NEARBY_ORDERS = gql`
  subscription subscribeNearbyOrders(
    $location: geography!
    $driver_user_id: Int!
    $distance: Int!
  ) {
    search_nearby_orders(
      args: {
        location: $location
        distance_kms: $distance
        driver_user_id: $driver_user_id
      }
    ) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;

interface OrdersResult {
  search_nearby_orders?: OrderType[];
}

interface SubscriptionVariables {
  driver_user_id: number;
  distance: number;
  location: {
    type: "Point";
    crs: {
      type: "name";
      properties: {
        name: "urn:ogc:def:crs:EPSG::4326";
      };
    };
    coordinates?: number[];
  };
}

interface LocationProps {
  lat: number | null;
  lng: number | null;
}

interface IProps {
  user_id: number;
}
const RealtimeNearbyOrders: React.FC<IProps> = ({ user_id }) => {
  const [locationLoading, setLocationLoading] = useState(false);
  const [location, setLocation] = useState<LocationProps>({
    lat: null,
    lng: null,
  });

  const { data: resultData, loading, error } = useSubscription<
    OrdersResult,
    SubscriptionVariables
  >(SUBSCRIBE_NEARBY_ORDERS, {
    variables: {
      driver_user_id: user_id,
      distance: 5,
      location: {
        coordinates:
          location?.lat && location?.lng ? [location?.lat, location?.lng] : [],
        type: "Point",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:EPSG::4326",
          },
        },
      },
    },
    skip: !location.lat || !location.lng,
  });

  useEffect(() => {
    (async () => {
      setLocationLoading(true);
      let requestStatus = await Location.requestPermissionsAsync();
      let { status } = await Location.getPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        setLocationLoading(false);
      } else {
        setLocationLoading(false);
        return;
      }
    })();
  }, []);

  const onRefresh = async () => {
    setLocationLoading(true);
    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setLocationLoading(false);
  };
  return (
    <Container>
      {location.lat === null && location.lng === null ? (
        <CenterView>
          {locationLoading && <ActivityIndicator />}
          {!locationLoading && (
            <GrayText>
              You need to enable location service permission to start finding
              nearby orders.
            </GrayText>
          )}
        </CenterView>
      ) : loading ? (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      ) : (
        resultData?.search_nearby_orders &&
        (resultData?.search_nearby_orders?.length > 0 ? (
          resultData?.search_nearby_orders?.map((order: any) => (
            <DriverOrderBox order={order} key={order?.id} />
          ))
        ) : (
          <CenterView>
            <GrayText>No orders found.</GrayText>
            <View style={{ height: 20, width: 20 }} />
            <BorderButton
              onPress={onRefresh}
              loading={locationLoading}
              label={locationLoading ? "Refreshing..." : "Refresh Location"}
            />
          </CenterView>
        ))
      )}
    </Container>
  );
};

export default RealtimeNearbyOrders;
