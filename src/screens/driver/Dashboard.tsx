import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { DefaultTheme, ThemeProps } from "styled-components";
import RealtimeNearbyOrders from "../../components/RealTimeNearbyOrders";
import { MeStore } from "../../context/MeStore";
import { StatusBarHeight } from "../../StatusBarHeight";
import styled, { withTheme } from "../../styles/styled-components";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.grey50};
`;

const Head = styled.View`
  padding: 16px;
  flex: 1;
  padding-top: ${StatusBarHeight + 20}px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const BoldBlackText = styled.Text`
  color: ${(props) => props.theme.colors.grey700};
  font-family: ${(props) => props.theme.mainFontBold};
  font-size: 24px;
`;

const StatsBoxContainers = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 16px;
  height: 96px;
  margin-bottom: 16px;
`;

const StatsBoxPadder = styled.View`
  padding: 4px;
  flex: 1;
  height: auto;
`;

const BlueStatsBox = styled.View`
  flex: 1;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.blue100};
  padding: 8px;
`;

const BlueBoldText = styled.Text`
  color: ${(props) => props.theme.colors.blue400};
  font-family: ${(props) => props.theme.mainFontBold};
`;
const GreenBoldText = styled.Text`
  color: ${(props) => props.theme.colors.green400};
  font-family: ${(props) => props.theme.mainFontBold};
`;
const YellowBoldText = styled.Text`
  color: ${(props) => props.theme.colors.yellow400};
  font-family: ${(props) => props.theme.mainFontBold};
`;
const GreenStatsBox = styled.View`
  flex: 1;
  height: 80px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.green100};
  padding: 8px;
`;
const YellowStatsBox = styled.View`
  flex: 1;
  height: 80px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.yellow100};
  padding: 8px;
`;
interface IProps extends ThemeProps<DefaultTheme> {
  navigation: any;
}
const Dashboard: React.FC<IProps> = ({ navigation, theme }) => {
  const { data } = useContext(MeStore);
  return (
    <Container>
      <Head>
        <ScrollView>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <FontAwesome
              size={24}
              name="reorder"
              color={theme.colors.grey700}
            />
          </TouchableOpacity>
          <BoldBlackText>
            Welcome Back,{`\n`}
            {data?.users[0]?.name}!
          </BoldBlackText>
          <StatsBoxContainers>
            <StatsBoxPadder>
              <BlueStatsBox>
                <BlueBoldText>Total Earning</BlueBoldText>
              </BlueStatsBox>
            </StatsBoxPadder>
            <StatsBoxPadder>
              <GreenStatsBox>
                <GreenBoldText>Completed Orders</GreenBoldText>
              </GreenStatsBox>
            </StatsBoxPadder>
            <StatsBoxPadder>
              <YellowStatsBox>
                <YellowBoldText>Active Orders</YellowBoldText>
              </YellowStatsBox>
            </StatsBoxPadder>
          </StatsBoxContainers>
          <BoldBlackText>Nearby Orders</BoldBlackText>
          {data?.users[0]?.id && (
            <RealtimeNearbyOrders user_id={data.users[0].id} />
          )}
        </ScrollView>
      </Head>
    </Container>
  );
};

export default withTheme(Dashboard);
