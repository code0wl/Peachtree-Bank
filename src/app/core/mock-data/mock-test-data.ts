import {TransactionData} from '../../shared/models/transaction-data.model';

export default [{
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
