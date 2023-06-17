import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@root/services/auth-guard.service';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { PTOOrdersComponent } from './pto-orders/pto-orders.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
},
  {
    path: 'ptorders',
    component: PTOOrdersComponent,
    canActivate: [AuthGuardService],
},
  {
    path: 'transaction',
    component: OrderComponent,
    canActivate: [AuthGuardService],
},
{
  path:'transaction/:id',
  component : OrderComponent,
  canActivate: [AuthGuardService],
 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LunexRoutingModule { }
