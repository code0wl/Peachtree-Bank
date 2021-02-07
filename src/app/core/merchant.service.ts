import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserTransactionsService} from './user-transactions.service';
import {Merchant} from '../shared/models/transaction-data.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private readonly userTransactionsService: UserTransactionsService) {
  }

  /**
   * @summary Fetches transactions and maps to an array of merchants
   * @returns an observable of merchants
   */
  getMerchants(): Observable<Merchant[]> {
    return this.userTransactionsService.getTransactionsFromAPI().pipe(
      map(transactions => {
        return transactions.map(transaction => transaction.merchant).reduce((merchants, currentMerchant) => {
          if (!merchants.find(merchant => merchant.name === currentMerchant.name)) {
            merchants.push(currentMerchant);
          }
          return merchants;
        }, []);
      })
    );
  }
}
