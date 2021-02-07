import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAccount} from '../../shared/models/user-account.model';
import {TransactionFormData} from "../../shared/models/transaction-form-data.model";

interface InputError {
  [key: string]: boolean;
}

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnChanges {
  transferForm: FormGroup;
  @Input() userAccount: UserAccount;
  @Output() performTransaction = new EventEmitter<TransactionFormData>();

  constructor(private fb: FormBuilder) {
  }

  /**
   * @returns amount form control from the transferForm form group
   */
  get amount(): AbstractControl {
    return this.transferForm.get('amount');
  }

  /**
   * @summary Initializes the form group on userAccount input changes
   * @param changes - the input properties changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userAccount && changes.userAccount.currentValue) {
      this.initializeForm();
    }
  }

  /**
   * @summary Forms transactionData object with from account, to account and amount
   *          details and emits an event to it's parent component with transactionData
   */
  onSubmit(): void {
    const transactionData = {...this.transferForm.value, ...{fromAccount: this.userAccount}};
    this.performTransaction.emit(transactionData);
  }

  /**
   * @summary Initializes the form with fromAccount, toAccount and amount controls
   */
  private initializeForm(): void {
    this.transferForm = this.fb.group({
      fromAccount: [{
        value: this.fromAccountDisplayValue(),
        disabled: true
      }],
      toAccount: [undefined, Validators.required],
      amount: [undefined, [Validators.required, this.validateAmount()]]
    });
  }

  /**
   * @summary Creates a string from the user account details in a format
   *          {name}{(accountNumber)} - {currencyCode}{balance}
   * @returns user account details as a string
   */
  private fromAccountDisplayValue(): string {
    const userAccount = this.userAccount;
    const name = userAccount.name;
    const balance = userAccount.balance;
    const currencyCode = '$';
    const accountNumber = userAccount.accountNumber.slice(-4);
    return `${name}(${accountNumber}) - ${currencyCode}${balance}`;
  }

  /**
   * @summary Validates the amount field for overdraft and zero amount
   * @returns an error object if the overdraft is more than 500 and/or amount entered is zero
   */
  private validateAmount(): ((control: AbstractControl) => InputError) {
    return (control: AbstractControl): InputError => {
      const balance = this.userAccount.balance;
      if ((balance - control.value) < -500) {
        return {overdraft: true};
      } else if (!/^\d+(?:\.\d{0,2})?$/g.test(control.value) || control.value === 0) {
        return {invalidAmount: true};
      }
      return null;
    };
  }


}
