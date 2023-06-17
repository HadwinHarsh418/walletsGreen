import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayeeDialogueComponent } from './new-payee-dialogue.component';

describe('NewPayeeDialogueComponent', () => {
  let component: NewPayeeDialogueComponent;
  let fixture: ComponentFixture<NewPayeeDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPayeeDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayeeDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
