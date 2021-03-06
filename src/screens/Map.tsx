import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Section, useTheme } from "react-native-rapi-ui";
import MapView, { AnimatedRegion, LatLng, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { gql, useQuery, useMutation } from "@apollo/client";
import { testObj } from "../decl/functions.decl";

const POSTS_QUERY = gql`
  query Posts {
    getPosts {
      id
      uid
      content
      title
      lat
      lng
    }
  }
`;

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const [level, setLevel] = useState(12);
  const [progress, setProgress] = useState(73);
  const [markers, setMarkers] = useState([]);
  const [markersDisplay, setMarkersDisplay] = useState<any>([]);
  const MarkersQuery = useQuery(POSTS_QUERY);
  let tableau: {
    coordinate: { latitude: number; longitude: number };
    title: string;
    description: string;
  }[] = [];

  useEffect(() => {
    markers.forEach((marker) => {
      tableau.push({
        coordinate: {
          latitude: parseFloat(marker["lat"]),
          longitude: parseFloat(marker["lng"]),
        },
        title: marker["title"],
        description: marker["content"],
      });
    });
    setMarkersDisplay(tableau);
  }, [markers]);

  useEffect(() => {
    if (!MarkersQuery.loading) {
      if (MarkersQuery.data) {
        setMarkers(testObj(MarkersQuery.data, "getPosts"));
      }
    } else {
      // console.log("loading : ", loading);
    }
  }, [MarkersQuery.loading, MarkersQuery.data]);

  const [location, setLocation] = useState({
    coords: {
      accuracy: 5,
      altitude: 0,
      altitudeAccuracy: -1,
      heading: -1,
      latitude: 37.785834,
      longitude: -122.406417,
      speed: -1,
    },
    timestamp: 1648005192901.4148,
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  const markers2 = [
    {
      coordinate: { latitude: 48.857786, longitude: 2.339314 },
      title: "Trottinette dans la Seine ????",
      description: "R??alis?? le 1er janvier 2022 ?? 8:42, +250 XP !",
    },
    {
      coordinate: { latitude: 48.853486, longitude: 2.339314 },
      title: "Nettoyer la poubelle du 8 qui traine l??",
      description: "R??alis?? le 12 d??cembre 2021 ?? 12:37, +50 XP !",
    },
    {
      coordinate: { latitude: 48.857786, longitude: 2.359314 },
      title: "Retirer quelques m??gots",
      description: "R??alis?? le 17 f??vrier 2021 ?? 16:25, +10 XP !",
    },
  ];

  const [regionState, setRegionState] = useState({
    latitude: 48.857786,
    longitude: 2.339314,
    latitudeDelta: 0.095,
    longitudeDelta: 0.045,
  });
  const region = useRef(regionState);

  const handleAdd = () => {
    navigation.navigate("NewPost", { location: location.coords });
  };

  const handleLocate = () => {
    setProgress(progress + 2.5);
    if (progress >= 100) {
      setProgress(0);
      setLevel(level + 1);
    }
    setRegionState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });
  };
  // console.log("ddede", markers2, tableau);

  useEffect(() => {
    region.current = regionState;
  }, [regionState]);

  return (
    <Layout>
      <View style={styles.container}>
        {Platform.OS === "ios" || Platform.OS === "android" ? (
          <MapView
            style={styles.map}
            region={region.current}
            showsUserLocation={true}
          >
            {markersDisplay.map(
              (
                marker: {
                  coordinate: LatLng | AnimatedRegion;
                  title: string | undefined;
                  description: string | undefined;
                },
                index: React.Key | null | undefined
              ) => (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                ></Marker>
              )
            )}
          </MapView>
        ) : (
          <Text>Not suported</Text>
        )}

        <TouchableOpacity style={styles.addToMapButton} onPress={handleAdd}>
          <View style={styles.addToMapButtonImageBackground}></View>
          <Image
            style={styles.addToMapButtonImage}
            source={require("../../assets/images/add-to-map.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locateMapButton} onPress={handleLocate}>
          <Image
            style={styles.locateMapImage}
            source={require("../../assets/images/locate-map.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.xpHeader}>
          <View style={styles.xpBar}>
            <Image
              style={styles.xpBarBase}
              source={require("../../assets/images/xp-bar.png")}
            ></Image>
            <View
              style={[styles.xpBarOverlay, { width: `${progress * 0.975}%` }]}
            >
              <View style={styles.xpBarOverlayShine}></View>
            </View>
          </View>
          <View style={styles.xpStar}>
            <Image
              style={styles.xpStarBase}
              source={require("../../assets/images/xp-star.png")}
            ></Image>
            <Text style={styles.xpStarLevel}>{level}</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  map: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#FF4070",
  },

  xpHeader: {
    position: "absolute",
    width: "92.5%",
    left: "7.5%",
    height: "12%",
    top: "4.5%",
    alignItems: "center",
    justifyContent: "center",
  },

  xpBar: {
    width: "60%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  xpBarBase: {
    width: "100%",
    resizeMode: "contain",
  },

  xpBarOverlay: {
    width: "97.5%",
    height: "27%",
    left: "1.25%",
    top: "35%",
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

  xpStar: {
    position: "absolute",
    width: 80,
    height: 80,
    left: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  xpStarBase: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  xpStarLevel: {
    position: "absolute",
    fontSize: 32,
    color: "#FF4070",
    fontWeight: "900",
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
