import React, {useState} from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {RootStackParams} from '../../routes/Router';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const {register} = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const onRegister = async () => {
    if (
      form.email.length <= 0 ||
      form.password.length <= 0 ||
      form.fullName.length <= 0
    )
      return;

    const wasRegistered = await register(
      form.email,
      form.password,
      form.fullName,
    );

    if (wasRegistered) {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
      return;
    }
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView
        style={{
          marginHorizontal: 40,
        }}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout
          style={{
            marginTop: 20,
          }}>
          <Input
            placeholder="Nombre completo"
            keyboardType="default"
            autoCapitalize="none"
            value={form.fullName}
            onChangeText={text => setForm({...form, fullName: text})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
          />
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
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-outline" />}
          />
        </Layout>
        <Layout style={{height: 20}} />

        {/* button */}
        <Layout>
          <Button
            onPress={onRegister}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}>
            Registrate
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
          <Text category="p2">¿Ya tienes una cuenta? </Text>
          <Text status="primary" category="s1" onPress={() => navigation.pop()}>
            Ingresar
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
