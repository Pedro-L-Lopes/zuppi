import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import AccountItem from "../components/AccountItem";
import { deleteAccount } from "../db/actions/accountsActions";
import { useAccounts } from "../db/hooks/useAccounts";

export default function HomeScreen({ navigation }: any) {
  const { accounts, refreshAccounts } = useAccounts();
  const [filterType, setFilterType] = useState<"all" | "receita" | "despesa">(
    "all"
  );

  useFocusEffect(
    React.useCallback(() => {
      refreshAccounts();
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteAccount(id);
    refreshAccounts();
  };

  const filteredAccounts = accounts.filter((acc) => {
    if (filterType === "all") return true;
    return acc.type === filterType;
  });

  return (
    <View className="flex-1 bg-[#0A0E14] p-4">
      {/* Botão adicionar conta */}
      <Pressable
        onPress={() => navigation.navigate("Add")}
        className="bg-gradient-to-r from-[#1DA1F2] to-[#00D26A] flex-row items-center justify-center py-3 px-5 rounded-2xl mb-5 shadow-md"
      >
        <AntDesign name="pluscircleo" size={20} color="white" />
        <Text className="text-white font-semibold ml-2">Adicionar Conta</Text>
      </Pressable>

      {/* Botões de filtro */}
      <View className="flex-row justify-between mb-4">
        {[
          { type: "all", label: "Todas", color: "#9CA3AF" },
          { type: "receita", label: "Receitas", color: "#00D26A" },
          { type: "despesa", label: "Despesas", color: "#1DA1F2" },
        ].map((btn) => (
          <Pressable
            key={btn.type}
            onPress={() => setFilterType(btn.type as any)}
            className={`flex-1 mx-1 py-2 rounded-xl border ${
              filterType === btn.type
                ? "bg-[#161B22] border-gray-500"
                : "bg-[#0D1117] border-gray-700"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                filterType === btn.type
                  ? `text-[${btn.color}]`
                  : "text-gray-400"
              }`}
            >
              {btn.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista de contas */}
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AccountItem account={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <Text className="text-center mt-6 text-gray-500">
            Nenhuma conta cadastrada.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
