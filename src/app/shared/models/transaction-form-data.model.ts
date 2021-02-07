import {UserAccount} from './user-account.model';

export interface TransactionFormData {
  fromAccount: UserAccount;
  toAccount: UserAccount;
  amount: number;
}
