import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { updateAccountStatus } from "../db/actions/accountsActions";
import { Account } from "../db/types/types";

export default function AccountDetailsScreen() {
  const route = useRoute();
  const { account: initialAccount } = route.params as { account: Account };

  // Estado local para atualizar visualmente o status
  const [account, setAccount] = useState(initialAccount);

  const formatDate = (dateString?: string) =>
    dateString ? new Date(dateString).toLocaleDateString() : "-";

  const isReceita = account.type === "receita";
  const isOverdue =
    account.status === "pendente" &&
    account.dueDate &&
    new Date(account.dueDate) < new Date();

  const toggleStatus = async () => {
    const newStatus = account.status === "pago" ? "pendente" : "pago";
    await updateAccountStatus(
      account.id,
      newStatus === "pago" ? "pago" : "pendente"
    );

    setAccount({ ...account, status: newStatus });
  };

  return (
    <View className="flex-1 bg-[#0A0E14] p-4">
      <View className="p-2">
        <Text className="text-lg font-extrabold text-white mb-1">
          {account.name}
        </Text>
        <View className="flex-row items-end gap-2">
          <Text
            className={`text-5xl font-extrabold ${
              isReceita ? "text-[#00D26A]" : "text-[#1DA1F2]"
            }`}
          >
            R$ {account.value.toFixed(2)}
          </Text>
          <View className="flex-row items-center opacity-70">
            <Ionicons
              name={isReceita ? "trending-up" : "trending-down"}
              size={12}
              color={isReceita ? "#00D26A" : "#1DA1F2"}
              style={{ marginRight: 2 }}
            />
            <Text className="text-white font-bold text-xs">
              {isReceita ? "Receita" : "Despesa"}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2 mb-6">
        {/* Status */}
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
        {account.dueDate && (
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
        )}

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
      </View>

      {/* Notificações */}
      <View className="bg-[#1f2937] p-4 rounded-2xl shadow-md mb-6">
        <Text className="text-white font-bold text-lg mb-2">
          <Ionicons
            name={"notifications"}
            size={12}
            color={"white"}
            style={{ marginRight: 6 }}
          />{" "}
          Notificações
        </Text>
        <Text className="text-gray-300">
          Notificação desabilitada para essa conta
        </Text>
      </View>

      <Pressable
        onPress={toggleStatus}
        className={`py-4 px-6 rounded-3xl flex-row items-center justify-center  ${
          account.status === "pago" ? "bg-green text-primary1" : "bg-red"
        } shadow-lg`}
      >
        {account.status === "pago" ? (
          <>
            <Ionicons
              name="close-circle-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-bold text-lg">
              Marcar como pendente
            </Text>
          </>
        ) : (
          <>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-bold text-lg">
              Marcar como pago
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
