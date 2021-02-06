import {UserAccount} from './userAccount';

export interface TransactionData {
  categoryCode: UserAccount;
  dates: ValueDate;
  transaction: Transaction;
  merchant: Merchant;
}

export interface ValueDate {
  valueDate: number;
}

export interface Transaction {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator: string;
}

export interface Merchant {
  name: string;
  accountNumber: string;
}

export interface AmountCurrency {
  amount: number;
  currencyCode: string;
}
