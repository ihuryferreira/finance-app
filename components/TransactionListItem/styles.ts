import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 12,
  },
  transactionText: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
});

export default styles;