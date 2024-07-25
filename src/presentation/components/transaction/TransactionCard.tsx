import {Card, Layout, Text} from '@ui-kitten/components';
import {Transaction} from '../../../domain/entity/transaction';
import {ScrollView, StyleSheet, View} from 'react-native';
import {transformToLegibleNumber} from '../../../config/helpers/transformToLegibleNumber';

interface Props {
  transaction: Transaction;
}

export const TransactionCard = ({transaction}: Props) => {
  return (
    <Card
      style={{margin: 10}}
      status={transaction.amount > 0 ? 'success' : 'danger'}>
      <View style={styles.cardContent}>
        <Text
          category="s1"
          style={styles.title}
          status={transaction.amount > 0 ? 'success' : 'danger'}>
          {transaction.name}
        </Text>
        <Text
          style={[
            styles.amount,
            transaction.amount > 0
              ? styles.amountPositive
              : styles.amountNegative,
          ]}>
          {transformToLegibleNumber(transaction.amount, transaction.currency)}
        </Text>
        <Text style={styles.detail} appearance="hint" category="c1">
          Created by: {transaction.createdBy.fullName}
        </Text>
        <Text style={styles.detail} appearance="hint" category="c1">
          Created at: {transaction.created_at.toLocaleString()}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  amount: {
    fontSize: 16,
  },
  detail: {
    color: '#6b7280', // text-gray-500
    fontSize: 14,
  },
  amountPositive: {
    color: 'rgba(76, 175, 80, 0.5)', // Green with 50% opacity
  },
  amountNegative: {
    color: 'rgba(244, 67, 54, 0.5)', // Red with 50% opacity
  },
});
