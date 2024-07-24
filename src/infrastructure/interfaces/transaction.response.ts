import {AuthResponse} from './authResponse';

export interface TransactionResponse {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  created_at: Date;
  updated_at: null;
  deleted: boolean;
  createdBy: AuthResponse;
}

export enum Currency {
  Cop = 'COP',
  Mxn = 'MXN',
  Usd = 'USD',
}
