import {TestBed} from '@angular/core/testing';

import {UserTransactionsService} from './user-transactions.service';

describe('UserTransactionsService', () => {
  let service: UserTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
