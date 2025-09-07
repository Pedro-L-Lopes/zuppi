import React from "react";
import { View } from "react-native";
import DashboardScreen from "../screens/DashboardScreen";
import "../styles/global.css";

export default function Index() {
  return (
    <View className="pt-14">
      <DashboardScreen />
    </View>
  );
}
