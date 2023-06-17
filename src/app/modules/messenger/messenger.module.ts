import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MessengerService } from './messenger.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [MatSnackBarModule, CommonModule, MatIconModule, MatButtonModule],
  providers: [
    MessengerService,
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {},
    },
    {
      provide: MatSnackBarRef,
      useValue: {},
    },
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent],
  entryComponents: [MessageComponent]
})
export class MessengerModule { }
