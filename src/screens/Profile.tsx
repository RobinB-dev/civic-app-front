import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../provider/AuthProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import USERS from "../provider/users.json";
import { testObj } from "../decl/functions.decl";

import { gql, useQuery } from "@apollo/client";
import Loading from "./utils/Loading";

const POSTS_QUERY = gql`
  query GetUser {
    getUser {
      id
      username
      profilPicture
      number
      email
      createdAt
    }
  }
`;

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailsScreen: {
    itemId: number;
    otherParam: string;
  };
};

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const RootStack = createNativeStackNavigator();
  const { isDarkmode, setTheme } = useTheme();
  const auth = useContext(AuthContext);
  const [userObj, setUserObj] = useState(USERS[0]);

  const { data, loading, error } = useQuery(POSTS_QUERY);

  useEffect(() => {
    // console.log("error : ", error);
    // console.log("not data : ", data);
    if (testObj(data, "getUser")) {
      // console.log("users : ", testObj(data, "getUser")[0]);
      setUserObj(testObj(data, "getUser")[0]);
    } else {
      // console.log("loading : ", loading);
    }
  }, [loading]);

  return (
    <Layout>
      <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={"settings"}
            size={20}
            // color={isDarkmode ? themeColor.white100 : themeColor.dark}
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
        {loading && <Loading />}
        {!loading && (
          <Section style={{ marginTop: 23 }}>
            <SectionContent>
              <Text style={styles.username}>
                {testObj(userObj, "username")}
              </Text>
              <Image
                style={styles.picture}
                source={{
                  uri: testObj(userObj, "profilPicture"),
                }}
              />
              <Text>{testObj(userObj, "description")}</Text>
            </SectionContent>
            <SectionContent>
              <Button
                status="danger"
                text="Logout"
                onPress={() => {
                  console.log("logout");
                  auth.setToken(null);

                  // signOut(auth);
                }}
                style={{
                  marginTop: 10,
                }}
              />
            </SectionContent>
          </Section>
        )}
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
    fontSize: 34,
  },
});
