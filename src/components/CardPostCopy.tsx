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
      
          <View style={styles.usernameCont}>
            <Image style={styles.iconCat} source={require("../../assets/images/userpic.png")}></Image>
            <Text style={styles.username}>Jackie Chan</Text>
          </View>

          <View style={styles.textCont}>
            <Text style={styles.title}>{"Graffiti pas piqué des hannetons"}</Text>
            <Text style={styles.content}>{"Paris XIII (1.2km)"}</Text>
          </View>
          
          <View style={{display:"flex", flexDirection:"row", alignItems: "center", backgroundColor:"#FCF4ED", borderRadius:20, padding:5, borderWidth:1, borderColor:"#2C60C6"}}>
          <Image
          source={require('../../assets/images/categoryIconList.png')}
          style={styles.iconCat}
          >
          </Image>
          <Text style ={{fontSize:10, color:"#191919"}}>Problème
          </Text>
          </View>

        </View>
        <View style={styles.separator} ></View>
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
    // fontWeight: 600,
    fontSize: 14,
    // flexShrink: 1 ,
    // width: "60%",
    color: "#2C60C6",
    margin: 0,
    padding: 0,
  },
  content: {
    fontSize: 10,
    // flex: 1,
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
    // marginHorizontal: 16,s
    // backgroundColor: "#ffffff",
    width: 325,
    height: 100,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    
  },
  image: { 
    width: "30%",
    height: "100%",
    resizeMode: 'cover',
    marginRight:10,
    borderRadius: 8,
  },
  titleCont: {
    // marginTop:"5%",
    // marginRight:"2.5%",
    display:"flex",
    // flexDirection:"row",
    alignItems: "flex-start",
    justifyContent:"flex-start",
    // flex: 2 ,
  },
  
  username :{
    color :"#FF4070",
    fontSize: 12,
  },

  usernameCont: {
      // width:30,
      display:"flex",
      flexDirection:"row",
      alignItems: "center",
      flex: 1,
    },

  textCont : {
    justifyContent: "center",
    // alignItems : "center",
    flex: 2,
  },

  iconCat: {
    marginRight:"5%",
    // margin: "2.5%"
  },

  separator :{
    width: "100%",
    height: 1,
    backgroundColor : "#DADADA",
    marginTop : 30,
  },
});
