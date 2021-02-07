import {SortByDatePipe} from './sort-by-date.pipe';
import {TransactionData} from "../models/transaction-data.model";

fdescribe('SortByDatePipe', () => {
  let pipe: SortByDatePipe;

  beforeEach(() => {
    pipe = new SortByDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not sort if direction is not specified', () => {
    const result = pipe.transform(testData, '');
    expect(result).toEqual(testData);
  });

  it('should sort the data in descending order of date', () => {
    const result = pipe.transform(testData, 'desc');
    expect(result[0].merchant.name).toBe('H&M Online Store');
  });

  it('should sort the data in ascending order of date', () => {
    const result = pipe.transform(testData, 'asc');
    expect(result[0].merchant.name).toBe('7-Eleven');
  });


  const testData = [{
    categoryCode: '#c12020',
    dates: {
      valueDate: 1600370800000
    },
    transaction: {
      amountCurrency: {
        amount: '22.10',
        currencyCode: 'EUR'
      },
      type: 'Online Transfer',
      creditDebitIndicator: 'DBIT'
    },
    merchant: {
      name: 'Amazon Online Store',
      accountNumber: 'SI64397745065188826'
    }
  }, {
    categoryCode: '#c89616',
    dates: {
      valueDate: 1600214400000
    },
    transaction: {
      amountCurrency: {
        amount: '46.25',
        currencyCode: 'EUR'
      },
      type: 'Card Payment',
      creditDebitIndicator: 'DBIT'
    },
    merchant: {
      name: '7-Eleven',
      accountNumber: 'SI64397745065188826'
    }
  }, {
    categoryCode: '#e25a2c',
    dates: {
      valueDate: 1602633600000
    },
    transaction: {
      amountCurrency: {
        amount: '19.72',
        currencyCode: 'EUR'
      },
      type: 'Online Transfer',
      creditDebitIndicator: 'DBIT'
    },
    merchant: {
      name: 'H&M Online Store',
      accountNumber: 'SI64397745065188826'
    }
  }] as TransactionData[];
});
