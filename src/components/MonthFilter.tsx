import { AntDesign } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface Props {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export default function MonthFilter({
  selectedMonth,
  setSelectedMonth,
}: Props) {
  // transforma selectedMonth (YYYY-MM) em objeto Date
  const currentDate = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    return new Date(year, month - 1, 1);
  }, [selectedMonth]);

  // handlers
  const goPrev = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setSelectedMonth(
      `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
    );
  };

  const goNext = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setSelectedMonth(
      `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
    );
  };

  return (
    <View className="bg-dark2 rounded-2xl mb-4 flex-row items-center justify-between px-4 py-3">
      {/* seta esquerda */}
      <TouchableOpacity onPress={goPrev}>
        <AntDesign name="left" size={20} color="white" />
      </TouchableOpacity>

      {/* mês/ano atual */}
      <Text className="text-white font-semibold text-lg">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </Text>

      {/* seta direita */}
      <TouchableOpacity onPress={goNext}>
        <AntDesign name="right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
