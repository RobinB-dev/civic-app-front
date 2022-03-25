import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ContextProps = {
  user: null | boolean;
  setUser?: any;
  token: any;
  setToken?: any;
  uid: string;
  setUid?: any;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const storeData = async (key: string, value: boolean) => {
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
      return value;
    }
  } catch (e) {
    // error reading value
    return e;
  }
};

const AuthProvider = (props: Props) => {
  // const auth = getAuth();
  // user null = loading
  const [user, setUser] = useState<null | boolean>(false);
  const [token, setToken] = useState<any>(null);
  const [uid, setUid] = useState<string>("Q7RWSRTMA4RkYjqf60kkPEhLDrG3");

  // test1@fm.com
  useEffect(() => {
    // console.log("oui", AsyncStorage.getItem("@token"));

    checkLogin();
  }, [token]);

  useEffect(() => {
    console.log(uid, "uissss");
  }, [uid]);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    getData("@token").then((value) => {
      if (value) {
        console.log("already set", uid);
        setToken(value);

        // console.log(value);

        // setToken(JSON.parse(JSON.stringify(value)));
      } else {
        console.log("no set");
      }
    });
  }

  async function checkLogin() {
    if (token !== null) {
      storeData("@token", true);
      // console.log(" token", token);

      setUser(true);
    } else {
      // storeData("@token", token);
      // console.log("no token", false);
      // getData("@token");
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
        uid,
        setUid,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
