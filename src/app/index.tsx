import React from "react";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import "../styles/global.css";

export default function Index() {
  return (
    <View className="pt-14">
      <HomeScreen />
    </View>
  );
}
