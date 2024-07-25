import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {Formik} from 'formik';
import {
  Card,
  Input,
  Select,
  SelectItem,
  Text,
  Button,
  IndexPath,
} from '@ui-kitten/components';
import {MainLayout} from '../../layout/MainLayout';
import {Currency} from '../../../domain/entity/transaction';
import {createTransaction} from '../../../action/transaction/transaction';
import {RootStackParams} from '../../routes/Router';
import {StackScreenProps} from '@react-navigation/stack';

const formInitialValue = {
  name: '',
  amount: '',
  transactionType: 'income',
  currency: Currency.COP,
};

const transactionTypes = [
  {title: 'Income', value: 'income'},
  {title: 'Expense', value: 'expense'},
];

interface Props
  extends StackScreenProps<RootStackParams, 'CreateTransaction'> {}

export const CreateTransaction = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  const handleSelect = (
    index: IndexPath | IndexPath[],
    setFieldValue: (field: string, value: any) => void,
    fieldName: string,
    options: {title: string; value: string}[],
  ) => {
    const selectedIndex = Array.isArray(index) ? index[0].row : index.row;
    setFieldValue(fieldName, options[selectedIndex].value);
  };

  const handleSubmit = async (values: typeof formInitialValue) => {
    // Convert amount to number
    const dataToSend = {
      name: values.name,
      Currency: values.currency,
      amount:
        values.transactionType === 'income'
          ? Math.abs(parseFloat(values.amount as string))
          : -Math.abs(parseFloat(values.amount as string)),
    };

    try {
      const createdTransaction = await createTransaction(
        dataToSend.name,
        dataToSend.amount,
        dataToSend.Currency,
      );

      if (!createdTransaction) {
        console.error('Error creating transaction');
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={formInitialValue} onSubmit={handleSubmit}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout title="Create Transaction">
          <ScrollView style={{flex: 1}}>
            <Card style={{marginTop: height * 0.2, marginHorizontal: 10}}>
              <Input
                label="Name"
                style={{margin: 5}}
                value={values.name}
                onChangeText={handleChange('name')}
              />
              <Input
                label="Amount"
                style={{margin: 5}}
                value={values.amount}
                onChangeText={handleChange('amount')}
                keyboardType="numeric"
              />
              <Select
                label="Transaction Type"
                selectedIndex={
                  new IndexPath(
                    transactionTypes.findIndex(
                      t => t.value === values.transactionType,
                    ),
                  )
                }
                value={
                  transactionTypes.find(t => t.value === values.transactionType)
                    ?.title
                }
                onSelect={index =>
                  handleSelect(
                    index,
                    setFieldValue,
                    'transactionType',
                    transactionTypes,
                  )
                }
                style={{margin: 5}}>
                {transactionTypes.map((type, index) => (
                  <SelectItem key={index} title={type.title} />
                ))}
              </Select>
              <Select
                label="Currency"
                selectedIndex={
                  new IndexPath(
                    Object.values(Currency).indexOf(values.currency),
                  )
                }
                value={values.currency}
                onSelect={index =>
                  handleSelect(
                    index,
                    setFieldValue,
                    'currency',
                    Object.values(Currency).map(currency => ({
                      title: currency,
                      value: currency,
                    })),
                  )
                }
                style={{margin: 5}}>
                {Object.values(Currency).map((currency, index) => (
                  <SelectItem key={index} title={currency} />
                ))}
              </Select>
              <Button onPress={() => handleSubmit()} style={{marginTop: 10}}>
                Submit
              </Button>
            </Card>
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
