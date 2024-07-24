import React from 'react';
import {MainLayout} from '../../layout/MainLayout';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../routes/Router';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomePage = ({navigation}: Props) => {
  const {height, width} = useWindowDimensions();
  const {user, logout} = useAuthStore();

  return (
    <Layout style={{flex: 1}}>
      <MainLayout title="Home" />
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
          Menu
        </Text>
        <Text
          category="p1"
          style={{
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Welcome, <Text category="p1">{user?.fullName}</Text>!
        </Text>
        <Button
          size="large"
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          onPress={() => navigation.navigate('CreateTransaction')}>
          <Text>Create a new translation</Text>
        </Button>
        <Button
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          status="success"
          onPress={() => navigation.navigate('AllTransactions')}>
          <Text>See all transactions</Text>
        </Button>
        <Button
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          status="warning">
          <Text>See all money in safe</Text>
        </Button>
        <Button
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          status="danger"
          onPress={logout}>
          <Text>Log out</Text>
        </Button>
      </Card>
    </Layout>
  );
};
