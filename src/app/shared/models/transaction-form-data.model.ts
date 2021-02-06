import {UserAccount} from './user-account.model';

export interface TransactionFromData {
  fromAccount: UserAccount;
  toAccount: UserAccount;
  amount: number;
}
