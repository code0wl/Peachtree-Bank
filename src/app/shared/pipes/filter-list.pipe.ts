import {Pipe, PipeTransform} from '@angular/core';
import {TransactionData} from "../models/transaction-data.model";

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  /**
   * @summary Filters the array of transactions
   * @param transactions - an array of transactions that being filtered
   * @param [text=''] - a string that being checked against the fields on which filter needs to be done
   * @param [filterSkipFields=[]] - properties on which filter should not apply
   * @returns an array of transactions
   */
  transform(transactions: TransactionData[], text: string = '', searchCatgory: string[] = []): TransactionData[] {
    if (!text) {
      return transactions;
    } else {
      return transactions.filter(transaction => {
        return Object.keys(transaction).filter(key => searchCatgory.includes(key)).filter(key => {
          return transaction[key] && transaction[key].name.toString().toLowerCase().includes(text.toLowerCase());
        }).length > 0;
      });
    }
  }

}
