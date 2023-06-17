import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServiceOfferComponent } from './product-service-offer.component';

describe('ProductServiceOfferComponent', () => {
  let component: ProductServiceOfferComponent;
  let fixture: ComponentFixture<ProductServiceOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductServiceOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductServiceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
