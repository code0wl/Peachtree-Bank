import {TestBed} from '@angular/core/testing';
import userAccountDetails from '../core/mock-data/mock-user-data';
import {UserProfileService} from './user-profile.service';
import {UserAccount} from '../shared/models/user-account.model';
import {take} from 'rxjs/operators';

describe('UserProfileService', () => {
  let userDataService: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileService]
    });
    userDataService = TestBed.inject(UserProfileService);
  });

  it('should be created', () => {
    expect(userDataService).toBeTruthy();
  });

  it('#getUserAccountDetails should fetch user account details', (done: DoneFn) => {
    userDataService.getUserAccountDetails().subscribe((accountDetails: UserAccount) => {
      expect(accountDetails).toEqual(userAccountDetails);
      done();
    });
  });

  it('#deductBalance should deduct balance from user account details', (done: DoneFn) => {
    userDataService.getUserAccountDetails()
      .pipe(take(1))
      .subscribe((accountDetails: UserAccount) => {
        expect(accountDetails.balance).toEqual(10000);
      });

    userDataService.deductBalance(100);

    userDataService.getUserAccountDetails().subscribe((accountDetails: UserAccount) => {
      expect(accountDetails.balance).toEqual(9900);
      done();
    });
  });
});
