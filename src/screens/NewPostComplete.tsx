import React, { useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput, KeyboardAvoidingView, Alert } from "react-native";
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
import { Camera } from 'expo-camera'

import USERS from "../provider/users.json";
import { StatusBar } from "expo-status-bar";

// const findUser = (_userName: string) => {
//   return USERS.find((o: { username: string }) => o.username === _userName);
// };

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainStackParamList, "NewPostComplete">) {

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  // const [postImage, setPostImage] = useState(route.params.photo)
  const [postType, setPostType] = useState('')
  // const [postLatitude, setPostLatitude] = useState(route.params.location.latitude)
  // const [postLongitude, setPostLongitude] = useState(route.params.location.longitude)

  const [categoryButtonColor1, setCategoryButtonColor1] = useState('#FCF4ED')
  const [categoryButtonColor2, setCategoryButtonColor2] = useState('#FCF4ED')
  const [categoryButtonColor3, setCategoryButtonColor3] = useState('#FCF4ED')
  const [customMessageText, setCustomMessageText] = useState("Écrivez votre message")

  const handleCat1 = () => {
    setPostType('Problème')
    setCategoryButtonColor1('#FFE34F')
    setCategoryButtonColor2('#FCF4ED')
    setCategoryButtonColor3('#FCF4ED')
    setCustomMessageText("Décrivez votre problème")
  }

  const handleCat2 = () => {
    setPostType('Événement')
    setCategoryButtonColor2('#A93CFF')
    setCategoryButtonColor1('#FCF4ED')
    setCategoryButtonColor3('#FCF4ED')
    setCustomMessageText("Parlez de l'événement")
  }

  const handleCat3 = () => {
    setPostType("Point d'intérêt")
    setCategoryButtonColor3('#1DD286')
    setCategoryButtonColor2('#FCF4ED')
    setCategoryButtonColor1('#FCF4ED')
    setCustomMessageText("Parlez du point d'intérêt")
  }

  const publishPost = () => {
    if (postType != '') {
      if (postTitle != '') {
        navigation.replace('NewPostPublished', {
          postTitle: postTitle,
          postContent: postContent,
          postImage: route.params.photo,
          postType: postType,
          postLatitude: route.params.location.latitude,
          postLongitude: route.params.location.longitude
        })
      } else {
        Alert.alert("Titre manquant 🤖", "Veuillez rédiger un titre afin de pouvoir publier votre post !", [{text:"Je rédige", style:'default'}])
      }
    } else {
      Alert.alert("Catégorie manquante 🤖", "Veuillez sélectionner une catégorie afin de pouvoir publier votre post !", [{text:"Je sélectionne", style:'default'}])
    }
  }

  return (
    <KeyboardAvoidingView style={styles.fullScreen} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Publication</Text>
      </View>
      <ScrollView style={{width: '85%', flex: 1}}>
        <Text style={styles.innerTitle}>Nouvelle publication</Text>
        <View style={styles.separator}></View>
        <Image source={{uri: route.params.photo}} style={styles.uploadedImage}></Image>
        <Text style={styles.photoLocation}>Photo prise à : {route.params.location.latitude}, {route.params.location.longitude} (GPS)</Text>
        <Text style={styles.innerTitle}>Choisissez une catégorie</Text>
        <View style={styles.separator}></View>
        <View style={styles.categories}>
          <TouchableOpacity style={[styles.category, {backgroundColor: categoryButtonColor1}]} onPress={handleCat1}><Text style={styles.categoryText}>Problème</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.category, {backgroundColor: categoryButtonColor2}]} onPress={handleCat2}><Text style={styles.categoryText}>Événement</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.category, {backgroundColor: categoryButtonColor3}]} onPress={handleCat3}><Text style={styles.categoryText}>Point d'intérêt</Text></TouchableOpacity>
        </View>
        {/* <View style={styles.separator}></View> */}
        <Text style={styles.innerTitle}>Choisissez un titre</Text>
        <View style={styles.separator}></View>
        <TextInput 
          style={styles.titleInput}
          placeholder="Mon titre"
          maxLength={60}
          returnKeyType="done"
          value={postTitle}
          placeholderTextColor="#8CA4D3"
          onChangeText={(text) => {
            setPostTitle(text)
          }}
        ></TextInput>
        <Text style={styles.innerTitle}>{customMessageText}</Text>
        <View style={styles.separator}></View>
        <TextInput 
          style={styles.messageInput}
          placeholder="Mon message"
          maxLength={60}
          numberOfLines={5}
          value={postContent}
          placeholderTextColor="#8CA4D3"
          multiline={true}
          onChangeText={(text) => {
            setPostContent(text)
          }}
        ></TextInput>
        <TouchableOpacity style={styles.validateButton} onPress={publishPost}>
          <Text style={styles.validateButtonText}>Publier</Text>
        </TouchableOpacity>
        <View style={styles.footer}></View>
      </ScrollView>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: '#F7F7F7'
  },

  header: {
    width: '100%',
    marginTop: '10%',
    height: '10%',
    // backgroundColor: '#FF9900',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2C60C6',
    borderStyle: 'solid'
  },

  innerTitle: {
    width: '100%',
    fontSize: 22,
    marginTop: '10%',
    color: '#2C60C6',
  },

  separator: {
    width: '100%',
    height: 1,
    marginTop: '1.5%',
    backgroundColor: '#2C60C6',
  },

  headerTitle: {
    fontSize: 28,
    color: '#B4B4B4'
  },

  uploadedImage: {
    width: '100%',
    height: 250,
    marginTop: '5%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  categories: {
    width: '100%',
    marginTop: '2.5%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  category: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: '#2C60C6',
    borderStyle: 'solid'
  },

  categoryText: {
    fontSize: 18,
    color: '#2C60C6'
  },

  titleInput: {
    marginTop: 15,
    fontSize: 18,
    color: '#2C60C6',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: '#2C60C6',
    backgroundColor: '#FCF4ED',
    borderStyle: 'solid'
  },

  footer:{
    width: '100%',
    height: 500
  },

  messageInput: {
    marginTop: 15,
    fontSize: 18,
    color: '#2C60C6',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingBottom: 100,
    borderBottomWidth: 5,
    borderColor: '#2C60C6',
    backgroundColor: '#FCF4ED',
    borderStyle: 'solid'
  },

  validateButton: {
    width: '100%',
    marginTop: 50,
    backgroundColor: '#2C60C6',
    paddingVertical: 18,
    borderRadius: 10
  },
  
  validateButtonText: {
    textAlign: 'center',
    fontSize: 20
  },

  photoLocation: {
    fontSize: 14,
    color: '#2C60C6',
    marginTop: 6,
    width: '100%',
    textAlign: 'right'
  }
});
