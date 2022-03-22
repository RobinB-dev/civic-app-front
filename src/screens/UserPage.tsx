import React, { useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet } from "react-native";
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

import USERS from "../provider/users.json";

const findUser = (_userName: string) => {
  return USERS.find((o: { username: string }) => o.username === _userName);
};

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainStackParamList, "UserPage">) {
  const { isDarkmode, setTheme } = useTheme();
  const [userName, setUserName] = useState("roger");
  const [userObj, setUserObj] = useState({});

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      if (route.params) {
        setUserName(testObj(route.params, "userName")[0]);
        setUserObj(findUser(testObj(route.params, "userName")[0])!);
      }

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  if (userObj) {
    console.log(userObj, testObj(userObj, "picture"));
  }

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
          <SectionContent>
            {/* This text using ubuntu font */}
            <Text style={styles.username}>{userName}</Text>
            {userObj && (
              <Image
                style={styles.picture}
                source={{
                  uri: testObj(userObj, "picture"),
                }}
              />
            )}
          </SectionContent>
          <SectionContent>
            <Text style={styles.description}>
              {testObj(userObj, "description")}
            </Text>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 30,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  description: {
    fontSize: 30,
  },
});
