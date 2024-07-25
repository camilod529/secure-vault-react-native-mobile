import React, {useEffect, useState} from 'react';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {MainLayout} from '../../layout/MainLayout';
import {useQuery} from '@tanstack/react-query';
import {getAllTransactions} from '../../../action/transaction/transaction';
import {FullScreenLoader} from '../../components';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Currency} from '../../../domain/entity/transaction';
import {transformToLegibleNumber} from '../../../config/helpers/transformToLegibleNumber';
import {RootStackParams} from '../../routes/Router';
import {StackScreenProps} from '@react-navigation/stack';

interface Props
  extends StackScreenProps<RootStackParams, 'SeeAllMoneyByCurrency'> {}

export const SeeAllMoneyByCurrency = ({navigation}: Props) => {
  const [total, setTotal] = useState<{[key in Currency]?: number}>({});
  const {height} = useWindowDimensions();

  const {isLoading, data: transactions = []} = useQuery({
    queryKey: ['transactions', 'all'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getAllTransactions(),
  });

  if (isLoading) return <FullScreenLoader />;

  if (!transactions || transactions.length === 0)
    return (
      // Show a error message
      <MainLayout title="All Transactions">
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.errorText}>Error: No transactions found.</Text>
        </Layout>
      </MainLayout>
    );

  useEffect(() => {
    const calculateTotals = () => {
      const totals: {[key in Currency]?: number} = {
        [Currency.COP]: 0,
        [Currency.USD]: 0,
        [Currency.MXN]: 0,
      };
      transactions.forEach(transaction => {
        if (totals[transaction.currency as Currency] !== undefined) {
          totals[transaction.currency as Currency]! += transaction.amount;
        }
      });
      setTotal(totals);
    };

    calculateTotals();
  }, [transactions]);

  return (
    <MainLayout title="See all money in safe">
      <ScrollView>
        <Card style={{marginTop: height * 0.18, margin: 10}}>
          <Text style={styles.title} category="h5">
            View Total Money in Safe
          </Text>
          {Object.keys(total).length === 0 ? (
            <Text style={styles.noTransactionsText}>
              No transactions found.
            </Text>
          ) : (
            <View style={styles.list}>
              {Object.entries(total).map(([currency, total]) => (
                <View key={currency} style={styles.listItem}>
                  <Text
                    style={styles.currency}
                    category="s1"
                    status={total && total > 0 ? 'basic' : 'danger'}>
                    {currency}:
                  </Text>
                  <Text
                    style={styles.amount}
                    status={total && total > 0 ? 'success' : 'danger'}>
                    {transformToLegibleNumber(total, currency as Currency)}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              style={{marginVertical: 5}}
              status="basic"
              onPress={() => navigation.navigate('AllTransactions')}>
              See all transactions
            </Button>
            <Button
              style={{marginVertical: 5}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeScreen'}],
                })
              }>
              Go home
            </Button>
          </View>
        </Card>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    color: '#ff3d71',
    marginTop: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  noTransactionsText: {
    textAlign: 'center',
  },
  list: {
    marginTop: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  currency: {
    fontWeight: 'bold',
  },
  amount: {
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'column',
  },
});
