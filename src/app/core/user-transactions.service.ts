import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TransactionData} from '../shared/models/transactions';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTransactionsService {

  constructor(private readonly http: HttpClient) {
  }

  /**
   * @summary Fetches user account details
   * @returns an observable of user account details
   */
  getUserTransactionDetails(): Observable<TransactionData[]> {
    return this.http.get('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions')
      .pipe(map(res => {
          return (res ? res : []) as TransactionData[];
        }),
        catchError(() => of([] as TransactionData[])));
  }
}
