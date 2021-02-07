import {Component, Input, OnInit} from '@angular/core';
import {Merchant, TransactionData} from "../../shared/models/transaction-data.model";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  @Input() transactionsList: TransactionData[];
  @Input() merchants: Merchant[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.transactionsList);
  }

}
