import React, { useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  route
}: NativeStackScreenProps<MainStackParamList, "NewPost">) {
  const { isDarkmode, setTheme } = useTheme();
  // const [userName, setUserName] = useState("roger");
  // const [userObj, setUserObj] = useState({});
  // useFocusEffect(
  //   useCallback(() => {
  //     if (route.params) {
  //       setUserName(testObj(route.params, "userName")[0]);
  //       setUserObj(findUser(testObj(route.params, "userName")[0])!);
  //     }
  //     return () => {};
  //   }, [])
  // );
  // if (userObj) { console.log(userObj, testObj(userObj, "picture")); }

  const [post, setPost] = useState([{
    id: '',
    title: '',
    content: '',
    image: '',
    type: '',
    lat: '',
    long: ''
  }])

  const [hasPermission, setHasPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasPermission(null)
    })()
  }, [])

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    if (photo.uri) {
      navigation.navigate('NewPostComplete', {
        location: route.params.location,
        photo: photo.uri
      })
    }
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Photo</Text>
      </View>
      <View style={styles.cameraContainer}>
        <Camera 
            ref={ref => setCamera(ref)}
            style={{width: '100%', height: '100%'}} 
            type={type}/>

        <TouchableOpacity style={styles.cameraFlipButton} onPress={() => {setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        )}}>
          <Image style={styles.cameraFlipButtonImage} source={require('../../assets/images/camera-flip.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraShotButton} onPress={__takePicture}>
          <View style={styles.cameraShotButtonCenter}></View>
        </TouchableOpacity>
      </View>
      {image && <Image source={{uri: image}} style={{flex:1}}/>}
      <StatusBar style="dark" />
    </View>
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
  },

  headerTitle: {
    fontSize: 28,
    color: '#B4B4B4'
  },

  cameraContainer: {
    width: '90%',
    borderRadius: 10,
    height: '75%',
    backgroundColor: '#191919',
    alignItems: 'center',
    overflow: 'hidden'
  },

  cameraFlipButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 40,
    top: 40,
    borderRadius: 20,
    backgroundColor: '#2C60C6',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraFlipButtonImage: {
    width: 20,
    resizeMode: 'contain'
  },

  cameraShotButton: {
    position: 'absolute',
    width: 90,
    height: 90,
    bottom: 50,
    borderRadius: 100,
    backgroundColor: '#F7F7F740',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraShotButtonCenter: {
    width: 50,
    height: 50,
    backgroundColor: '#F7F7F7',
    borderRadius: 100
  }
});
