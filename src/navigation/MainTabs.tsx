import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
import Home from "../screens/Home";
import Map from "../screens/Map";
import Profile from "../screens/Profile";

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#f7F7F7",
        },
      }}
    >
      {/* these icons using Ionicons */}
      

      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profil" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
            focused={focused}
            focusImage={require("../../assets/images/icons/iconProfActive.png")}
            unFocusImage={require("../../assets/images/icons/iconProf.png")}
          />
          ),
        }}
      />

      <Tabs.Screen
        name="Acueil"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Fil" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
            focused={focused}
            focusImage={require("../../assets/images/icons/iconFeedActive.png")}
            unFocusImage={require("../../assets/images/icons/iconFeed.png")}
          />
          ),
        }}
      />
    

        <Tabs.Screen
        name="Carte"
        component={Map}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Carte" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
            focused={focused}
            focusImage={require("../../assets/images/icons/iconMapActive.png")}
            unFocusImage={require("../../assets/images/icons/iconMap.png")}
          />
          ),
        }}
      />

    </Tabs.Navigator>
  );
};

export default MainTabs;
