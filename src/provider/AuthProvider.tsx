import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ContextProps = {
  user: null | boolean;
  setUser?: any;
  token: null | object;
  setToken?: any;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const storeData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

const AuthProvider = (props: Props) => {
  // const auth = getAuth();
  // user null = loading
  const [user, setUser] = useState<null | boolean>(false);
  const [token, setToken] = useState<null | object>(null);

  useEffect(() => {
    checkLogin();
  }, [token]);

  function checkLogin() {
    if (token) {
      // console.log("token", token);
      storeData("@token", token);
      setUser(true);
    } else {
      // console.log("no token", token);
      getData("@token");
      // setUser(false);
      setUser(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
