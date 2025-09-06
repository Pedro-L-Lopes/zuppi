import { useCallback, useEffect, useState } from "react";
import { store } from "../db";
import { Account } from "../types/types";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Função para buscar todas as contas
  const fetchAccounts = useCallback(() => {
    const allAccounts = store
      .getRowIds("accounts")
      .map((id) => store.getRow("accounts", id))
      .filter((acc): acc is Account => !!acc); 
    setAccounts(allAccounts);
  }, []);

  // Carrega as contas ao montar o hook
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Refresh manual
  const refreshAccounts = () => {
    fetchAccounts();
  };

  return { accounts, refreshAccounts };
};
