import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Transaction } from "../../entities/Transaction";
import styles from "./styles";

type TransactionListItemProps = {
  transaction: Transaction;
};

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  return (
    <Link
      href={{ pathname: "/transaction/[id]", params: { id: transaction.id } }}
      key={transaction.id}
      asChild
    >
      <Pressable>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionText}>
            {transaction.description}
          </Text>
          <Text style={[
            styles.transactionAmount,
            transaction.amount >= 0 ? styles.income : styles.expense
          ]}>
            R$ {transaction.amount.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </Link>
  )
};

export default TransactionListItem;