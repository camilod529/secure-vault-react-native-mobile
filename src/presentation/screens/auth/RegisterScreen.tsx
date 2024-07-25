import React, {useState} from 'react';
import {
  Button,
  Input,
  Layout,
  Text,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {RootStackParams} from '../../routes/Router';
import {useTranslation} from 'react-i18next';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const {register} = useAuthStore();
  const {t, i18n} = useTranslation();

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

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

  const handleLanguageChange = (index: IndexPath | IndexPath[]) => {
    const selectedIndex = Array.isArray(index) ? index[0].row : index.row;
    const language = Object.keys(i18n.options.resources!)[selectedIndex];
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.2}}>
          <Text category="h1">{t('Register')}</Text>
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
            onSelect={handleLanguageChange}
            value={selectedLanguage.toUpperCase()}
            style={{marginBottom: 10}}>
            {Object.keys(i18n.options.resources!).map((lng, index) => {
              console.log({lng, index});
              return <SelectItem key={index} title={lng.toUpperCase()} />;
            })}
          </Select>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder={t('Full name')}
            keyboardType="default"
            autoCapitalize="none"
            value={form.fullName}
            onChangeText={text => setForm({...form, fullName: text})}
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
          />
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
            {t('Register')}
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
          <Text category="p2">{t('Go to Login')} </Text>
          <Text status="primary" category="s1" onPress={() => navigation.pop()}>
            {t('Login')}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
