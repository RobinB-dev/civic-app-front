import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  MainStackParamList,
  NewPostCompleteParamList,
} from "../types/navigation";
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

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainStackParamList, "NewPostPublished">) {
  const [level, setLevel] = useState(12);
  const [progress, setProgress] = useState(73);

  // Values for communication with Back-end
  const postTitle = route.params?.postTitle;
  const postContent = route.params?.postContent;
  const postImage = route.params?.postImage;
  const postType = route.params?.postType;
  const postLatitude = route.params?.postLatitude;
  const postLongitude = route.params?.postLongitude;

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wahoo !</Text>
      </View>
      <Image
        source={require("../../assets/images/city.png")}
        style={styles.city}
      ></Image>
      <View style={styles.xpHeader}>
        <View style={styles.xpBar}>
          <Image
            style={styles.xpBarBase}
            source={require("../../assets/images/xp-bar.png")}
          ></Image>
          <View
            style={[styles.xpBarOverlay, { width: `${progress * 0.975}%` }]}
          >
            <View style={styles.xpBarOverlayShine}></View>
          </View>
        </View>
        <View style={styles.xpStar}>
          <Image
            style={styles.xpStarBase}
            source={require("../../assets/images/xp-star.png")}
          ></Image>
          <Text style={styles.xpStarLevel}>{level}</Text>
        </View>
      </View>
      <Image
        source={require("../../assets/images/head_stars.png")}
        style={styles.headstars}
      ></Image>
      <Text style={styles.mainText}>
        Vous avez gagné des points d’expérience !
      </Text>
      <View style={{ flex: 1, width: "85%" }}>
        <TouchableOpacity style={styles.validateButton}>
          <Text
            style={styles.validateButtonText}
            onPress={() => {
              navigation.replace("MainTabs");
            }}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#2C60C6",
    borderStyle: "solid",
  },

  innerTitle: {
    width: "100%",
    fontSize: 22,
    marginTop: "10%",
    color: "#2C60C6",
  },

  separator: {
    width: "100%",
    height: 1,
    marginTop: "1.5%",
    backgroundColor: "#2C60C6",
  },

  headerTitle: {
    fontSize: 28,
    color: "#B4B4B4",
  },

  uploadedImage: {
    width: "100%",
    height: 250,
    marginTop: "5%",
    resizeMode: "cover",
    borderRadius: 10,
  },

  categories: {
    width: "100%",
    marginTop: "2.5%",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  category: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: "#2C60C6",
    borderStyle: "solid",
  },

  categoryText: {
    fontSize: 18,
    color: "#2C60C6",
  },

  titleInput: {
    marginTop: 15,
    fontSize: 18,
    color: "#2C60C6",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: "#2C60C6",
    backgroundColor: "#FCF4ED",
    borderStyle: "solid",
  },

  footer: {
    width: "100%",
    height: 500,
  },

  messageInput: {
    marginTop: 15,
    fontSize: 18,
    color: "#2C60C6",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingBottom: 100,
    borderBottomWidth: 5,
    borderColor: "#2C60C6",
    backgroundColor: "#FCF4ED",
    borderStyle: "solid",
  },

  validateButton: {
    position: "absolute",
    width: "100%",
    bottom: 150,
    backgroundColor: "#2C60C6",
    paddingVertical: 18,
    borderRadius: 10,
  },

  validateButtonText: {
    textAlign: "center",
    fontSize: 20,
  },

  photoLocation: {
    fontSize: 14,
    color: "#2C60C6",
    marginTop: 6,
    width: "100%",
    textAlign: "right",
  },

  xpHeader: {
    position: "absolute",
    width: "100%",
    left: "2.5%",
    height: "15%",
    top: "20.5%",
    alignItems: "center",
    justifyContent: "center",
  },

  xpBar: {
    width: "60%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  xpBarBase: {
    width: "100%",
    resizeMode: "contain",
  },

  xpBarOverlay: {
    width: "97.5%",
    height: "19%",
    left: "1.25%",
    top: "39.5%",
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
    left: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  xpStarBase: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  xpStarLevel: {
    position: "absolute",
    fontSize: 32,
    color: "#FF4070",
    fontWeight: "900",
  },

  headstars: {
    position: "absolute",
    width: "60%",
    top: "-20.5%",
    resizeMode: "contain",
  },

  city: {
    position: "absolute",
    width: "300%",
    top: "42.5%",
    resizeMode: "contain",
  },

  mainText: {
    position: "absolute",
    fontSize: 24,
    top: "58%",
    color: "#2C60C6",
    textAlign: "center",
    fontWeight: "600",
  },
});
