import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserAccount} from '../shared/models/user-account.model';
import {Merchant, TransactionData} from '../shared/models/transaction-data.model';
import {UserTransactionsService} from '../core/user-transactions.service';
import {UserProfileService} from '../core/user-profile.service';
import {TransactionReviewComponent} from './transaction-review/transaction-review.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TransactionFormData} from '../shared/models/transaction-form-data.model';
import {MerchantService} from '../core/merchant.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userTransactionsList$: Observable<TransactionData[]>;
  userAccountDetails$: Observable<UserAccount>;
  merchants$: Observable<Merchant[]>;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private transactionsService: UserTransactionsService,
    private merchantsDataService: MerchantService,
    private userDataService: UserProfileService,
  ) {
  }

  ngOnInit(): void {
    this.userAccountDetails$ = this.userDataService.getUserAccountDetails();
    this.userTransactionsList$ = this.transactionsService.getUserTransactionDetails();
    this.merchants$ = this.merchantsDataService.getMerchants();
  }

  /**
   * @summary Opens a dialog to display transaction details such as from account, to account and amount
   *          on confirm - invokes add transaction to the existing transactions and deduct balance
   *          from user account
   * @param data - transaction data object which holds from account, to account and amount details
   */
  reviewTransaction(data: TransactionFormData): void {
    let dialogRef: MatDialogRef<TransactionReviewComponent>;
    dialogRef = this.matDialog.open(TransactionReviewComponent, {
      width: '40rem',
    });
    dialogRef.componentInstance.data = data;
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.transactionsService.addTransaction(data);
        this.userDataService.deductBalance(data.amount);
        this.matSnackBar.open('Transaction Successful', '', {duration: 3000});
      } else {
        this.matSnackBar.open('Transfer Cancelled, Please resubmit to transfer', '', {duration: 3000});
      }
    });
  }

}
