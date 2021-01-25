import React, { useState } from "react";
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
const PropertyViewing = () => {
  const { control } = useForm();

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
                console.log(details.coordinates);
                console.log(place);
              }}
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
                  label="Appointment Date/Time"
                  placeholder="DD/MM/YY : HH:MM"
                />
              )}
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
          <Button loading={false} title="Place Order" onPress={() => {}} />
        </ButtonContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PropertyViewing;
