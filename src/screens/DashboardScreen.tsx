import React from "react";
import { Pressable, Text, View } from "react-native";

export default function DashboardScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-primary1 justify-center items-center p-6">
      <Text className="text-white text-2xl font-bold mb-8">Minhas Contas</Text>

      <Pressable
        onPress={() => navigation.navigate("Home", { type: "receita" })}
        className="w-full bg-green-600 py-4 rounded-2xl mb-4 shadow-md"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Receitas
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Home", { type: "despesa" })}
        className="w-full bg-blue-600 py-4 rounded-2xl shadow-md"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Despesas
        </Text>
      </Pressable>
    </View>
  );
}
