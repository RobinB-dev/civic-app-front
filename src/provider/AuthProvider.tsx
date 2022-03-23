import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      setUser(true);
    } else {
      // console.log("no token", token);
      // setUser(false);
      setUser(true);
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
