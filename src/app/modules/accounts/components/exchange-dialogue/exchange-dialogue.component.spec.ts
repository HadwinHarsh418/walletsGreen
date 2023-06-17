import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDialogueComponent } from './exchange-dialogue.component';

describe('ExchangeDialogueComponent', () => {
  let component: ExchangeDialogueComponent;
  let fixture: ComponentFixture<ExchangeDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
