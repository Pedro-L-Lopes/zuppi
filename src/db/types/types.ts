export type Account = {
  id: string;
  name: string;
  value: number;
  dueDate?: string;
  status: "pendente" | "pago";
  description?: string;
  type: "receita" | "despesa";
  personId?: string;
  categoryId?: string;
  important?: boolean;
};

export type Person = {
  id: string;
  name: string;
};
