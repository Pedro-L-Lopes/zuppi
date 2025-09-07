import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Account {
  id: string;
  name: string;
  value: number;
  status: string;
  type: "receita" | "despesa";
  dueDate?: string;
  description?: string;
  personId?: string;
  categoryId?: string;
  important?: boolean;
}

interface Props {
  account: Account;
  onDelete: (id: string) => void;
}

export default function AccountItem({ account, onDelete }: Props) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isReceita = account.type === "receita";

  return (
    <View className="bg-dark2 border border-[#1f2937] rounded-2xl p-4 mb-4 shadow-md">
      {/* Cabeçalho */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-white">{account.name}</Text>
        <Pressable
          onPress={() => onDelete(account.id)}
          className="p-1 rounded-full bg-[#1f2937]"
        >
          <MaterialIcons name="delete" size={20} color="#FF3B30" />
        </Pressable>
      </View>

      {/* Valor */}
      <Text
        className={`text-2xl font-extrabold mb-3 ${
          isReceita ? "text-[#00D26A]" : "text-[#1DA1F2]"
        }`}
      >
        R$ {account.value.toFixed(2)}
      </Text>

      {/* Badges */}
      <View className="flex-row flex-wrap gap-2 mb-2">
        {/* Status */}
        <View
          className={`px-3 py-1 rounded-full ${
            account.status === "pago" ? "bg-[#003B2A]" : "bg-[#3B2A00]"
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              account.status === "pago" ? "text-[#00D26A]" : "text-yellow-400"
            }`}
          >
            {account.status.toUpperCase()}
          </Text>
        </View>

        {/* Vencimento */}
        {account.dueDate &&
          (() => {
            const isOverdue =
              account.status === "pendente" &&
              new Date(account.dueDate) < new Date();

            return (
              <View
                className={`px-3 py-1 rounded-full ${
                  isOverdue ? "bg-red" : "bg-[#1f2937]"
                }`}
              >
                <Text
                  className={`text-xs font-bold text-white
                  `}
                >
                  {isOverdue
                    ? `Vencida em ${formatDate(account.dueDate)}`
                    : `Vence em ${formatDate(account.dueDate)}`}
                </Text>
              </View>
            );
          })()}

        {/* Importante */}
        {/* {account.important && (
    <View className="px-3 py-1 rounded-full bg-[#3B0D0D]">
      <Text className="text-xs font-bold text-red-500">
        ⚠ Importante
      </Text>
    </View>
  )} */}
      </View>

      {/* Extras */}

      {/* <View className="flex-row items-center gap-2">
        {account.personId && (
          <Text className="text-gray-300">👤 Ricardo ACF</Text>
          // <Text className="text-gray-300">👤 {account.personId}</Text>
        )}
        {account.categoryId && (
          <Text className="text-gray-300">📂 Carro</Text>
          // <Text className="text-gray-300">
          //   📂 Categoria: {account.categoryId}
          // </Text>
        )}
      </View> */}
    </View>
  );
}
