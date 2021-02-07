import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAccount} from '../../shared/models/user-account.model';
import {TransactionFormData} from "../../shared/models/transaction-form-data.model";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Merchant} from "../../shared/models/transaction-data.model";

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
  modelChanged: Subject<string> = new Subject<string>();
  filteredMerchants: Merchant[] = [];
  showMerchantOptions: boolean;
  @Input() merchants: Merchant[];
  @Input() userAccount: UserAccount;
  @Output() performTransaction = new EventEmitter<TransactionFormData>();

  constructor(private fb: FormBuilder) {
    this.showMerchantOptions = false;
    this.modelChanged.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe((searchString) => {
      (searchString && this.transferForm.get('toAccount').value) ?
        this.showMerchantOptions = false :
        this.showMerchantOptions = true;
      this.filteredMerchants = this.merchants.filter(v => v.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1).slice(0, 10);
    });
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
    this.initializeForm();
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
   * @summary Reads the name of the given merchant
   * @param merchant - merchant object
   * @returns the name of the merchant
   */
  getFilteredMerchants(searchText: string): void {
    this.modelChanged.next(searchText);
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

  setMerchant(merchant: Merchant): void {
    this.showMerchantOptions = false;
    this.transferForm.get('merchantSearch').setValue(merchant.name);
    this.transferForm.get('toAccount').setValue(merchant);
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
      merchantSearch: [undefined, Validators.required],
      toAccount: [undefined, Validators.required],
      amount: [undefined, [Validators.required, this.validateAmount()]]
    });
  }

}
