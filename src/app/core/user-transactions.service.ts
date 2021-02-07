import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TransactionData} from '../shared/models/transaction-data.model';
import {HttpClient} from '@angular/common/http';
import {TransactionFormData} from '../shared/models/transaction-form-data.model';
import mockTransactionsData from '../core/mock-data/mock-transaction-data';

const categoryCodes = mockTransactionsData.map(transaction => transaction.categoryCode);

@Injectable({
  providedIn: 'root'
})
export class UserTransactionsService {

  private mockTransactions: TransactionData[] = [...mockTransactionsData];
  private transactions$: BehaviorSubject<TransactionData[]> = new BehaviorSubject(this.mockTransactions);

  constructor(private readonly http: HttpClient) {
  }

  /**
   * @summary Fetches transactions from API
   * @returns an observable of transactions
   */
  getTransactionsFromAPI(): Observable<TransactionData[]> {
    return this.transactions$.asObservable();
  }

  /**
   * @summary Fetches transactions from API and maps to TransformedTransaction
   * @returns an observable of transformed transactions
   */
  getUserTransactionDetails(): Observable<TransactionData[]> {
    return this.getTransactionsFromAPI();
  }

  /**
   * @summary Adds a new transaction to the existing general ledger
   * @param transactionData - transactionData object that being added
   */
  addTransaction(transactionData: TransactionFormData): void {
    const request = this.formTransactionRequest(transactionData);
    this.mockTransactions = [...this.mockTransactions, request];
    this.transactions$.next(this.mockTransactions);
  }

  /**
   * @summary Maps the transaction data to transaction
   * @param transactionData - transactionData object that being mapped to transaction
   * @returns a transaction object
   */
  private formTransactionRequest(transactionData: TransactionFormData): TransactionData {
    return {
      categoryCode: this.getCategoryCode(),
      dates: {
        valueDate: new Date().getTime(),
      },
      transaction: {
        amountCurrency: {
          amount: transactionData.amount as unknown as string,
          currencyCode: 'EUR'
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: transactionData.toAccount.name,
        accountNumber: transactionData.toAccount.accountNumber
      }
    };
  }

  /**
   * @summary Picks a random categoryCode from an array of categoryCodes
   * @returns a categoryCode for the new transaction
   */
  private getCategoryCode(): string {
    const randomNumber = Math.round(Math.random() * categoryCodes.length);
    return categoryCodes[randomNumber];
  }
}
