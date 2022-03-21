import { useState } from "react";
import { View, FlatList, StyleSheet, Pressable, Image } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Button,
  Text,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import DATA from "../provider/data.json";
import USERS from "../provider/users.json";

const findUser = (_userId: number) => {
  return USERS.find((o: { userId: number }) => o.userId === _userId);
};

const Item = ({ title, body, user, navigation }: any) => (
  <View style={styles.item}>
    <Pressable
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
      <Text style={styles.body}>{user.username}</Text>
    </Pressable>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.body}>{body}</Text>
  </View>
);

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const [posts, setPosts] = useState(DATA);
  const { isDarkmode, setTheme } = useTheme();

  const renderItem = ({ item }: any) => (
    <Item
      title={item.title}
      body={item.body}
      user={findUser(item.userId)}
      navigation={navigation}
    />
  );

  const onPressFunction = () => {
    console.log("Add post");
  };
  // const auth = getAuth();
  return (
    <Layout>
      <TopNav
        middleContent="Home"
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
        {/* <Section style={{ margin: 0, marginTop: 0, flex: 1 }}> */}
        {/* <SectionContent> */}
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(posts): any => posts.id}
        />
        {/* </SectionContent> */}
        {/* </Section> */}
        {/* <Button
          text="Press"
          color="#f194ff"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        /> */}
        <Pressable
          onPress={onPressFunction}
          style={[styles.AddButton, isDarkmode ? styles.dark : styles.white]}
        >
          <View>
            <Ionicons
              name="add"
              size={24}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          </View>
        </Pressable>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff12",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  user: {
    fontSize: 17,
  },
  userImg: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
  },
  body: {
    fontSize: 16,
  },
  AddButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
    borderRadius: 50,
    padding: 10,
  },
  white: {
    backgroundColor: themeColor.white100,
  },
  dark: {
    backgroundColor: themeColor.dark,
  },
});
