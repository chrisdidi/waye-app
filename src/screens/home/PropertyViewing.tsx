import React, { useContext, useState } from "react";
import styled from "../../styles/styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundOverlayColors } from "../../constants";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import GoogleMapAutocomplete from "../../components/GoogleMapAutocomplete";
import DateTimeInput from "../../components/DateTimeInput";
import { gql, useMutation } from "@apollo/client";
import { ORDER_FRAGMENT } from "../../fragments";
import { OrderType } from "../../type";
import { MeStore } from "../../context/MeStore";

const Wrapper = styled(LinearGradient)`
  flex: 1;
  padding-top: 20%;
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
  shadow-color: ${(props) => props.theme.colors.grey700};
  shadow-opacity: 0.4;
  elevation: 2;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  padding: 28px 20px;
`;

const Placeholder = styled.View`
  width: 100%;
  height: 150px;
`;
const Title = styled.Text`
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 24px;
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 12px;
  align-self: center;
  padding-bottom: 28px;
  background-color: white;
  shadow-color: ${(props) => props.theme.colors.grey700};
  shadow-opacity: 0.2;
  elevation: 2;
`;

const INSERT_ORDER = gql`
  mutation newOrder($object: order_insert_input!) {
    insert_order_one(object: $object) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;
interface FormProps {
  instructions?: string;
}

interface InsertResultType {
  insert_order_one?: OrderType;
}

const PropertyViewing = ({ navigation }: any) => {
  const [newOrder, { loading }] = useMutation<
    InsertResultType,
    { object: OrderType }
  >(INSERT_ORDER);
  const { data } = useContext(MeStore);
  const { control, getValues, handleSubmit } = useForm<FormProps>();
  const [viewDate, setViewDate] = useState<Date | undefined>();
  const [place, setPlace] = useState<any>();
  const onDateChange = (e: Date | undefined) => {
    setViewDate(e);
  };

  const onSubmit = () => {
    let { instructions } = getValues();
    let address = place.place.description;
    let coordinates = place.details.coordinates;
    let delivery_location = {
      type: "Point",
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::4326" } },
      coordinates: [coordinates.lat, coordinates.lng],
    };
    let uid = data?.users[0]?.id;
    newOrder({
      variables: {
        object: {
          delivery_lat: coordinates.lat,
          delivery_lng: coordinates.lng,
          delivery_location,
          type: "property",
          user_id: uid,
          complete_date: viewDate,
          delivery_address: address,
          delivery_place_id: place.place.place_id,
          description: instructions,
        },
      },
    })
      .then((result) => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <Wrapper colors={BackgroundOverlayColors}>
          <Container>
            <Title>Property{`\n`}Viewing</Title>
            <GoogleMapAutocomplete
              label="Viewing Address"
              onPlaceClick={({ details, place }): any => {
                setPlace({
                  place,
                  details,
                });
              }}
            />
            <DateTimeInput
              onChange={onDateChange}
              selectedDate={viewDate}
              label="Appointment Date/Time"
              idText="Property Viewing"
            />
            <Controller
              name="instructions"
              control={control}
              defaultValue=""
              render={({ onBlur, onChange, value }) => (
                <FormInput
                  value={value}
                  onChange={onChange}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  label="Instructions"
                  placeholder="e.g. Contact Alex at 01XXXXXXX"
                />
              )}
            />
            <Placeholder></Placeholder>
          </Container>
        </Wrapper>
        <ButtonContainer>
          <Button
            loading={loading}
            disabled={loading || place === undefined || viewDate === undefined}
            title="Place Order"
            onPress={handleSubmit(onSubmit)}
          />
        </ButtonContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PropertyViewing;
