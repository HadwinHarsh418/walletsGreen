import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup/setup.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SetupComponent, AddDeviceComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddDeviceComponent
  ],
  entryComponents: [
    AddDeviceComponent
  ]
})
export class SetupModule { }
