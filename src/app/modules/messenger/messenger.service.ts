import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageComponent } from './message/message.component';

@Injectable()
export class MessengerService {
  constructor(protected snackbar: MatSnackBar) {}

  public message(message: string, duration: number = 3000): void {
    this.snackbar.openFromComponent(MessageComponent, {
      data: { message, type: 'success' },
      panelClass: ['snackbar-success'],
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  public messageWithAction(message: string, action: string, duration: number = 3000): void {
    this.snackbar.openFromComponent(MessageComponent, {
      data: { message, action, type: 'accent' },
      panelClass: ['snackbar-accent'],
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  public error(error: string, duration: number = 3000): void {
    this.snackbar.openFromComponent(MessageComponent, {
      data: { message: error, type: 'warn' },
      panelClass: ['snackbar-error'],
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  public httpErrorHandler(err: HttpErrorResponse, message: string): void {
    console.error(err);
    if (typeof err.error === 'string' && err.error.includes('plan limits')) {
      this.error(message + ` - you have reached your max number of forms`, 6000);
    } else {
      this.error(message);
    }
  }
}
