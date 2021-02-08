import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TransactionReviewComponent} from './transaction-review.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

describe('TransactionReviewComponent', () => {
  let component: TransactionReviewComponent;
  let fixture: ComponentFixture<TransactionReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionReviewComponent],
      providers: [{provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No calls onNoClick()', waitForAsync(() => {
    spyOn(component, 'dismiss');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#close');
    button.click();
    expect(component.dismiss).toHaveBeenCalled();
  }));

  it('Yes calls onYesClick()', waitForAsync(() => {
    spyOn(component, 'confirm');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#send');
    button.click();
    expect(component.confirm).toHaveBeenCalled();
  }));

});
