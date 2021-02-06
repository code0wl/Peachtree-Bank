import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAccount} from '../../shared/models/userAccount';

interface InputError {
  [key: string]: boolean;
}

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit, OnChanges {
  transferForm: FormGroup;
  @Input() userAccount: UserAccount;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
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
  private validateAmount(): ((contol: AbstractControl) => InputError) {
    return (contol: AbstractControl): InputError => {
      const balance = this.userAccount.balance;
      if ((balance - contol.value) < -500) {
        return {overdraft: true};
      } else if (!/^\d+(?:\.\d{0,2})?$/g.test(contol.value) || contol.value === 0) {
        return {invalidAmount: true};
      }
      return null;
    };
  }


}
