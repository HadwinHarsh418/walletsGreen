import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDialogueComponent } from './send-dialogue.component';

describe('SendDialogueComponent', () => {
  let component: SendDialogueComponent;
  let fixture: ComponentFixture<SendDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
