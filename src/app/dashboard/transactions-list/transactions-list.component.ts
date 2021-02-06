import {Component, Input, OnInit} from '@angular/core';
import {TransactionData} from "../../shared/models/transactions";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  @Input() transactionsList: TransactionData[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
