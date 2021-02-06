import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {BbUIModule} from "../shared/bb-ui.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TransferFormComponent} from './transfer-form/transfer-form.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {DashboardComponent} from "./dashboard.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {TransactionReviewComponent} from './transaction-review/transaction-review.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    DashboardComponent,
    TransferFormComponent,
    TransactionsListComponent,
    TransactionReviewComponent,
    TransactionReviewComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BbUIModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule
  ],
  exports: [
    MatIconModule,
    MatCardModule
  ],
  entryComponents: [TransactionReviewComponent]
})
export class DashboardModule {
}
