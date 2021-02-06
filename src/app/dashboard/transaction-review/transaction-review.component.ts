import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionFromData} from "../../shared/models/transaction-form-data.model";

@Component({
  selector: 'app-transaction-review',
  templateUrl: './transaction-review.component.html',
  styleUrls: ['./transaction-review.component.scss']
})
export class TransactionReviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TransactionReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TransactionFromData) {
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
