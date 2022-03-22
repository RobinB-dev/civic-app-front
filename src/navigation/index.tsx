import React, { useContext } from "react";
import { getApps, initializeApp } from "firebase/app";
import { AuthContext } from "../provider/AuthProvider";

import { NavigationContainer } from "@react-navigation/native";

import Main from "./MainStack";
import Auth from "./AuthStack";
import Loading from "../screens/utils/Loading";

import { gql, useQuery, useMutation } from "@apollo/client";

const USER_QUERY = gql`
  query appInfos {
    Posts {
      content
      id
      createdAt
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(USER_QUERY);
  const auth = useContext(AuthContext);
  const user = auth.user;

  return (
    // <NavigationContainer>
    //   {loading == true && <Loading />}
    //   {data == undefined && <Auth />}
    //   {data && <Main />}
    // </NavigationContainer>
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
