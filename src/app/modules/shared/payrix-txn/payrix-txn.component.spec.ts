import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrixTxnComponent } from './payrix-txn.component';

describe('PayrixTxnComponent', () => {
  let component: PayrixTxnComponent;
  let fixture: ComponentFixture<PayrixTxnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrixTxnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrixTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
