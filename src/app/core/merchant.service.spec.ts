import {TestBed} from '@angular/core/testing';

import {MerchantService} from './merchant.service';
import {UserTransactionsService} from './user-transactions.service';
import {cold, getTestScheduler} from 'jasmine-marbles';
import transactionsData from './mock-data/mock-transaction-data';

describe('MerchantService', () => {
  let merchantsDataService: MerchantService;
  let transactionsService: UserTransactionsService;

  const transactionsServiceMock = {
    getTransactionsFromAPI(): void {
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MerchantService,
        {provide: UserTransactionsService, useValue: transactionsServiceMock}
      ]
    });
    merchantsDataService = TestBed.inject(MerchantService);
    transactionsService = TestBed.inject(UserTransactionsService);
  });

  it('should be created', () => {
    expect(merchantsDataService).toBeTruthy();
  });

  it('#getMerchants should fetch merchants', () => {
    const transactions$ = cold('---a--|', {a: transactionsData});
    spyOn(transactionsService, 'getTransactionsFromAPI').and.returnValue(transactions$);

    getTestScheduler().flush();

    merchantsDataService.getMerchants()
      .subscribe(merchants => {
        expect(merchants.length).toBe(11);
        expect(merchants[0]).toEqual({
          name: 'H&M Online Store',
          accountNumber: 'SI64397745065188826'
        });
      });
  });
});
