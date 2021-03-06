import React, { useContext, useEffect } from "react";
import { getApps, initializeApp } from "firebase/app";
import { AuthContext } from "../provider/AuthProvider";

import { NavigationContainer } from "@react-navigation/native";

import Main from "./MainStack";
import Auth from "./AuthStack";
import Loading from "../screens/utils/Loading";

import { gql, useQuery, useMutation } from "@apollo/client";

const USER_QUERY = gql`
  query Query {
    getPosts {
      id
      content
      createdAt
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(USER_QUERY);
  const auth = useContext(AuthContext);
  const isLogged = auth.isLogged;

  useEffect(() => {
    // console.log("isLogged", isLogged);
  }, [isLogged]);

  return (
    // <NavigationContainer>
    //   {loading == true && <Loading />}
    //   {data == undefined && <Auth />}
    //   {data && <Main />}
    // </NavigationContainer>
    <NavigationContainer>
      {isLogged == null && <Loading />}
      {isLogged == false && <Auth />}
      {isLogged == true && <Main />}
    </NavigationContainer>
  );
};
