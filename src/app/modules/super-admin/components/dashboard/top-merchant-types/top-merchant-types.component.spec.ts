import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMerchantTypesComponent } from './top-merchant-types.component';

describe('TopMerchantTypesComponent', () => {
  let component: TopMerchantTypesComponent;
  let fixture: ComponentFixture<TopMerchantTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMerchantTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMerchantTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
