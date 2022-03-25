import React, { useCallback, useContext, useEffect, useState } from "react";
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

import { gql, useMutation } from "@apollo/client";
import Loading from "./utils/Loading";
import { useFocusEffect } from "@react-navigation/native";

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
  const [dataUser, { data, loading, error }] = useMutation(USER_QUERY);
  const [userObj, setUserObj] = useState(USERS[0]);

  useEffect(() => {
    // console.log("error : ", error);
    // console.log("not data : ", data);
    if (testObj(data, "getUserData") !== userObj) {
      // console.log("users : ", testObj(data, "getUserData"));
      setUserObj(testObj(data, "getUserData"));
    } else {
      // console.log("loading : ", loading);
    }
  }, [data, loading]);

  // useEffect(() => {
  //   console.log("render 2");

  //   dataUser({
  //     variables: {
  //       uid: auth.uid,
  //     },
  //   });
  //   console.log("here", data);
  // }, [userObj]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      // console.log("render 1", data);
      dataUser({
        variables: {
          uid: auth.uid,
        },
      });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <Layout>
      <TopNav
        middleContent="Profil"
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
          <Section style={styles.profileContainer}>
            <SectionContent
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "60%",
              }}
            >
              <Image
                style={styles.bgImage}
                source={require("../../assets/images/bg-image.png")}
              />

              <SectionContent
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <View>
                  <View style={styles.nameContainer}>
                    <View style={styles.imageContainer}>
                      <View style={styles.pictureBorder}></View>
                      <Image
                        style={styles.picture}
                        source={{
                          uri: testObj(userObj, "profilPicture"),
                        }}
                      />
                    </View>
                    <Text style={styles.username}>
                      {testObj(userObj, "username")}
                    </Text>
                  </View>
                </View>
              </SectionContent>

              <View style={styles.xpHeader}>
                <View style={styles.xpBar}>
                  <Image
                    style={styles.xpBarBase}
                    source={require("../../assets/images/xp-bar.png")}
                  ></Image>
                  <View style={[styles.xpBarOverlay]}>
                    <View style={styles.xpBarOverlayShine}></View>
                  </View>
                </View>
                <View style={styles.xpStar}>
                  <Image
                    style={styles.xpStarBase}
                    source={require("../../assets/images/xp-star.png")}
                  ></Image>
                  <Text style={styles.xpStarLevel}>12</Text>
                </View>
              </View>
              <SectionContent>
                <Text>{testObj(userObj, "number")}</Text>
                <Text>{testObj(userObj, "email")}</Text>
              </SectionContent>
            </SectionContent>

            <View style={styles.profMenu}>
              <Image
                source={require("../../assets/images/icons/menu.png")}
              ></Image>
              <Image
                source={require("../../assets/images/icons/plate.png")}
              ></Image>
            </View>

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
    fontWeight: "800",
    color: "#FF0099",
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  pictureBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2C60C6",
    position: "absolute",
    top: "5%",
    left: "5%",
  },

  description: {
    fontSize: 34,
  },

  profileContainer: {
    width: "100%",
    // height: "50%",
    display: "flex",
  },

  bgImage: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    resizeMode: "contain",
  },

  profMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // width: "80%",
  },

  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "10%",
  },

  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
  },

  xpHeader: {
    // position: "absolute",
    width: "100%",
    // left: "7.5%",
    height: "12%",
    // top: "4.5%",
    alignItems: "center",
    justifyContent: "center",
  },

  xpBar: {
    width: "80%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  xpBarBase: {
    width: "100%",
    resizeMode: "contain",
  },

  xpBarOverlay: {
    width: "50%",
    height: "80%",
    left: "1.25%",
    top: "5%",
    position: "absolute",
    backgroundColor: "#FF0099",
    borderRadius: 7.5,
  },

  xpBarOverlayShine: {
    width: "90%",
    height: "12.5%",
    top: "10%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  xpStar: {
    position: "absolute",
    width: 80,
    height: 80,
    left: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  xpStarBase: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  xpStarLevel: {
    fontSize: 32,
    color: "#FF4070",
    fontWeight: "900",
    zIndex: 2,
    position: "absolute",
  },
});
