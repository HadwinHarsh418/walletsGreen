import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PTOOrdersComponent } from './pto-orders.component';

describe('PTOOrdersComponent', () => {
  let component: PTOOrdersComponent;
  let fixture: ComponentFixture<PTOOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PTOOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PTOOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
