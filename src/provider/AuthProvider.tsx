import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type ContextProps = {
  user: null | boolean;
  setUser?: any;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  // const auth = getAuth();
  // user null = loading
  const [user, setUser] = useState<null | boolean>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    // onAuthStateChanged(auth, function (u) {
    if (true) {
      setUser(true);
      // getUserData();
    } else {
      setUser(false);
      // setUserData(null);
    }
  }
  // );
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
