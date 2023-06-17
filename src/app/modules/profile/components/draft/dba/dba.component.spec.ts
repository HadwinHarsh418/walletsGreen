import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbaComponent } from './dba.component';

describe('DbaComponent', () => {
  let component: DbaComponent;
  let fixture: ComponentFixture<DbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
