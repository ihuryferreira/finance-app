import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export const useTransactions = () => {
  const transactionsContext = useContext(TransactionsContext);
  if (!transactionsContext) throw new Error("Invalid access to TransactionsContext.");
  return transactionsContext;
}