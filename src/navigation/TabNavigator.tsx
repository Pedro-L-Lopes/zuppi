// src/navigation/TabNavigator.tsx
import { Ionicons } from "@expo/vector-icons"; // ou react-native-vector-icons/Ionicons
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AddAccountScreen from "../screens/AddAccountScreen";
import HomeScreen from "../screens/HomeScreen";

export type RootTabParamList = {
  Home: undefined;
  Add: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // remove o header em cima
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Add") {
            iconName = "add-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add" component={AddAccountScreen} />
    </Tab.Navigator>
  );
}
