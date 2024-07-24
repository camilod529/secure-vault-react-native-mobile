import {secureVaultApi} from '../../config/api/secureVaultApi';
import {Currency, Transaction} from '../../domain/entity/transaction';
import {TransactionResponse} from '../../infrastructure/interfaces/transaction.response';
import {TransactionMapper} from '../../infrastructure/mappers/transactionMapper';

export const getAllTransactions = async (): Promise<Transaction[] | null> => {
  try {
    const {data} = await secureVaultApi.get<TransactionResponse[]>(
      '/transactions',
    );

    const transaction = data.map(
      TransactionMapper.TransactionResponseToTransactionEntity,
    );

    console.log(transaction);

    return [];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTransaction = async (
  name: string,
  amount: number,
  currency: Currency,
): Promise<Transaction | null> => {
  try {
    const {data} = await secureVaultApi.post<TransactionResponse>(
      '/transactions',
      {
        name,
        amount,
        currency,
      },
    );

    const transaction =
      TransactionMapper.TransactionResponseToTransactionEntity(data);

    return transaction;
  } catch (error) {
    console.error(error);
    return null;
  }
};
