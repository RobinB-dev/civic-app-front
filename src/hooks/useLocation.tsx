import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [getLocation, setGetLocation] = useState({});

  const [errorMsg, setErrorMsg] = useState("");

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});

      setGetLocation(location);
    })();
  }, []);

  return { getLocation, errorMsg };
};

export default useLocation;
