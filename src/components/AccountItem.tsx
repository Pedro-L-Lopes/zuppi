import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
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
  const navigation = useNavigation<any>();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isReceita = account.type === "receita";

  return (
    <Pressable
      onPress={() => navigation.navigate("AccountDetails", { account })}
    >
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
        {/* Status */}
        <View className="flex-row flex-wrap gap-2">
          <View
            className={`flex-row items-center px-3 py-1 rounded-full ${
              account.status === "pago" ? "bg-[#003B2A]" : "bg-[#3B2A00]"
            }`}
          >
            <Ionicons
              name={
                account.status === "pago" ? "checkmark-circle" : "alert-circle"
              }
              size={14}
              color={account.status === "pago" ? "#00D26A" : "#FACC15"}
              style={{ marginRight: 4 }}
            />
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
                  className={`flex-row items-center px-3 py-1 rounded-full ${
                    isOverdue ? "bg-red-800" : "bg-[#1f2937]"
                  }`}
                >
                  <Ionicons
                    name={isOverdue ? "warning" : "time"}
                    size={14}
                    color="white"
                    style={{ marginRight: 4 }}
                  />
                  <Text className="text-xs font-bold text-white">
                    {isOverdue
                      ? `Vencida em ${formatDate(account.dueDate)}`
                      : `Vence em ${formatDate(account.dueDate)}`}
                  </Text>
                </View>
              );
            })()}
        </View>

        {/* Importante */}
        {/* {account.important && (
          <View className="flex-row items-center px-3 py-1 rounded-full bg-[#3B0D0D]">
            <Ionicons
              name="alert-circle"
              size={14}
              color="#f87171"
              style={{ marginRight: 4 }}
            />
            <Text className="text-xs font-bold text-red-400">Importante</Text>
          </View>
        )} */}

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
    </Pressable>
  );
}
