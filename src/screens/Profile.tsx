import React, { useContext, useState } from "react";
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

  console.log(userObj);

  return (
    <Layout>
      <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={"settings"}
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
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Text style={styles.username}>{testObj(userObj, "username")}</Text>
            <Image
              style={styles.picture}
              source={{
                uri: testObj(userObj, "picture"),
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
                auth.setUser(false);

                // signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            />
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
    fontSize: 20,
  },
});
