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
export const CardPost = ({ title, content }: any) => {
  const { isDarkmode, setTheme } = useTheme();

  const onPressFunction = () => {
    // navigation.navigate("NewPost", { userName: "Robin" });
    console.log("Add post");
  };

  return (
    
          // <View >
            <Pressable
            style={styles.postContainer}
              onPress={onPressFunction}
              // style={[styles.button, isDarkmode ? styles.dark : styles.white]}
            >
             <Image
              source={require('../../assets/images/Post1.png')}
              fadeDuration={0}
              style={styles.image}/>
              <View style={styles.titleCont}>
                <Image
                source={require('../../assets/images/categoryIcon.png')}
                style={styles.iconCat}
                >
                </Image>
                <View>
                  <Text style={styles.title}>{"Graffiti pas piqué des hannetons"}</Text>
                  <Text style={styles.content}>{"Paris XIII (1.2km)"}</Text>
                </View>
              </View>
            </Pressable>
          // </View>

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
    fontSize: 14,
    flexShrink: 1 ,
  },
  content: {
    fontSize: 10,
    flex: 1,
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
    marginHorizontal: 16,
    // backgroundColor: "#ffffff",
    width: 150,
    height: 225,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    
  },
  image: { 
    width: "100%",
    height: "70%",
    resizeMode: 'cover'
  },
  titleCont: {
    marginTop:"5%",
    marginRight:"2.5%",
    display:"flex",
    flexDirection:"row",
    alignItems: "center",
    flex: 1 ,
  },
  iconCat: {
    marginRight:"5%",
    margin: "2.5%"
  }
});
