export interface TransactionData {
  categoryCode: string;
  dates: ValueDate;
  transaction: Transaction;
  merchant: Merchant;
}

export interface ValueDate {
  valueDate: number | string;
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
  amount: string;
  currencyCode: string;
}
