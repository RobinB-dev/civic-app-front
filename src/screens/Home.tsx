import { useEffect, useState } from "react";
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
import { CardPost } from "../components/CardPost";
import Loading from "../screens/utils/Loading";

import { gql, useQuery, useMutation } from "@apollo/client";
import { testObj } from "../decl/functions.decl";

const POSTS_QUERY = gql`
  query appInfos {
    Posts {
      content
      id
      createdAt
    }
  }
`;

const findUser = (_userId: number) => {
  return USERS.find((o: { userId: number }) => o.userId === _userId);
};

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const [posts, setPosts] = useState(DATA);
  const { isDarkmode, setTheme } = useTheme();

  const { data, loading, error } = useQuery(POSTS_QUERY);

  // console.log("posts : ", data);
  // console.log("isLoading : ", loading);
  // console.log("error : ", error);

  useEffect(() => {
    if (!loading) {
      if (data) {
        // console.log("not loading : ", loading);
        // console.log("posts : ", data);
        setPosts(testObj(data, "Posts"));
      }
    } else {
      // console.log("loading : ", loading);
    }
  }, [loading]);

  const renderItem = ({ item }: any) => (
    <CardPost
      title={item.title}
      content={item.content}
      // user={findUser(item.userId)}
      // user={findUser(item.userId)}
      // navigation={navigation}
    ></CardPost>
  );

  const onPressFunction = () => {
    // navigation.navigate("NewPost", { userName: "Robin" });
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
        {loading && <Loading />}
        {!loading && (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(posts): any => posts.id}
          />
        )}
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
    backgroundColor: "#fefefe",
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
    fontSize: 0,
  },
  content: {
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
