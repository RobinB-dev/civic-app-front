import React, { useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  TopNav,
  Text,
  useTheme,
  themeColor,
  SectionContent,
  Section,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { testObj } from "../decl/functions.decl";
import { useFocusEffect } from "@react-navigation/native";
import { Camera } from "expo-camera";

import USERS from "../provider/users.json";
import { StatusBar } from "expo-status-bar";

// const findUser = (_userName: string) => {
//   return USERS.find((o: { username: string }) => o.username === _userName);
// };

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainStackParamList, "SinglePost">) {
  const { isDarkmode, setTheme } = useTheme();
  const { id, content, title, tag, image, uid }: any = route.params;

  //   console.log("vreo", route.params);

  return (
    <Layout>
      <TopNav
        middleContent="Second Screen"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section>
          <Text>uid :{uid}</Text>
          <Text>id :{id}</Text>
          <Text>tag :{tag}</Text>
          <Text>content :{content}</Text>
          <Text>title :{title}</Text>
          <Image
            resizeMode="contain"
            style={{
              height: 220,
              width: 220,
            }}
            source={{
              uri: image,
            }}
          />
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#F7F7F7",
  },

  header: {
    width: "100%",
    marginTop: "10%",
    height: "10%",
    // backgroundColor: '#FF9900',
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 28,
    color: "#B4B4B4",
  },
});
