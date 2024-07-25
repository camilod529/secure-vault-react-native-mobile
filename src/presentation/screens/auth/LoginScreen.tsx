import React, {useState} from 'react';
import {Alert, ScrollView, useWindowDimensions} from 'react-native';
import {
  Layout,
  Input,
  Text,
  Button,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {MyIcon} from '../../components';
import {RootStackParams} from '../../routes/Router';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {useTranslation} from 'react-i18next';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {t, i18n} = useTranslation();
  const {height} = useWindowDimensions();
  const {login} = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      Alert.alert(t('Oops...'), t('Please fill in all fields'));
      return;
    }

    const {email, password} = form;
    const res = await login(email, password);
    if (!res) {
      Alert.alert(t('Oops...'), t('Invalid credentials'));
    }
  };

  const handleLanguageChange = (index: IndexPath | IndexPath[]) => {
    const selectedIndex = Array.isArray(index) ? index[0].row : index.row;
    const language = Object.keys(i18n.options.resources!)[selectedIndex];
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.25}}>
          <Text category="h1">{t('Login')}</Text>
          <Text category="p2">{t('Please fill in all fields')}</Text>
        </Layout>

        {/* Language Selector */}
        <Layout style={{marginTop: 20}}>
          <Select
            label={t('Select Language')}
            selectedIndex={
              new IndexPath(
                Object.keys(i18n.options.resources!).indexOf(selectedLanguage),
              )
            }
            value={selectedLanguage.toUpperCase()}
            onSelect={handleLanguageChange}
            style={{marginBottom: 10}}>
            {Object.keys(i18n.options.resources!).map((lng, index) => (
              <SelectItem key={index} title={lng.toUpperCase()} />
            ))}
          </Select>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder={t('Email')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="email-outline" />}
          />
          <Input
            placeholder={t('Password')}
            secureTextEntry
            autoCapitalize="none"
            style={{marginBottom: 10}}
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
            accessoryLeft={<MyIcon name="lock-outline" />}
          />
        </Layout>
        <Layout style={{height: 20}} />

        {/* Button */}
        <Layout>
          <Button
            onPress={onLogin}
            // disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}>
            {t('Login')}
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
          <Text category="p2">{t('Go to Register')} </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {t('Register')}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
