import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupInfoComponent } from './startup-info.component';

describe('StartupInfoComponent', () => {
  let component: StartupInfoComponent;
  let fixture: ComponentFixture<StartupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
