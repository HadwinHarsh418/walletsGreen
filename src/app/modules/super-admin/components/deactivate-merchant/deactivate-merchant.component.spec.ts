import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateMerchantComponent } from './deactivate-merchant.component';

describe('DeactivateMerchantComponent', () => {
  let component: DeactivateMerchantComponent;
  let fixture: ComponentFixture<DeactivateMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
