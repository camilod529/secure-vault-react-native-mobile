import {User} from './user';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  created_at: Date;
  deleted: boolean;
  createdBy: User;
  updated_at?: Date;
}

export enum Currency {
  COP = 'COP',
  USD = 'USD',
  MXN = 'MXN',
}
