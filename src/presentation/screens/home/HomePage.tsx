import React from 'react';
import {MainLayout} from '../../layout/MainLayout';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomePage = () => {
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
          ¡Bienvenido, <Text category="p1">{user?.fullName}</Text>!
        </Text>
        <Button
          size="large"
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}>
          <Text>Crear nueva transaccion</Text>
        </Button>
        <Button
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          status="success">
          <Text>Ver todas las transacciones</Text>
        </Button>
        <Button
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          status="warning">
          <Text>Ver dinero total en la caja</Text>
        </Button>
        <Button
          style={{
            marginHorizontal: 40,
            marginVertical: 7,
            width: width * 0.8,
          }}
          status="danger"
          onPress={logout}>
          <Text>Cerrar sesion</Text>
        </Button>
      </Card>
    </Layout>
  );
};
