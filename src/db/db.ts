// src/db/db.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "tinybase";

export const store = createStore();

const STORAGE_KEY = "finance-db";

export const loadDb = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const data = JSON.parse(json);

      Object.entries(data.tables || {}).forEach(([tableName, rows]) => {
        Object.entries(rows as Record<string, any>).forEach(([rowId, row]) => {
          store.setRow(tableName, rowId, row as any);
        });
      });
    }
  } catch (e) {
    console.error("Erro ao carregar o DB:", e);
  }
};

export const saveDb = async () => {
  try {
    const data = { tables: {} as Record<string, any> };
    store.getTableIds().forEach((tableId) => {
      data.tables[tableId] = {};
      store.getRowIds(tableId).forEach((rowId) => {
        data.tables[tableId][rowId] = store.getRow(tableId, rowId);
      });
    });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erro ao salvar o DB:", e);
  }
};
