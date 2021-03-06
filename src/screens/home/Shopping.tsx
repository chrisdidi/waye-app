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
import { gql, useMutation } from "@apollo/client";
import { OrderType } from "../../type";
import { ORDER_FRAGMENT } from "../../fragments";
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
  position: relative;
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

interface FormProps {
  description: string;
  budget: number;
}

const INSERT_ORDER = gql`
  mutation newOrder($object: order_insert_input!) {
    insert_order_one(object: $object) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;

interface InsertResultType {
  insert_order_one?: OrderType;
}

const Shopping = ({ navigation }: any) => {
  const { data } = useContext(MeStore);
  const [newOrder, { loading }] = useMutation<
    InsertResultType,
    { object: OrderType }
  >(INSERT_ORDER);
  const { control, getValues, handleSubmit, watch } = useForm<FormProps>();
  const [place, setPlace] = useState<any>();

  const onFormSubmit = () => {
    let { budget, description } = getValues();
    let address = place.place.description;
    let coordinates = place.details.coordinates;
    let delivery_location = {
      type: "Point",
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::4326" } },
      coordinates: [coordinates.lat, coordinates.lng],
    };
    let encoded = encodeURI(description);

    let uid = data?.users[0]?.id;
    let now = new Date();
    let complete_date = now.toISOString();
    newOrder({
      variables: {
        object: {
          delivery_lat: coordinates.lat,
          delivery_lng: coordinates.lng,
          delivery_location,
          type: "shopping",
          user_id: uid,
          complete_date,
          delivery_address: address,
          delivery_place_id: place.place.place_id,
          description: encoded,
          budget,
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
            <Title>Personal{`\n`}Shopper</Title>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ onBlur, onChange, value }) => (
                <FormInput
                  value={value}
                  onChange={onChange}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  multiline={true}
                  label="What do you need?"
                  placeholder="1. Something from somewhere"
                />
              )}
            />
            <Controller
              name="budget"
              control={control}
              defaultValue=""
              render={({ onBlur, onChange, value }) => (
                <FormInput
                  value={value}
                  onChange={onChange}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  type="number-pad"
                  prefix="RM"
                  label="What is your budget?"
                  placeholder="XX"
                />
              )}
            />
            <GoogleMapAutocomplete
              label="Delivery Address"
              onPlaceClick={({ details, place }): any => {
                setPlace({
                  place,
                  details,
                });
              }}
            />
            {/* <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ onBlur, onChange, value }) => (
                <FormInput
                  value={value}
                  onChange={onChange}
                  onBlur={() => {
                    Keyboard.dismiss();
                  }}
                  label="Delivery Address"
                  placeholder="Search your home"
                />
              )}
            /> */}
            <Placeholder></Placeholder>
          </Container>
        </Wrapper>
        <ButtonContainer>
          <Button
            title="Place Order"
            loading={loading}
            disabled={
              loading ||
              !watch().budget ||
              !watch().description ||
              place === undefined
            }
            onPress={handleSubmit(onFormSubmit)}
          />
        </ButtonContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Shopping;
