import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserAccount} from '../shared/models/userAccount';
import {TransactionData} from "../shared/models/transactions";
import {UserTransactionsService} from "../core/user-transactions.service";
import {UserProfileService} from "../core/user-profile.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userTransactionsList$: Observable<TransactionData[]>;
  userAccountDetails$: Observable<UserAccount>;

  constructor(
    private transactionsService: UserTransactionsService,
    private userDataService: UserProfileService,
  ) {
  }

  ngOnInit(): void {
    this.userAccountDetails$ = this.userDataService.getUserAccountDetails();
    this.userTransactionsList$ = this.transactionsService.getUserTransactionDetails();
  }

}
