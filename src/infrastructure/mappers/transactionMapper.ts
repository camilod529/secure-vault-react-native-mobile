import {Currency, Transaction} from '../../domain/entity/transaction';
import {TransactionResponse} from '../interfaces/transaction.response';

export class TransactionMapper {
  static TransactionResponseToTransactionEntity(
    transactionResponse: TransactionResponse,
  ): Transaction {
    const currency =
      transactionResponse.currency === 'COP'
        ? Currency.COP
        : transactionResponse.currency === 'MXN'
        ? Currency.MXN
        : Currency.USD;

    return {
      id: transactionResponse.id,
      name: transactionResponse.name,
      amount: transactionResponse.amount,
      currency,
      created_at: new Date(transactionResponse.created_at),
      deleted: transactionResponse.deleted,
      createdBy: transactionResponse.createdBy,
      updated_at: transactionResponse.updated_at
        ? new Date(transactionResponse.updated_at)
        : undefined,
    };
  }
}
