import React from "react";
import { Text, View } from "react-native";

interface Props {
  accounts: any[];
}

export default function AccountsSummary({ accounts }: Props) {
  const total = accounts.reduce((sum, acc) => sum + acc.value, 0);
  const totalPago = accounts
    .filter((acc) => acc.status === "pago")
    .reduce((sum, acc) => sum + acc.value, 0);
  const totalPendente = accounts
    .filter((acc) => acc.status !== "pago")
    .reduce((sum, acc) => sum + acc.value, 0);

  return (
    <View className="bg-dark2 p-4 rounded-2xl mb-4 flex-row justify-between">
      <View>
        <Text className="text-gray-300 text-center text-xs">Total</Text>
        <Text className="text-gray-300 text-center text-xs">
          R$ {total.toFixed(2)}
        </Text>
      </View>
      <View>
        <Text className="text-gray-300 text-center text-xs">Pago</Text>
        <Text className="text-gray-300 text-center text-xs">
          R$ {totalPago.toFixed(2)}
        </Text>
      </View>
      <View>
        <Text className="text-gray-300 text-center text-xs">A pagar</Text>
        <Text className="text-gray-300 text-center text-xs">
          R$ {totalPendente.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
