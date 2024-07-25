import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AllTransactions,
  CreateTransaction,
  HomePage,
  LoadingScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens';

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  CreateTransaction: undefined;
  AllTransactions: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomePage} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="CreateTransaction" component={CreateTransaction} />
      <Stack.Screen name="AllTransactions" component={AllTransactions} />
    </Stack.Navigator>
  );
};
