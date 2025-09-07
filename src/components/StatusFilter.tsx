import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  filterStatus: "all" | "pago" | "pendente" | "vencido";
  setFilterStatus: (status: "all" | "pago" | "pendente" | "vencido") => void;
}

export default function StatusFilter({ filterStatus, setFilterStatus }: Props) {
  const buttons = [
    { type: "all", label: "Todas" },
    { type: "pago", label: "Pagos" },
    { type: "pendente", label: "Pendentes" },
    // { type: "vencido", label: "Vencidos" },
  ];

  return (
    <View className="flex-row justify-between mb-4">
      {buttons.map((btn) => (
        <Pressable
          key={btn.type}
          onPress={() => setFilterStatus(btn.type as any)}
          className={`flex-1 mx-1 py-2 rounded-xl border ${
            filterStatus === btn.type
              ? "bg-[#161B22] border-gray-500"
              : "bg-[#0D1117] border-gray-700"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              filterStatus === btn.type ? "text-white" : "text-gray-400"
            }`}
          >
            {btn.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
