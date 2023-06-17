import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOfSaleComponent } from './source-of-sale.component';

describe('SourceOfSaleComponent', () => {
  let component: SourceOfSaleComponent;
  let fixture: ComponentFixture<SourceOfSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceOfSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
