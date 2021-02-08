import {Pipe, PipeTransform} from '@angular/core';
import {TransactionData} from '../models/transaction-data.model';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  /**
   * @summary Sorts the array of TransactionData
   * @param transactionsList - an array of TransactionData that being filtered
   * @param args - a string defined direction criteria
   * @returns an array of TransactionData
   */
  transform(transactionsList: TransactionData[], ...args: string[]): TransactionData[] {
    switch (args[0]) {
      case 'asc':
        return transactionsList.sort((a, b) => new Date(a.dates.valueDate).getTime() - new Date(b.dates.valueDate).getTime());
      case 'desc':
        return transactionsList.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
      default:
        return transactionsList;
    }
  }

}
