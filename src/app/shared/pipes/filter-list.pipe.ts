import {Pipe, PipeTransform} from '@angular/core';
import {TransactionData} from '../models/transaction-data.model';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  /**
   * @summary Filters the array of TransactionData
   * @param transactions - an array of TransactionData that being filtered
   * @param [text=''] - a string that being checked against the fields on which filter needs to be done
   * @param [searchCategory=[]] - properties on which filter should be apply
   * @returns an array of TransactionData
   */
  transform(transactions: TransactionData[], text: string = '', searchCategory: string[] = []): TransactionData[] {
    if (!text) {
      return transactions;
    } else {
      return transactions.filter(transaction => {
        return Object.keys(transaction).filter(key => searchCategory.includes(key)).filter(key => {
          return transaction[key] && transaction[key].name.toString().toLowerCase().includes(text.toLowerCase());
        }).length > 0;
      });
    }
  }

}
