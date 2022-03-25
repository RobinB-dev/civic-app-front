import React, { useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from "react-native";
import { MainStackParamList } from "../types/navigation";
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

// const findUser = (_userName: string) => {
//   return USERS.find((o: { username: string }) => o.username === _userName);
// };

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainStackParamList, "SinglePost">) {
  const { isDarkmode, setTheme } = useTheme();
  const { id, content, title, tag, image, uid }: any = route.params;

  //   console.log("vreo", route.params);

  return (
    <Layout>
      <TopNav 
        middleContent={title}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
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
      <View style={{height:"2.5%"}}></View>
      <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={{height:"100%"}} style={styles.postContainer}>
      <View style={styles.usernameCont}>
          <Image
            style={styles.iconCat}
            source={require("../../assets/images/userpic.png")}
          ></Image>
          <Text style={styles.username}>Jackie Chan</Text>
      </View>
      <Image
          resizeMode="contain"
            style={styles.image}
            source={{
              uri: image,
          }}
        />
      <View
              style={styles.categoryCont
              }
            >
          <Image
            source={require("../../assets/images/categoryIconList.png")}
            style={styles.iconCat}
          ></Image>
          <Text style={{ fontSize: 10, color: "#191919", marginRight:5 }}>{tag}</Text>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        {/* <Text>id :{id}</Text> */}
        
        <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
        <Text style={styles.subtitle}>J'ai constaté ce problème</Text>
        </View>
        
      <View style={styles.xpHeader}>
           <View style={styles.xpBar}>
             <Image
               style={styles.xpBarBase}
               source={require("../../assets/images/xp-bar.png")}
             ></Image>
             <View
               style={[styles.xpBarOverlay]}
             >
               <View style={styles.xpBarOverlayShine}></View>
             </View>
             </View>
           </View>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>
           <Text style={styles.content}>Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !{content}</Text>

      </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  // fullScreen: {
  //   // flex: 1,
  //   alignItems: "center",
  //   // overflow:"scroll",
  //   // justifyContent: "center",
  //   // backgroundColor: "#F7F7F7",
  // },

  pageContainer : {
    width : "100%",
    // height:"100%",
    // display:"flex",
    // alignSelf:"center",
    flex: 1,
    // flexGrow:1,
    alignItems: "center",
    // overflow:"scroll",
    // backgroundColor : "#F7F7F7",
    
    // padding :
  },

  postContainer : {
    width:"80%",
    // display:"flex",
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    // backgroundColor : "#F7F7F7",
    // height:"100%"
    
  },

  header: {
    width: "100%",
    marginTop: "10%",
    height: "10%",
    // backgroundColor: '#FF9900',:
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 28,
    color: "#B4B4B4",
  },

  title: {
    // fontWeight: 600,
    fontSize: 24,
    // flexShrink: 1 ,
    // width: "60%",
    color: "#2C60C6",
    marginVertical: 10,
  },
  subtitle: {
    // fontWeight: 600,
    fontSize: 18,
    // flexShrink: 1 ,
    // width: "60%",
    color: "#2C60C6",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#2C60C6",
  },
  
  content: {
    fontSize: 14,
    // flex: 1,
    // flexShrink:1,
    color: "#838383",
    marginBottom:25,
  },

  username: {
    color: "#FF4070",
    fontSize: 16,
    marginVertical:10,
  },

  usernameCont: {
    // width:30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
  },

  image :{
    marginVertical:10,
    height: "30%",
    resizeMode: "cover",
    // flex:1,
    width: '100%',
  

  },
  
  iconCat: {
    marginRight: "5%",
    // margin: "2.5%"
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
  alignSelf: 'flex-start',
  marginVertical:10,
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
    height: "40%",
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
});
