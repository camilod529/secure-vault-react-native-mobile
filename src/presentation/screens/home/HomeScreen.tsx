import React from 'react';
import {MainLayout} from '../../layout/MainLayout';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../routes/Router';
import {useTranslation} from 'react-i18next';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomePage = ({navigation}: Props) => {
  const {height, width} = useWindowDimensions();
  const {user, logout} = useAuthStore();
  const {t} = useTranslation();

  return (
    <MainLayout title={t('Home')}>
      <Layout style={{flex: 1}}>
        <Card
          style={{
            marginTop: height * 0.2,
            alignItems: 'center',
          }}>
          <Text
            category="h1"
            style={{
              textAlign: 'center',
            }}>
            {t('Menu')}
          </Text>
          <Text
            category="p1"
            style={{
              textAlign: 'center',
              marginBottom: 20,
            }}>
            {t('Welcome')}, <Text category="p1">{user?.fullName}</Text>!
          </Text>
          <Button
            size="large"
            style={{
              marginHorizontal: 40,
              marginVertical: 7,
              width: width * 0.8,
            }}
            onPress={() => navigation.navigate('CreateTransaction')}>
            <Text>{t('Create Transaction')}</Text>
          </Button>
          <Button
            style={{
              marginHorizontal: 40,
              marginVertical: 7,
              width: width * 0.8,
            }}
            status="success"
            onPress={() => navigation.navigate('AllTransactions')}>
            <Text>{t('View All Transactions')}</Text>
          </Button>
          <Button
            style={{
              marginHorizontal: 40,
              marginVertical: 7,
              width: width * 0.8,
            }}
            status="warning"
            onPress={() => navigation.navigate('SeeAllMoneyByCurrency')}>
            <Text>{t('View Total Money in Safe')}</Text>
          </Button>
          <Button
            style={{
              marginHorizontal: 40,
              marginVertical: 7,
              width: width * 0.8,
            }}
            status="danger"
            onPress={logout}>
            <Text>{t('Logout')}</Text>
          </Button>
        </Card>
      </Layout>
    </MainLayout>
  );
};
