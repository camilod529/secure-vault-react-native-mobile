import React, {useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {Layout, Input, Text, Button} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {MyIcon} from '../../components';
import {RootStackParams} from '../../routes/Router';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <Layout style={{flex: 1}}>
      <ScrollView
        style={{
          marginHorizontal: 40,
        }}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>
        {/* Inputs */}
        <Layout
          style={{
            marginTop: 20,
          }}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="email-outline" />}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{marginBottom: 10}}
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
            accessoryLeft={<MyIcon name="lock-outline" />}
          />
        </Layout>
        <Layout style={{height: 20}} />

        {/* button */}
        <Layout>
          <Button
            onPress={() => console.log('login')}
            // disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}>
            Ingresar
          </Button>
        </Layout>

        {/* Register */}
        <Layout
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text category="p2">¿No tienes una cuenta? </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            Regístrate
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
