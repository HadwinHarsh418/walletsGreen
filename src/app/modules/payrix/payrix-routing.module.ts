import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrixPaymentNewComponent } from './payrix-payment-new/payrix-payment.component';
import { PayrixPaymentComponent } from './payrix-payment/payrix-payment.component';

const routes: Routes = [
  {
    path: 'payrix-payment',
    component: PayrixPaymentComponent
  },
  {
    path: 'payrix-payfield',
    component: PayrixPaymentNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrixRoutingModule { }
