import React, { useCallback, useEffect, useState } from "react";
import styled from "../styles/styled-components";
import * as _ from "lodash";
import * as Haptics from "expo-haptics";
import {
  GOOGLE_PLACE_AUTOCOMPLETE_API,
  GOOGLE_PLACE_DETAILS_API,
} from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Alert, Text } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { getApi } from "../utils";

const Container = styled.View`
  width: 100%;
  margin-bottom: 28px;
  position: relative;
  z-index: 10;
`;

const LoadingContainer = styled.View`
  width: 40px;
  justify-content: flex-end;
  flex-direction: row;
`;

const Label = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  font-size: 16px;
  margin-left: 8px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.grey700};
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 16px 18px;
  border-radius: 20px;
  border: solid 1px ${(props) => props.theme.colors.main}
  background-color: ${(props) => props.theme.colors.grey50};
`;

const Input = styled.TextInput`
  flex: 1;
`;

const SuggestionList = styled.View`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  margin-top: 8px;
  border-radius: 12px;
  background-color: white;
  shadow-color: ${(props) => props.theme.colors.grey700};
  shadow-opacity: 0.3;
  shadow-offset: 0px 2px;
  elevation: 1;
  height: auto;
  max-height: 150px;
`;

const SuggestionLoader = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ListContainer = styled.ScrollView`
  max-height: 150px;

  z-index: 10;
`;
const PlaceItem = styled.View`
  width: 100%;
  padding: 8px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.grey100};
`;

interface Details {
  coordinates: any | null;
  addressComponent: any | null;
  coordinatesText: string | null;
}
export interface OnPlaceClick {
  ({ place, details }: { place: any | null; details: Details }): {
    place: any;
    details: Details;
  };
}
interface IProps {
  onPlaceClick?: OnPlaceClick;
  label?: string;
}
const GoogleMapAutocomplete: React.FC<IProps> = ({ onPlaceClick, label }) => {
  const [search, setSearch] = useState("");
  const [placeList, setPlaceList] = useState<Array<any> | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchApi = async () => {
    let api = GOOGLE_PLACE_AUTOCOMPLETE_API;
    api = api + search;
    setIsLoading(true);
    let json = await getApi(api);
    if (json) {
      setPlaceList(json?.predictions);
    }
    setIsLoading(false);
  };
  const updateQuery = () => {
    if (search !== "") {
      searchApi();
    } else {
      setPlaceList(null);
    }
  };

  const delayedQuery = useCallback(_.debounce(updateQuery, 500), [search]);

  const onChange = (e: any) => {
    setSearch(e);
    setSelectedPlace(null);
  };

  const onClick = async (place: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPlace(place);
    setIsLoading(true);
    let api = GOOGLE_PLACE_DETAILS_API + place.place_id;
    const json = await getApi(api);
    setSearch(place.description);
    let coordinates = json.result.geometry.location;
    let details = {
      coordinates,
      addressComponent: json.result.address_components,
      coordinatesText: "{" + coordinates.lat + "," + coordinates.lng + "}",
    };

    if (Boolean(onPlaceClick) && onPlaceClick !== undefined) {
      onPlaceClick({ place, details });
    }
    setIsLoading(false);
  };

  const clear = () => {
    setSearch("");
    setIsLoading(false);
    setSelectedPlace(null);
    if (Boolean(onPlaceClick) && onPlaceClick !== undefined) {
      onPlaceClick({
        place: {},
        details: {
          coordinates: null,
          addressComponent: null,
          coordinatesText: null,
        },
      });
    }
  };
  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [search, delayedQuery]);
  return (
    <Container>
      {Boolean(label) && <Label>{label}</Label>}
      <InputContainer>
        <Input
          placeholder={`Search an address`}
          onChangeText={onChange}
          value={search}
        />
        <LoadingContainer>
          {isLoading ? (
            <ActivityIndicator size={14} />
          ) : (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={clear}>
              <Ionicons name="close-circle" color="rgb(80,80,80)" size={18} />
            </TouchableWithoutFeedback>
          )}
        </LoadingContainer>
      </InputContainer>
      {search !== "" && placeList !== null && selectedPlace === null && (
        <SuggestionList>
          {placeList !== null && placeList?.length > 0 ? (
            <ListContainer>
              {placeList.map((place, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onClick(place);
                  }}
                >
                  <PlaceItem>
                    <Text>{place.description}</Text>
                  </PlaceItem>
                </TouchableOpacity>
              ))}
            </ListContainer>
          ) : (
            <SuggestionLoader>
              <Text>No address found.</Text>
            </SuggestionLoader>
          )}
        </SuggestionList>
      )}
    </Container>
  );
};

export default GoogleMapAutocomplete;
