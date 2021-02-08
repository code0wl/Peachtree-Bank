import {UserAccount} from './user-account.model';

export interface TransactionFormData {
  fromAccount: UserAccount;
  toAccount: UserAccount;
  merchantSearch?: string;
  amount: number;
}
