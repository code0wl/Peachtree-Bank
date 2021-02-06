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


@NgModule({
  declarations: [DashboardComponent, TransferFormComponent, TransactionsListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BbUIModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MatIconModule
  ]
})
export class DashboardModule {
}
