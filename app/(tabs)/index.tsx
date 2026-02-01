import { Button } from '@/components/Button';
import { TransactionsModal } from '@/components/TransactionsModal';
import { globalStyles } from '@/styles/global';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TransactionListItem from '../../components/TransactionListItem';
import { useTransactions } from '../../hooks/useTransactions';


function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const name = SecureStore.getItem('fin-app-id');
  const { formattedBalance, addTransaction, getLastTransactions } = useTransactions();
  const [identity, setIdentity] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState('');

  const handleAddTransaction = (data: {
    description: string;
    amount: number;
    referenceDate: Date;
  }) => {
    addTransaction(data);
    alert("Transação salva com sucesso!");
  };

  useEffect(() => {
    const loadIdentity = async () => {
      const value = await SecureStore.getItemAsync('fin-app-id');
      setIdentity(value);
    };
    loadIdentity();
  }, []);

  if (!identity) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[{ flex: 1, backgroundColor: '#2C5F30' }]}>
          <StatusBar barStyle={"default"} />
          <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>

            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 150, height: 150, marginBottom: 20 }}
            />


            <Text style={globalStyles.sectionTitle}>Indentifique-se para continuar</Text>
            <TextInput
              style={{
                marginVertical: 20,
                padding: 10,
                borderWidth: 1,
                borderColor: '#d0d3d0ec',
                borderRadius: 5,
                width: '100%',
                backgroundColor: '#fff',
                color: '#000',
                fontSize: 16,
              }}
              placeholder="Digite seu nome"
              value={nameInput}
              onChangeText={async (text) => {
                await SecureStore.setItemAsync('fin-app-id-temp', text);
                setNameInput(text);
              }} />
            <Button
              title='Entrar'
              onPress={async () => {
                await SecureStore.setItemAsync('fin-app-id', nameInput);
                setIdentity(nameInput);
              }}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#2C5F30' }]}>
        <StatusBar barStyle={"default"} />
        <View style={globalStyles.container}>
          <Image source={require("@/assets/images/finance-logo.png")} style={[globalStyles.logo, { marginTop: 16 }]} />
          <Text style={globalStyles.greeting}>
            Olá, {identity || 'Visitante'}!
          </Text>
          <Text style={globalStyles.balanceLabel}>
            Saldo Atual
          </Text>
          <Text style={globalStyles.balance}>
            {formattedBalance}
          </Text>


          <View style={globalStyles.buttonsContainer}>
            <Button title='Adicionar Receita' onPress={() => setIsModalOpen(true)} />
          </View>

          <TransactionsModal
            Visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddTransaction} />

          <Text style={globalStyles.sectionTitle}>
            Transações Recentes
          </Text>

          {/*
        <Text>FlatList 2</Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={globalStyles.transactionItem}>
              <Text style={globalStyles.transactionText}>
                {item.description}
              </Text>
              <Text style={[globalStyles.transactionAmount, item.amount >= 0 ? globalStyles.income : globalStyles.expense]}>
                R$ {item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        /> */}
          {/* {transactions.map(transaction => (
          <View key={transaction.id} style={globalStyles.transactionItem}>
            <Text style={globalStyles.transactionText}>
              {transaction.description}
            </Text>
            <Text style={[globalStyles.transactionAmount, transaction.amount >= 0 ? globalStyles.income : globalStyles.expense]}>
              R$ {transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))} */}

          {/* <View style={
          {
            marginVertical: 2,
            position: 'fixed',
            bottom: 20,
            width: '100%',
            height: 40,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            borderColor: '#d0d3d0ec',
            borderWidth: 1,
          }
        }>
          <Link href={"/transactions"} style={{ fontSize: 16, color: '#1b66f1', fontWeight: 'bold', textDecorationLine: "underline", }}>
            Ver transação
          </Link>
  
          <Link href={{ pathname: "/transaction/[id]", params: { id: 1 } }} style={{ fontSize: 16, color: '#1b66f1', fontWeight: 'bold', textDecorationLine: "underline", }}>
            Ver transação
          </Link>
        </View> */}

          <ScrollView>
            {getLastTransactions?.().map(transaction => (
              <TransactionListItem key={transaction.id} transaction={transaction} />
            ))}
          </ScrollView>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Index;