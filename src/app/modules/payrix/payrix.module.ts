import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrixRoutingModule } from './payrix-routing.module';
import { PayrixPaymentComponent } from './payrix-payment/payrix-payment.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayrixPaymentNewComponent } from './payrix-payment-new/payrix-payment.component';

@NgModule({
  declarations: [PayrixPaymentComponent, PayrixPaymentNewComponent],
  imports: [
    CommonModule,
    PayrixRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PayrixModule { }
