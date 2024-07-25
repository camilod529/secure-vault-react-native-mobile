import {MainLayout} from '../../layout/MainLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../routes/Router';
import {useQuery} from '@tanstack/react-query';
import {getAllTransactions} from '../../../action/transaction/transaction';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {FullScreenLoader, TransactionList} from '../../components';
import {useTranslation} from 'react-i18next';

interface Props extends StackScreenProps<RootStackParams, 'AllTransactions'> {}

export const AllTransactions = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {isLoading, data: transactions = []} = useQuery({
    queryKey: ['transactions', 'all'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getAllTransactions(),
  });

  if (isLoading) return <FullScreenLoader />;

  if (!transactions || transactions.length === 0)
    return (
      <MainLayout title={t('All Transactions')}>
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.errorText}>{t('No transactions found.')}</Text>
        </Layout>
      </MainLayout>
    );

  return (
    <MainLayout
      title={t('All Transactions')}
      rightAction={() => navigation.navigate('SeeAllMoneyByCurrency')}
      rightActionIcon="trending-up-outline">
      <TransactionList
        transactions={transactions}
        queryKey={['transactions', 'all']}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    color: '#ff3d71',
    marginTop: 20,
  },
});
