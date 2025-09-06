import { saveDb, store } from "../db";
import { Account } from "../types/types";

export const saveAccount = async (account: Account) => {
  store.setRow("accounts", account.id, account);
  await saveDb();
};

export const deleteAccount = async (id: string) => {
  store.delRow("accounts", id);
  await saveDb();
};

export const updateAccountStatus = async (
  id: string,
  status: "pending" | "paid"
) => {
  const account = store.getRow("accounts", id);
  if (account) {
    store.setRow("accounts", id, { ...account, status });
    await saveDb();
  }
};
