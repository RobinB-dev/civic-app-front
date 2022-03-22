import React, { useContext } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import {
  Button,
  Layout,
  Section,
  Text,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { AntDesign } from "@expo/vector-icons";

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailsScreen: {
    itemId: number;
    otherParam: string;
  };
};

// const Item = ({ title, content, user, navigation }: any) => (
export const CardPost = ({ title, content }: any) => {
  const { isDarkmode, setTheme } = useTheme();

  const onPressFunction = () => {
    // navigation.navigate("NewPost", { userName: "Robin" });
    console.log("Add post");
  };

  return (
    <Layout>
      <View style={styles.item}>
        {/* <Pressable
      onPress={() => {
        {
          navigation.navigate("SecondScreen", { userName: [user.username] });
        }
      }}
    >
      <Image
        style={styles.userImg}
        source={{
          uri: user.picture,
        }}
      ></Image>
      <Text style={styles.content}>{user.username}</Text>
    </Pressable> */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.content}>{"Roibjdfjkshqbfgnsdhlkfwbvfrjegf"}</Text>
        <Section>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onPressFunction}
              style={[styles.button, isDarkmode ? styles.dark : styles.white]}
            >
              <AntDesign name="like1" size={24} color="black" />
            </Pressable>
            <Pressable
              onPress={onPressFunction}
              style={[styles.button, isDarkmode ? styles.dark : styles.white]}
            >
              <AntDesign name="dislike1" size={24} color="black" />
            </Pressable>
          </View>
        </Section>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#cbcbcb23",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  content: {
    fontSize: 16,
  },
  white: {
    backgroundColor: themeColor.white100,
  },
  dark: {
    backgroundColor: themeColor.dark,
  },
  button: {
    // flex: 2,
    display: "flex",
    padding: 10,
    borderRadius: 4,
    margin: 5,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    width: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
