import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDialogueComponent } from './receive-dialogue.component';

describe('ReceiveDialogueComponent', () => {
  let component: ReceiveDialogueComponent;
  let fixture: ComponentFixture<ReceiveDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
