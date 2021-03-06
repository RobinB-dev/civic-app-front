import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
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
import useLocation from "../hooks/useLocation";

const POSTS_QUERY = gql`
  query Posts {
    getPosts {
      id
      uid
      content
      createdAt
      tag
      title
      lat
      lng
      image
    }
  }
`;

// const findUser = (_userId: number) => {
//   return USERS.find((o: { userId: number }) => o.userId === _userId);
// };

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const PostQuery = useQuery(POSTS_QUERY);
  const [posts, setPosts] = useState(testObj(PostQuery.data, "getPosts"));
  const { getLocation, errorMsg } = useLocation();

  // console.log("loca : ", getLocation);
  // console.log("isLoading : ", loading);
  // console.log("error : ", error);

  useEffect(() => {
    if (!PostQuery.loading) {
      if (PostQuery.data) {
        // console.log("rererer ", testObj(PostQuery.data, "getPosts"));
        // console.log("not loading : ", loading);
        // console.log("posts : ", PostQuery.data);
        setPosts(testObj(PostQuery.data, "getPosts"));
      }
    } else {
      // console.log("loading : ", loading);
    }
  }, [PostQuery.loading, PostQuery.data]);

  const renderItem = ({ item }: any) => (
    <CardPost
      title={item.title}
      content={item.content}
      uid={item.uid}
      tag={item.tag}
      navigation={navigation}
      id={item.id}
      image={item.image}
      // user={findUser(item.userId)}
      // navigation={navigation}
    ></CardPost>
  );

  const handleAdd = () => {
    console.log("dede", getLocation);

    navigation.navigate("NewPost", {
      location: testObj(getLocation, "coords"),
    });
  };

  const onPressFunction = () => {
    // navigation.navigate("NewPost", { userName: "Robin" });
    console.log("Add post");
  };
  // const auth = getAuth();
  return (
    <Layout>
      <TopNav
        middleContent="Fil d'actualit??s"
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Onboarding");
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#FF4070",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/images/icons/info.png")}
            style={{ height: 15, resizeMode: "contain" }}
          ></Image>
          <Text style={{ padding: 5, fontSize: 16, color: "#F7F7F7" }}>
            Embarquement
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {PostQuery.loading && <Loading />}
        {!PostQuery.loading && (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(posts): any => posts.id}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addToMapButton} onPress={handleAdd}>
        <View style={styles.addToMapButtonImageBackground}></View>
        <Image
          style={styles.addToMapButtonImage}
          source={require("../../assets/images/add-to-map.png")}
        ></Image>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.addToMapButton}>
        <View style={styles.addToMapButtonImageBackground}></View>
        <Image
          style={styles.addToMapButtonImage}
          source={require("../../assets/images/add-to-map.png")}
        ></Image>
      </TouchableOpacity> */}
      {/* <View>
            <Image source={require("../../assets/images/icons/plus.png")}></Image>
          </View> */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  // item: {
  //   backgroundColor: "#fefefe",
  //   // padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
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

  addToMapButton: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 35,
    right: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  addToMapButtonImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  addToMapButtonImageBackground: {
    position: "absolute",
    width: 35,
    height: 35,
    backgroundColor: "#FFFFFF",
  },
  locateMapButton: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 95,
    right: 50,
  },
  locateMapImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
