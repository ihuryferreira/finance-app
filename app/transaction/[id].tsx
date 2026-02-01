import { globalStyles } from "@/styles/global";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { TransactionsModal } from "../../components/TransactionsModal";
import { useTransactions } from "../../hooks/useTransactions";

const TransactionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findTransactionById, updateTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const transaction = findTransactionById ? findTransactionById(id) : null;

  if (!transaction) return null;

  const handleSave = (data: { description: string; amount: number; referenceDate: Date }) => {
    setIsModalOpen(false);
    updateTransaction(transaction.id, data);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    const confirm = (mensage: string) => {
      return new Promise<boolean>((resolve) => {
        Alert.alert(
          "Confirmação",
          mensage,
          [
            { text: "Cancelar", onPress: () => resolve(false), style: "cancel" },
            { text: "Confirmar", onPress: () => resolve(true) },
          ]
        );
      });
    };
    if (!await confirm('Tem certeza que deseja excluir esta transação?')) return;
    deleteTransaction(transaction.id);
    router.replace('/transactions');
  };

  return (
    <View style={globalStyles.container}>
      <Stack.Screen options={{ title: `Transação #${id}` }} />
      <Text style={globalStyles.sectionTitle}>{transaction.description}</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(transaction.amount)}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10, color: '#666' }}>
        Data: {transaction.referenceDate.toLocaleDateString('pt-BR')}
      </Text>
      <View style={[globalStyles.buttonsContainer, { marginTop: 20 }]}>
        <Button
          title="Editar transação"
          variant="outlined"
          onPress={() => setIsModalOpen(true)}
        />
        <Button
          title="Excluir transação"
          variant="danger"
          onPress={handleDelete}
        />
      </View>
      <TransactionsModal
        Visible={isModalOpen}
        initialDescription={transaction.description}
        initialAmount={transaction.amount.toString()}
        initialReferenceDate={transaction.referenceDate.toISOString().split('T')[0]}
        onSave={handleSave}
        onClose={handleClose}
      />
    </View >
  )
}

export default TransactionScreen;