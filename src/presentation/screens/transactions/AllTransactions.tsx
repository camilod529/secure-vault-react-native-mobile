import {ScrollView} from 'react-native-gesture-handler';
import {MainLayout} from '../../layout/MainLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../routes/Router';

interface Props extends StackScreenProps<RootStackParams, 'AllTransactions'> {}

export const AllTransactions = ({navigation}: Props) => {
  return (
    <>
      <MainLayout title="All Transactions">
        <ScrollView style={{flex: 1}}></ScrollView>
      </MainLayout>
    </>
  );
};
