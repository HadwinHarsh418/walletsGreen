import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSummaryComponent } from './merchant-summary.component';

describe('MerchantSummaryComponent', () => {
  let component: MerchantSummaryComponent;
  let fixture: ComponentFixture<MerchantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
