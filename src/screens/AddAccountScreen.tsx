import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { saveAccount } from "../db/actions/accountsActions";
import { Account } from "../db/types/types";

export default function AddAccountScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"receita" | "despesa">("receita");
  const [status, setStatus] = useState<"pendente" | "pago">("pendente");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState("");
  const [personId, setPersonId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [important, setImportant] = useState(false);

  const handleSave = async () => {
    if (!name || !value) {
      Alert.alert("Erro", "Preencha nome e valor");
      return;
    }

    const newAccount: Account = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      value: Number(value),
      type,
      status,
      dueDate: dueDate.toISOString(),
      description: description || undefined,
      personId: personId || undefined,
      categoryId: categoryId || undefined,
      important,
    };

    await saveAccount(newAccount);
    navigation.goBack();
  };

  return (
    <ScrollView className=" bg-primary1">
      <View className="p-6">
        <Text className="text-2xl font-bold text-white mb-6">
          ➕ Adicionar Conta
        </Text>

        {/* Nome */}
        <Text className="text-base font-semibold text-gray-300 mb-2">Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Conta de luz"
          placeholderTextColor="#6B7280"
          className="bg-[#161B22] text-white p-3 mb-4 rounded-xl"
        />

        {/* Valor */}
        <Text className="text-base font-semibold text-gray-300 mb-2">
          Valor
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="0.00"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          className="bg-[#161B22] text-white p-3 mb-4 rounded-xl"
        />

        {/* Tipo */}
        <Text className="text-base font-semibold text-gray-300 mb-2">Tipo</Text>
        <View className="flex-row mb-4">
          {[
            { label: "Receita", value: "receita", color: "#00D26A" },
            { label: "Despesa", value: "despesa", color: "#1DA1F2" },
          ].map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => setType(opt.value as any)}
              className={`flex-1 mx-1 py-3 rounded-xl border ${
                type === opt.value
                  ? "bg-[#161B22] border-gray-500"
                  : "bg-[#0D1117] border-gray-700"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  type === opt.value ? `text-[${opt.color}]` : "text-gray-400"
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Status */}
        <Text className="text-base font-semibold text-gray-300 mb-2">
          Status
        </Text>
        <View className="flex-row mb-4">
          {[
            { label: "Pendente", value: "pendente", color: "#FACC15" },
            { label: "Pago", value: "pago", color: "#00D26A" },
          ].map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => setStatus(opt.value as any)}
              className={`flex-1 mx-1 py-3 rounded-xl border ${
                status === opt.value
                  ? "bg-[#161B22] border-gray-500"
                  : "bg-[#0D1117] border-gray-700"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  status === opt.value ? `text-[${opt.color}]` : "text-gray-400"
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Data de vencimento */}
        <Text className="text-base font-semibold text-gray-300 mb-2">
          Data de Vencimento
        </Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="bg-[#161B22] py-3 px-4 rounded-xl mb-4"
        >
          <Text className="text-white">{dueDate.toLocaleDateString()}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowDatePicker(Platform.OS === "ios"); // no iOS permanece aberto
              if (selectedDate) setDueDate(selectedDate);
            }}
          />
        )}

        {/* Descrição */}
        <Text className="text-base font-semibold text-gray-300 mb-2">
          Descrição
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição (opcional)"
          placeholderTextColor="#6B7280"
          className="bg-[#161B22] text-white p-3 mb-4 rounded-xl"
        />

        {/* Pessoa */}
        <Text className="text-base font-semibold text-gray-300 mb-2">
          Pessoa
        </Text>
        <TextInput
          value={personId}
          onChangeText={setPersonId}
          placeholder="ID da pessoa (opcional)"
          placeholderTextColor="#6B7280"
          className="bg-[#161B22] text-white p-3 mb-4 rounded-xl"
        />

        {/* Categoria */}
        <Text className="text-base font-semibold text-gray-300 mb-2">
          Categoria
        </Text>
        <TextInput
          value={categoryId}
          onChangeText={setCategoryId}
          placeholder="ID da categoria (opcional)"
          placeholderTextColor="#6B7280"
          className="bg-[#161B22] text-white p-3 mb-6 rounded-xl"
        />

        {/* Importante */}
        <View className="flex-row items-center mb-6">
          <Text className="text-base font-semibold text-gray-300 mr-4">
            Importante
          </Text>
          <Switch value={important} onValueChange={setImportant} />
        </View>

        {/* Botão salvar */}
        <Pressable
          onPress={handleSave}
          className="bg-gradient-to-r from-[#1DA1F2] to-[#00D26A] py-4 rounded-full"
        >
          <Text className="text-center text-white font-bold text-lg">
            Salvar Conta
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
