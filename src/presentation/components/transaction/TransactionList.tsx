import {Layout, List} from '@ui-kitten/components';
import {Transaction} from '../../../domain/entity/transaction';
import {QueryKey, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {TransactionCard} from './TransactionCard';
import {RefreshControl} from 'react-native-gesture-handler';

interface Props {
  transactions: Transaction[];
  fetchNextPage?: () => void;
  queryKey?: QueryKey;
}

export const TransactionList = ({
  fetchNextPage,
  transactions,
  queryKey,
}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    queryClient.invalidateQueries({queryKey});
    setIsRefreshing(false);
  };

  return (
    <List
      data={transactions}
      numColumns={1}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TransactionCard transaction={item} />}
      ListFooterComponent={() => <Layout style={{height: 110}} />}
      // onEndReached={fetchNextPage}
      // onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
