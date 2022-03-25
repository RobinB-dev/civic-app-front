import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabs from "./MainTabs";
import UserPage from "../screens/UserPage";
import NewPost from "../screens/NewPost";
import NewPostComplete from "../screens/NewPostComplete";
import NewPostPublished from "../screens/NewPostPublished";
import SinglePost from "../screens/SinglePost";
import UserProfile from "../screens/UserProfile";
import Onboarding from "../screens/Onboarding";

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="UserPage" component={UserPage} />
      <MainStack.Screen name="Onboarding" component={Onboarding} />
      <MainStack.Screen name="NewPostPublished" component={NewPostPublished} />
      <MainStack.Screen name="NewPost" component={NewPost} />
      <MainStack.Screen name="NewPostComplete" component={NewPostComplete} />
      <MainStack.Screen name="SinglePost" component={SinglePost} />
      <MainStack.Screen name="UserProfile" component={UserProfile} />
      <MainStack.Group screenOptions={{ presentation: "modal" }}>
        <MainStack.Screen name="MyModal" component={NewPost} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default Main;
