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

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailsScreen: {
    itemId: number;
    otherParam: string;
  };
};

// const Item = ({ title, content, user, navigation }: any) => (
export const CardPost = ({
  title,
  content,
  navigation,
  id,
  uid,
  tag,
  image,
}: any) => {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <View style={{marginLeft: 30, marginRight :30,}} >
    <Pressable
      style={styles.postContainer}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate("SinglePost", {
          id: id,
          tag: tag,
          uid: uid,
          content: content,
          title: title,
          image: image,
        });
      }}
    >
      <Image
        source={require("../../assets/images/Post1.png")}
        fadeDuration={0}
        style={styles.image}
      />
      <View style={styles.titleCont}>
        <View style={styles.usernameCont}>
          <Image
            style={styles.iconCat}
            source={require("../../assets/images/userpic.png")}
          ></Image>
          <Text style={styles.username}>{uid}</Text>
        </View>

        <View style={styles.textCont}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.btnCont}>
        <View
          style={styles.categoryCont
          }
        >
          <Image
            source={require("../../assets/images/categoryIconList.png")}
            style={styles.iconCat}
          ></Image>
          <Text style={{ fontSize: 10, color: "#191919" }}>Problème</Text>
        </View>
        
        <View
          style={styles.btn        
          }
        >
          <Image
            source={require("../../assets/images/icons/eyesmall.png")}
            style={{width:20, height:20,}}
          ></Image>
          <Pressable>
          <Text style={{ fontSize: 10, color: "#F7F7F7" }}>Voir</Text>
          </Pressable>
        </View>
      </View>
      </View>
      <View style={styles.separator}></View>
    </Pressable>

     </View>
  );
};

const styles = StyleSheet.create({
  // item: {
  //   backgroundColor: "#cbcbcb23",
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  title: {
    // fontWeight: 600,
    fontSize: 18,
    flexShrink: 1 ,
    // width: "60%",
    color: "#DADADA",
    margin: 0,
    padding: 0,
  },
  content: {
    fontSize: 10,
    flex: 1,
    flexShrink:1,
  },
  white: {
    backgroundColor: themeColor.white100,
  },
  dark: {
    backgroundColor: themeColor.dark,
  },
  postContainer: {
    display: "flex",
    marginVertical: "10%",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: "40%",
    height: "100%",
    resizeMode: "cover",
    marginRight: "8%",
    borderRadius: 8,
  },
  titleCont: {
    // marginTop:"5%",
    // marginRight:"2.5%",
    display: "flex",
    // flexDirection:"row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex:1,
  },

  categoryCont:{
    display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FCF4ED",
            borderRadius: 20,
            padding: 3,
            borderWidth: 1,
            borderColor: "#DADADA",
            marginRight: "5%"
  },

  btn:{
    display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FF4070",
            borderRadius: 20,
            padding: 3,
            paddingRight:"6%",
            borderWidth: 1,
            borderColor: "#DADADA",
  },

  btnCont: {
    flexDirection:"row",
    justifyContent: "space-between",
  },

  username: {
    color: "#FF4070",
    fontSize: 12,
  },

  usernameCont: {
    // width:30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  textCont: {
    justifyContent: "center",
    // alignItems : "center",
    flex: 1,
  },

  iconCat: {
    marginRight: "5%",
    // margin: "2.5%"
  },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#DADADA",
    marginTop: 30,
  },
});
