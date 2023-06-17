import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LunexRoutingModule } from './lunex-routing.module';

import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsModule } from '../profile/settings.module';
import { SuperAdminRoutingModule } from '../super-admin/super-admin-routing.module';
import { PTOOrdersComponent } from './pto-orders/pto-orders.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrdersComponent,
    PTOOrdersComponent
  ],
  imports: [
    CommonModule,
    LunexRoutingModule,
    CommonModule,
    MaterialModule,
    SettingsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LunexModule { }
