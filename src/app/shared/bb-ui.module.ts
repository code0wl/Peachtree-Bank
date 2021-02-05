import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {FilterComponent} from './components/filter/filter.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './components/logo/logo.component';
import {SubmitButtonComponent} from './components/submit-button/submit-button.component';
import {TransactionItemComponent} from './components/transaction-item/transaction-item.component';

const COMPONENTS = [
  FooterComponent,
  LogoComponent,
  SubmitButtonComponent,
  FilterComponent,
  TransactionItemComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [],
  exports: COMPONENTS,
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BbUIModule {
}
