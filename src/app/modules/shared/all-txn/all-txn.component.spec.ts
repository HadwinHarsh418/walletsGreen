import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTxnComponent } from './all-txn.component';

describe('AllTxnComponent', () => {
  let component: AllTxnComponent;
  let fixture: ComponentFixture<AllTxnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTxnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
