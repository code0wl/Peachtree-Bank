import {TestBed} from '@angular/core/testing';
import mockTransactionsData from '../core/mock-data/mock-transaction-data';
import {UserTransactionsService} from './user-transactions.service';
import {TransactionData} from '../shared/models/transaction-data.model';
import {take} from 'rxjs/operators';
import {TransactionFormData} from '../shared/models/transaction-form-data.model';

describe('UserTransactionsService', () => {
  let transactionsService: UserTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    transactionsService = TestBed.inject(UserTransactionsService);
  });

  it('should be created', () => {
    expect(transactionsService).toBeTruthy();
  });

  it('#getTransactionsFromAPI should fetch transactions from API', (done: DoneFn) => {
    transactionsService.getTransactionsFromAPI().subscribe((transactions: TransactionData[]) => {
      expect(transactions).toEqual(mockTransactionsData);
      done();
    });
  });

  it('#getTransactions should fetch transactions from API and maps to TransformedTransaction', (done: DoneFn) => {
    transactionsService.getUserTransactionDetails().subscribe((transactions: TransactionData[]) => {
      expect(transactions[0]).toEqual({
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600493600000
        },
        transaction: {
          amountCurrency: {
            amount: '5000',
            currencyCode: 'EUR'
          },
          type: 'Salaries',
          creditDebitIndicator: 'CRDT'
        },
        merchant: {
          name: 'Backbase',
          accountNumber: 'SI64397745065188826'
        }
      });
      done();
    });
  });

  it('#addTransaction should add new transaction to the existing transactions', (done: DoneFn) => {
    transactionsService.getTransactionsFromAPI().pipe(
      take(1)
    ).subscribe(txns => {
      expect(txns.length).toBe(11);
    });


    transactionsService.addTransaction({
      fromAccount: {
        name: 'jhghjh',
        accountNumber: '3423545',
        balance: 10000,
        currencyCode: 'EUR'
      },
      toAccount: {
        name: 'hhfttf',
        accountNumber: '32435456576'
      },
      amount: 100
    } as TransactionFormData);

    transactionsService.getTransactionsFromAPI().pipe(
      take(1)
    ).subscribe(txns => {
      expect(txns.length).toBe(12);
      done();
    });
  });
});
