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
    <View className="bg-[#0D1117] border border-[#1f2937] rounded-2xl p-4 mb-4 shadow-md">
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
        {isReceita ? "+ " : "- "}R$ {account.value.toFixed(2)}
      </Text>

      {/* Badges */}
      <View className="flex-row flex-wrap gap-2 mb-2">
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

        {account.dueDate && (
          <View className="px-3 py-1 rounded-full bg-[#1f2937]">
            <Text className="text-xs text-gray-300">
              Vence em {formatDate(account.dueDate)}
            </Text>
          </View>
        )}

        {account.important && (
          <View className="px-3 py-1 rounded-full bg-[#3B0D0D]">
            <Text className="text-xs font-bold text-red-500">
              ⚠ Importante
            </Text>
          </View>
        )}
      </View>

      {/* Extras */}
      {account.description && (
        <Text className="mt-1 text-gray-300">📝 {account.description}</Text>
      )}
      {account.personId && (
        <Text className="text-gray-300">👤 Pessoa: {account.personId}</Text>
      )}
      {account.categoryId && (
        <Text className="text-gray-300">
          📂 Categoria: {account.categoryId}
        </Text>
      )}
    </View>
  );
}
