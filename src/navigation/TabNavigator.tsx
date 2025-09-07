import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddAccountScreen from "../screens/AddAccountScreen";
import DashboardScreen from "../screens/DashboardScreen";
import HomeScreen from "../screens/HomeScreen";

export type DashboardStackParamList = {
  Dashboard: undefined;
  Home: undefined;
};

const DashboardStackNav = createNativeStackNavigator<DashboardStackParamList>();

function DashboardStack() {
  return (
    <DashboardStackNav.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStackNav.Screen name="Dashboard" component={DashboardScreen} />
      <DashboardStackNav.Screen name="Home" component={HomeScreen} />
    </DashboardStackNav.Navigator>
  );
}

export type RootTabParamList = {
  DashboardTab: undefined;
  Add: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const icons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  DashboardTab: "grid",
  Add: "add-circle",
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name]} size={size} color={color} />
        ),
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        contentStyle: { backgroundColor: "#0A0E14" },
        tabBarStyle: {
          backgroundColor: "#0A0E14",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingTop: 5,
          paddingBottom: 0,
          margin: 0,
        },
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardStack} />
      <Tab.Screen name="Add" component={AddAccountScreen} />
    </Tab.Navigator>
  );
}
