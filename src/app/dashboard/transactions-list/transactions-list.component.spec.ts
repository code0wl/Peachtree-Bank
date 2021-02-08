import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TransactionsListComponent} from './transactions-list.component';
import {Component, DebugElement, Input} from '@angular/core';
import {TransactionData} from '../../shared/models/transaction-data.model';
import {BbUIModule} from '../../shared/bb-ui.module';
import {FormsModule} from '@angular/forms';
import mockTransactionsData from '../../core/mock-data/mock-transaction-data';
import {SortByDatePipe} from '../../shared/pipes/sort-by-date.pipe';
import {FilterListPipe} from '../../shared/pipes/filter-list.pipe';

@Component({
  selector: 'app-transactions-list',
  template: ''
})

class TransactionMockComponent {
  @Input() transaction: TransactionData;
}

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsListComponent, TransactionMockComponent, SortByDatePipe, FilterListPipe],
      imports: [BbUIModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.transactionsList = mockTransactionsData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
