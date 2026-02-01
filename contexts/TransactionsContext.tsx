import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";
import { Transaction } from "../entities/Transaction";

type AddTransactionInput = {
  description: string;
  amount: number;
  referenceDate?: Date
}

type TransactionsContextProps = {
  formattedBalance: string;
  transactions: Transaction[];
  //Esse método retorna a transação criada 
  // addTransaction: (data: AddTransactionInput) => Transaction;
  // Modificado para retornar uma Promise<Transaction>
  addTransaction: (data: AddTransactionInput) => Promise<Transaction>;
  getLastTransactions?: (limit?: number) => Transaction[];
  findTransactionById?: (id: string) => Transaction | undefined;
  updateTransaction: (id: string, attributes: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const TransactionsContext = createContext<TransactionsContextProps | null>(null);

export const TransactionsProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // estados das transações
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // carregar as transações do AsyncStorage quando o componente for montado
  useEffect(() => {
    const loadItems = async () => {
      let transactions = await AsyncStorage.getItem('finance-app-transactions');
      const transactionsArray = JSON.parse(transactions ?? "[]").map((item: Transaction) => ({
        ...item,
        referenceDate: new Date(item.referenceDate),
      }));
      setTransactions(transactionsArray);
    }

    loadItems();
  }, []);

  // cálcular o saldo baseado no estado de transações
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const formattedBalance = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", }).format(balance);

  const getLastTransactions = (limit = 5) => {
    return [...transactions].sort((a, b) => b.referenceDate.getTime() - a.referenceDate.getTime()).slice(0, limit);
  }

  const findTransactionById = (id: string) => {
    return transactions.find(transaction => transaction.id === id);
  }

  // Adiciona uma nova transação ao estado
  // 

  // Modificado para ser uma função assíncrona com AsyncStorage

  const addTransaction = async (data: AddTransactionInput) => {
    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 99999).toString(),
      description: data.description,
      amount: data.amount,
      referenceDate: data.referenceDate ?? new Date(),
    }
    const updatedTransactions = [...transactions, newTransaction];
    await AsyncStorage.setItem('finance-app-transactions', JSON.stringify(updatedTransactions));
    setTransactions(current => [...current, newTransaction]);
    return newTransaction;
  };

  // Atualiza uma transação existente
  // const updateTransaction = (id: string, attributes: Partial<AddTransactionInput>) => {
  //   setTransactions(current =>
  //     current.map(transaction =>
  //       transaction.id === id ? { ...transaction, ...attributes, id: transaction.id } : transaction
  //     )
  //   );
  // }
  // Modificado para ser uma função assíncrona com AsyncStorage
  const updateTransaction = async (id: string, attributes: Partial<Transaction>) => {
    const updatedTransactions = transactions.map(transaction => (
      transaction.id === id
        ? { ...transaction, ...attributes }
        : transaction
    ));
    await AsyncStorage.setItem('finance-app-transactions', JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  }

  // Deleta uma transação existente sem AsyncStorage
  // const deleteTransaction = (id: string) => {
  //   setTransactions(current => current.filter(transaction => transaction.id !== id));
  // }

  // Deleta uma transação existente com AsyncStorage
  const deleteTransaction = async (id: string) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    await AsyncStorage.setItem('finance-app-transactions', JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  }

  return (
    <TransactionsContext.Provider
      value={{
        formattedBalance,
        transactions,
        addTransaction,
        getLastTransactions,
        findTransactionById,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}