import React from "react";
import { View, Image } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Section, useTheme } from "react-native-rapi-ui";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Section>
          <Image
            resizeMode="cover"
            style={{
              height: 400,
              width: 400,
            }}
            source={
              isDarkmode
                ? require("../../assets/images/map_night.png")
                : require("../../assets/images/map_day.png")
            }
          />
        </Section>
      </View>
    </Layout>
  );
}
