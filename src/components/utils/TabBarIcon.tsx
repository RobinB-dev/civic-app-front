import React from "react";
import { themeColor, useTheme, Text } from "react-native-rapi-ui";

type TabBarIcon = {
  focusImage: any;
  unFocusImage: any;
  focused: boolean;
};
import { Image } from "react-native";
export default ({ focusImage, unFocusImage, focused }: TabBarIcon) => {
  const { isDarkmode } = useTheme();

  return (
    <Image
      source={focused ? focusImage : unFocusImage}
      resizeMode="contain"
      style={{ height: 30, width: 30, margin: 5 }}
    />
  );
};