import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
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
  TextInput,
  Button,
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
      <View style={{ height: 20 }}></View>
      <View style={styles.pageContainer}>
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.postContainer}>
          
          <Pressable

            style={styles.usernameCont}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate("UserProfile", { uid: uid });
            }}
          >
            
            <Text style={styles.username}>Jackie Chan</Text>
          </Pressable>
          
         
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: image,
            }}
          /> 
          
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={styles.categoryCont}>
         
            <Image
              source={require("../../assets/images/categoryIconList.png")}
              style={styles.iconCat}
            ></Image>
            <Text style={{ fontSize: 10, color: "#191919", marginRight: 5 }}>
              {tag}
            </Text>
          </View>
          <Image style={{resizeMode:"contain",width:20, opacity:0.5}} source={require('../../assets/images/icons/checkGrey.png')}></Image>
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            {/* <Text>id :{id}</Text> */}

            <Text style={styles.content}>
              Faites votre trajet du quotidien ou baladez vous dans votre
              quartier pour pouvoir marquer les points qui pourront aider vos
              concitoyens ! C'est tout simpl es votre trajet du quotidien ou baladez vous dans votre
              quartier pour pouvoir marquer les points qui pourront aider vos
              concitoyens ! C'est tout simples votre trajet du quotidien ou baladez vous dans votre
              quartier pour pouvoir marquer les points qui pourront aider vos
              
              {content}
            </Text>
            
          </View>
            <Text style={styles.subtitle}>J'ai constaté ce problème</Text>
            <Text style={styles.contentSmall}>20votes</Text>
            <View style ={{flexDirection:"row", alignItems:"center"}}>
          <Image source={require('../../assets/images/icons/dislike.png')}></Image>
          
          <View style={styles.xpHeader}>
            <View style={styles.xpBar}>
              <Image
                style={styles.xpBarBase}
                source={require("../../assets/images/xp-bar.png")}
              ></Image>
              <View style={[styles.xpBarOverlay]}>
                <View style={styles.xpBarOverlayShine}></View>
              </View>
            </View>
          </View>

          <Image source={require('../../assets/images/icons/like.png')}></Image>
          </View>
          <Text style={styles.subtitle}>Commentaires</Text>
          <View style={{flexDirection: "row", alignItems:'center', justifyContent:"space-between"}}>
            <Text style={styles.contentSmall}>5 commentaires</Text>
            <View style={{flexDirection: "row", alignItems:'center'}}>
              <Text style={styles.contentSmall}>Trier par</Text>
              <Text style={styles.contentDrop}>Plus récents</Text>
            </View>
          </View>
          <View style={{height:25}}></View>
         
          <View>
          <Pressable

              style={styles.usernameCont}
              onPress={() => {
  /* 1. Navigate to the Details route with params */
  navigation.navigate("UserProfile", { uid: uid });
              }}
              >
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require("../../assets/images/userpic.png")}
              ></Image>
              <Text style={styles.username}>Jackie Chan</Text>
              </Pressable>
            <Text style={styles.content}>Sed commodo leo nulla tristique urna sed quam quis. Tempor, massa nam fames faucibus.</Text>
            <View style={{alignItems: "flex-end", borderBottomWidth:1, borderBottomColor:"#DADADA", marginBottom:30,}}>
              <Text style={{fontSize: 10, color: "#838383", }}>25/03/22 à 5h35</Text>
            </View>
          </View>
          <View>
          <Pressable

              style={styles.usernameCont}
              onPress={() => {
  /* 1. Navigate to the Details route with params */
  navigation.navigate("UserProfile", { uid: uid });
              }}
              >
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require("../../assets/images/userpic.png")}
              ></Image>
              <Text style={styles.username}>Jackie Chan</Text>
              </Pressable>
            <Text style={styles.content}>Sed commodo leo nulla tristique urna sed quam quis. Tempor, massa nam fames faucibus.</Text>
            <View style={{alignItems: "flex-end", borderBottomWidth:1, borderBottomColor:"#DADADA", marginBottom:30,}}>
              <Text style={{fontSize: 10, color: "#838383", }}>25/03/22 à 5h35</Text>
            </View>
          </View>
          <View>
          <Pressable

              style={styles.usernameCont}
              onPress={() => {
  /* 1. Navigate to the Details route with params */
  navigation.navigate("UserProfile", { uid: uid });
              }}
              >
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require("../../assets/images/userpic.png")}
              ></Image>
              <Text style={styles.username}>Jackie Chan</Text>
              </Pressable>
            <Text style={styles.content}>Sed commodo leo nulla tristique urna sed quam quis. Tempor, massa nam fames faucibus.</Text>
            <View style={{alignItems: "flex-end", borderBottomWidth:1, borderBottomColor:"#DADADA", marginBottom:30,}}>
              <Text style={{fontSize: 10, color: "#838383", }}>25/03/22 à 5h35</Text>
            </View>
          </View>
          <View>
          <Pressable

              style={styles.usernameCont}
              onPress={() => {
  /* 1. Navigate to the Details route with params */
  navigation.navigate("UserProfile", { uid: uid });
              }}
              >
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require("../../assets/images/userpic.png")}
              ></Image>
              <Text style={styles.username}>Jackie Chan</Text>
              </Pressable>
            <Text style={styles.content}>Sed commodo leo nulla tristique urna sed quam quis. Tempor, massa nam fames faucibus.</Text>
            <View style={{alignItems: "flex-end", borderBottomWidth:1, borderBottomColor:"#DADADA", marginBottom:30,}}>
              <Text style={{fontSize: 10, color: "#838383", }}>25/03/22 à 5h35</Text>
            </View>
          </View>
          <View>
          <Pressable

              style={styles.usernameCont}
              onPress={() => {
  /* 1. Navigate to the Details route with params */
  navigation.navigate("UserProfile", { uid: uid });
              }}
              >
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require("../../assets/images/userpic.png")}
              ></Image>
              <Text style={styles.username}>Jackie Chan</Text>
              </Pressable>
            <Text style={styles.content}>Sed commodo leo nulla tristique urna sed quam quis. Tempor, massa nam fames faucibus.</Text>
            <View style={{alignItems: "flex-end", borderBottomWidth:1, borderBottomColor:"#DADADA", marginBottom:30,}}>
              <Text style={{fontSize: 10, color: "#838383", }}>25/03/22 à 5h35</Text>
            </View>
          </View>

          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Votre commentaire"
              // value={default}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={true}
              // secureTextEntry={true}
              // onChangeText={(text) => setPassword(text)}
            />
        
            <Button
              text="Commenter"
              onPress={() => {
                
              }}
              style={{
                marginTop: 20,
              }}
              // disabled={loading}
            />
         


        <View style={{height:500}}></View>
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({

  pageContainer : {
    width : "100%",
    flex: 1,
    alignItems: "center",
    // height:"200%"
  },

  postContainer : {
    width:"80%",
    flex: 1,
  },

  title: {
    fontSize: 24,
    color: "#2C60C6",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#2C60C6",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#2C60C6",
  },

  content: {
    fontSize: 14,
    color: "#838383",
    marginBottom: 20,
  },
  contentSmall: {
    fontSize: 10,
    color: "#838383",
    marginRight: 5,
  },
  contentDrop: {
    fontSize: 10,
    // display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCF4ED",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#DADADA",
    color: "#838383",
    // marginVertical: 10,
  },

  username: {
    color: "#FF4070",
    fontSize: 16,
    marginLeft: 10,
  },

  usernameCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom:"5%"
  },

  image :{
    marginTop:10,
    height: "20%",
    resizeMode: "cover",
    width: '100%',
    borderRadius:8,
  

  },

  iconCat: {
    marginRight: "5%",
  },

  categoryCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCF4ED",
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: "#DADADA",
    alignSelf: "flex-start",
    marginVertical: 10,
    
  },

  xpHeader: {
    width: "80%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  xpBar: {
    width: "80%",
    height: 35,
    alignItems: "flex-start",
    justifyContent: "center",
    
  },

  xpBarBase: {
    width: "100%",
    resizeMode: "contain",
  },

  xpBarOverlay: {
    width: "50%",
    height: "60%",
    // left: "%",
    top: "16%",
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
