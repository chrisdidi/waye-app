import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import styled from "../styles/styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "./Input";

const Container = styled.View`
  width: 100%;
  margin-bottom: 28px;
`;

const Box = styled.View`
  width: 100%;
  border-radius: 16px;
  border: solid 1px ${(props) => props.theme.colors.main};
`;

const Text = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  color: ${(props) => props.theme.colors.grey700};
  padding: 16px 12px;
`;

const DateTimePickerContainer = styled.View`
  position: absolute;
  width: 100%;
  left: 0px;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  bottom: 0px;
  height: 100%;
  padding: 0px 12px;
  background-color: ${(props) => props.theme.colors.grey50};
  border-radius: 16px;
  border: solid 1px ${(props) => props.theme.colors.main};
`;

const Label = styled.Text`
  font-family: ${(props) => props.theme.mainFont};
  font-size: 16px;
  margin-left: 8px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.grey700};
`;

const InputContainer = styled.View`
  width: 100%;
  position: relative;
`;
const DoneText = styled.Text`
  color: ${(props) => props.theme.colors.blue500};
  font-family: ${(props) => props.theme.mainFontBold};
`;
interface IProps {
  idText: string;
  selectedDate?: Date;
  onChange: (selectedDate?: Date) => any;
  label?: string;
}
const DateTimeInput: React.FC<IProps> = ({
  onChange,
  selectedDate,
  idText,
  label,
}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [tempDate, setTempDate] = useState<Date>(new Date());

  let displayDay;
  if (selectedDate) {
    let displayDate = new Date(selectedDate);
    let month = displayDate.getMonth() + 1;
    let date = displayDate.getDate();
    let year = displayDate.getFullYear();
    let hour = displayDate.getHours();
    let min = displayDate.getMinutes();
    displayDay = `${date}/${month}/${year} | ${hour}:${min}`;
  }

  const onLocalChange = (e: any, thisDate: Date | undefined) => {
    setTempDate(thisDate || new Date());
  };

  const onDonePressed = () => {
    if (mode === "time") {
      onChange(tempDate);
      setShow(false);
    } else {
      setMode("time");
    }
  };
  return (
    <Container>
      {Boolean(label) && <Label>{label}</Label>}
      <InputContainer>
        <TouchableOpacity
          onPress={() => {
            setShow(true);
            setMode("date");
          }}
        >
          <Box>
            <Text>{selectedDate ? displayDay : "DD/MM/YYYY | HH:MM"}</Text>
          </Box>
        </TouchableOpacity>
        {show && (
          <DateTimePickerContainer>
            <View style={{ flex: 1 }}>
              <DateTimePicker
                onChange={onLocalChange}
                value={tempDate}
                testID="newPicker"
                display="default"
                mode={mode}
                style={{ width: "100%" }}
              />
            </View>
            <TouchableOpacity onPress={onDonePressed}>
              <DoneText>Done</DoneText>
            </TouchableOpacity>
          </DateTimePickerContainer>
        )}
      </InputContainer>
    </Container>
  );
};

export default DateTimeInput;
