import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TransferFormComponent} from './transfer-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BbUIModule} from "../../shared/bb-ui.module";
import {DebugElement, SimpleChange} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TransactionFormData} from "../../shared/models/transaction-form-data.model";

describe('TransferFormComponent', () => {
  let component: TransferFormComponent;
  let fixture: ComponentFixture<TransferFormComponent>;
  let debugElement: DebugElement;

  function getDebugElement(selector: string): DebugElement {
    return debugElement.query(By.css(selector));
  }

  function getDebugElements(selector: string): DebugElement[] {
    return debugElement.queryAll(By.css(selector));
  }

  const merchantsMock = [{
    name: 'Backbase',
    accountNumber: '1'
  }, {
    name: 'Amazon',
    accountNumber: '2'
  }];

  const userAccount = {
    name: 'user',
    accountNumber: '757342875374',
    balance: 10000,
    currencyCode: 'EUR'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransferFormComponent],
      imports: [ReactiveFormsModule, BbUIModule, FormsModule],
      providers: [{provide: MatSnackBar, useValue: {}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.merchants = merchantsMock;
    component.userAccount = userAccount;
    component.ngOnChanges({
      userAccount: new SimpleChange(undefined, userAccount, false)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with from account pre-filled', () => {
    expect(component.transferForm).toBeTruthy();
    expect(component.transferForm.get('fromAccount').value).toBe('user: $10000');
  });
  it('should invalid the form after ngOnChanges()', () => {
    expect(component.transferForm.valid).toBeFalsy();
  });

  it('should set value and disable the from account input field', () => {
    const fromAccountEl = getDebugElement('#from-account').nativeElement;

    expect(fromAccountEl.value).toBe('user: $10000');
    expect(fromAccountEl.disabled).toBeTrue();
  });

  it('should display error if amount is overdraft by more than 500', () => {
    let errorDe = getDebugElement('.error-text');
    expect(errorDe).toBeNull();
    component.transferForm.get('amount').setValue(11000);
    component.transferForm.markAllAsTouched();

    fixture.detectChanges();

    errorDe = getDebugElement('.error-text');
    expect(errorDe).toBeTruthy();
    expect(component.transferForm.get('amount').errors).toEqual({overdraft: true});
  });

  it('should add invalidAmount error to amount control', () => {
    component.transferForm.get('amount').setValue(0);

    expect(component.transferForm.get('amount').errors).toEqual({invalidAmount: true});
  });

  it('should make the form valid', () => {
    component.transferForm.get('toAccount').setValue(merchantsMock[0]);
    const amountInputEl = getDebugElement('#amount').nativeElement;
    amountInputEl.value = 100;
    amountInputEl.dispatchEvent(new Event('input'));
    component.transferForm.get('merchantSearch').setValue('Backbase');
    expect(component.transferForm.valid).toBeTrue();
  });

  it('should emit an event on form submit', () => {
    spyOn(component.performTransaction, 'emit');
    component.transferForm.get('toAccount').setValue(merchantsMock[0]);
    component.transferForm.get('amount').setValue(1000);
    component.transferForm.get('merchantSearch').setValue('Backbase');
    fixture.detectChanges();

    const formDe = getDebugElement('form');
    formDe.triggerEventHandler('submit', null);

    expect(component.performTransaction.emit).toHaveBeenCalledWith({
      fromAccount: {
        name: 'user',
        accountNumber: '757342875374',
        balance: 10000,
        currencyCode: 'EUR'
      },
      merchantSearch: 'Backbase',
      toAccount: merchantsMock[0],
      amount: 1000
    } as TransactionFormData);
  });

});
