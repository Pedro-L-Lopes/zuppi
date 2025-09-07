import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import AccountItem from "../components/AccountItem";
import AccountsSummary from "../components/AccountsSummary";
import MonthFilter from "../components/MonthFilter";
import StatusFilter from "../components/StatusFilter";
import { deleteAccount } from "../db/actions/accountsActions";
import { useAccounts } from "../db/hooks/useAccounts";

export default function HomeScreen({ navigation, route }: any) {
  const { accounts, refreshAccounts } = useAccounts();

  const initialType = route?.params?.type ?? "receita";
  const [filterType, setFilterType] = useState<"all" | "receita" | "despesa">(
    initialType
  );

  const [filterStatus, setFilterStatus] = useState<
    "all" | "pago" | "pendente" | "vencido"
  >("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-09");

  useFocusEffect(
    React.useCallback(() => {
      refreshAccounts();
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteAccount(id);
    refreshAccounts();
  };

  // Aplica todos os filtros
  const filteredAccounts = accounts.filter((acc) => {
    // tipo
    if (filterType !== "all" && acc.type !== filterType) return false;

    // mês/ano
    if (selectedMonth && acc.dueDate) {
      const d = new Date(acc.dueDate);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (ym !== selectedMonth) return false;
    }

    // status
    if (filterStatus !== "all") {
      if (filterStatus === "vencido") {
        return (
          acc.status === "pendente" &&
          acc.dueDate &&
          new Date(acc.dueDate) < new Date()
        );
      }
      return acc.status === filterStatus;
    }

    return true;
  });

  return (
    <View className="flex-1 bg-primary1 p-4 pt-10">
      <AccountsSummary accounts={filteredAccounts} />

      {/* Filtro de tipo */}
      {/* <View className="flex-row justify-between mb-2">
        {[
          { type: "all", label: "Todas" },
          { type: "receita", label: "Receitas" },
          { type: "despesa", label: "Despesas" },
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
                filterType === btn.type ? `text-white` : "text-gray-400"
              }`}
            >
              {btn.label}
            </Text>
          </Pressable>
        ))}
      </View> */}

      <StatusFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <MonthFilter
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AccountItem account={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <Text className="text-center mt-6 text-gray-500">
            Nenhuma conta encontrada.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
