import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface Message {
  message: string;
  action: string;
  type: 'success' | 'accent' | 'warn';
}

@Component({
  selector: 'edex-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  message: string;
  action: string;
  type: string;

  constructor(public snackBarRef: MatSnackBarRef<MessageComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: Message) {
    this.message = data.message;
    this.action = data.action;
    this.type = data.type;
  }
}
