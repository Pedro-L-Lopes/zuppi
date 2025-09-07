import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Account } from "../db/types/types";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  Tabs: undefined;
  AccountDetails: { account: Account };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0A0E14" },
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetailsScreen}
        options={{
          headerShown: true,
          title: "Detalhes da Conta",
          headerStyle: { backgroundColor: "#0A0E14" },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
