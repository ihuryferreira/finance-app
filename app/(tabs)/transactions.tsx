import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { FlatList, ListRenderItem, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Transaction } from "../../entities/Transaction";
import { useTransactions } from "../../hooks/useTransactions";

const renderTransaction: ListRenderItem<Transaction> = ({ item }) => {
  return (

    <Link
      href={{ pathname: "/transaction/[id]", params: { id: item.id } }}
      asChild
    >
      <Pressable>
        <View style={globalStyles.transactionItem}>
          <Text style={globalStyles.transactionText}>
            {item.description}
          </Text>
          <Text style={[globalStyles.transactionAmount, item.amount >= 0 ? globalStyles.income : globalStyles.expense]}>
            R$ {item.amount.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};


// const renderTransaction: ListRenderItem<Transaction> = ({ item }) => {
//   return (

//     <View style={globalStyles.transactionItem}>
//       <Link href={{ pathname: "/transaction/[id]", params: { id: item.id } }}>
//         <Text style={globalStyles.transactionText}>
//           {item.description}
//         </Text>
//         <Text style={[globalStyles.transactionAmount, item.amount >= 0 ? globalStyles.income : globalStyles.expense]}>
//           R$ {item.amount.toFixed(2)}
//         </Text>
//       </Link >
//     </View>
//   );
// };

const TransactionsScreen = () => {
  const { transactions } = useTransactions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2C5F30' }}>
        <StatusBar barStyle="default" />
        <View style={globalStyles.container}>
          <Text style={[globalStyles.sectionTitle, { marginTop: 16 }]}>Todas as Transações</Text>

          {/* <Text>FlasList</Text> */}
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={renderTransaction}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default TransactionsScreen;