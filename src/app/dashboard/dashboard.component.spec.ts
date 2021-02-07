import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {TransferFormComponent} from './transfer-form/transfer-form.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {TransactionReviewComponent} from './transaction-review/transaction-review.component';
import {SortByDatePipe} from '../shared/pipes/sort-by-date.pipe';
import {FilterListPipe} from '../shared/pipes/filter-list.pipe';
import {UserTransactionsService} from '../core/user-transactions.service';
import {MerchantService} from '../core/merchant.service';
import {UserProfileService} from '../core/user-profile.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DebugElement} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let transactionsService: UserTransactionsService;
  let userDataService: UserProfileService;
  let merchantsDataService: MerchantService;
  let matDialogService: MatDialog;
  let matSnackBarService: MatSnackBar;

  const transactionsServiceMock = {
    getUserTransactionDetails(): void {
    },
    addTransaction(): void {
    }
  };

  const merchantsDataServiceMock = {
    getMerchants(): void {
    }
  };

  const userDataServiceMock = {
    getUserAccountDetails(): void {
    },
    deductBalance(): void {
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TransferFormComponent,
        TransactionsListComponent,
        TransactionReviewComponent,
        SortByDatePipe,
        FilterListPipe,
        TransactionReviewComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatSnackBar, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: UserTransactionsService, useValue: transactionsServiceMock},
        {provide: MerchantService, useValue: merchantsDataServiceMock},
        {provide: UserProfileService, useValue: userDataServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    transactionsService = TestBed.inject(UserTransactionsService);
    userDataService = TestBed.inject(UserProfileService);
    merchantsDataService = TestBed.inject(MerchantService);
    matDialogService = TestBed.inject(MatDialog);
    matSnackBarService = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
