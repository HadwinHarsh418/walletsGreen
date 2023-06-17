import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTransactionHistoryComponent } from './full-transaction-history.component';

describe('FullTransactionHistoryComponent', () => {
  let component: FullTransactionHistoryComponent;
  let fixture: ComponentFixture<FullTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
