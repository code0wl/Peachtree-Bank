import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserAccount} from '../shared/models/user-account.model';
import userDetails from './mock-data/mock-user-data';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private accountDetails = {...userDetails};

  private accountDetailsSubject$: BehaviorSubject<UserAccount> = new BehaviorSubject(this.accountDetails);

  /**
   * @summary Fetches user account details
   * @returns an observable of user account details
   */
  getUserAccountDetails(): Observable<UserAccount> {
    return this.accountDetailsSubject$.asObservable();
  }

  /**
   * @summary Deducts the balance in the user account
   * @param amount - that being deducted from the user account
   */
  deductBalance(amount: number): void {
    const remainingBalance = this.accountDetails.balance - amount;
    this.accountDetails = {...this.accountDetails, ...{balance: remainingBalance}};
    this.accountDetailsSubject$.next(this.accountDetails);
  }
}
