import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {USER_OBJECT} from './mock-data/mock-user-data';
import {UserAccount} from '../shared/models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor() {
  }

  /**
   * @summary Fetches user account details
   * @returns an observable of user account details
   */
  getUserAccountDetails(): Observable<UserAccount> {
    return of(USER_OBJECT);
  }

  deductBalance(amount): Observable<any> {
    return of({});
  }
}
