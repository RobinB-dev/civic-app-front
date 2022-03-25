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
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Camera } from "expo-camera";

import { StatusBar } from "expo-status-bar";
import { reload } from "firebase/auth";
import { gql, useMutation } from "@apollo/client";
import { testObj } from "../decl/functions.decl";

const USER_QUERY = gql`
  mutation ($uid: String) {
    getUserData(uid: $uid) {
      username
      image
      email
      number
    }
  }
`;
// const findUser = (_userName: string) => {
//   return USERS.find((o: { username: string }) => o.username === _userName);
// };

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainStackParamList, "UserProfile">) {
  const { isDarkmode, setTheme } = useTheme();
  const { uid }: any = route.params;
  const [userData, setUserData] = useState({});
  const [dataUser, { data, loading, error }] = useMutation(USER_QUERY);

  //   console.log("vreo", route.params);

  async function reload() {
    // console.log("render", testObj(data, "username"), uid, data);

    dataUser({
      variables: {
        uid: uid,
      },
    });
  }

  useEffect(() => {
    // console.log("error : ", error);
    // console.log("not data : ", data);
    if (testObj(data, "getUserData") !== userData) {
      // console.log("users : ", testObj(data, "getUserData"));
      setUserData(testObj(data, "getUserData"));
    } else {
      // console.log("loading : ", loading);
    }
  }, [data]);

  return (
    <Layout>
      <TopNav
        middleContent="User Profle"
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
        </Section>
        <Section>
          <TouchableOpacity onPress={() => reload()}>
            <Text>C'est parti on fetch !</Text>
            <Text>Username : {testObj(userData, "username")}</Text>
          </TouchableOpacity>
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
