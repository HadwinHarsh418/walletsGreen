import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MerchantsEffects } from '@modules/super-admin/effects/merchants.effects';
import { reducers } from './reducers';
import { MaterialModule } from '@root/modules/material/material.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { ContainerComponent } from '@root/modules/super-admin/components/container/admin.component';
import { MerchantsComponent } from '@modules/super-admin/components/merchants/merchants.component';
import { MerchantInfoComponent } from './components/merchant-info/merchant-info.component';
import { SettingsModule } from '@modules/profile/settings.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MerchantSummaryComponent } from './components/dashboard/merchant-summary/merchant-summary.component';
import { TopMerchantTypesComponent } from './components/dashboard/top-merchant-types/top-merchant-types.component';
import { AdminsComponent } from './components/admins/admins.component';
import { EditAdminDialogComponent } from './components/edit-admin-dialog/edit-admin-dialog.component';
import { TransactionsComponent } from '@modules/super-admin/components/transactions/transactions.component';
import { DeactivateMerchantComponent } from './components/deactivate-merchant/deactivate-merchant.component';
import { SharedModule } from '../shared/shared.module';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        StoreModule.forFeature('super-admin', reducers),     // we need to import StoreModule to use ngrx store
        EffectsModule.forFeature([MerchantsEffects]),  // we need to import EffectsModule to connect action with effects
        SuperAdminRoutingModule,
        SettingsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        ContainerComponent,
        MerchantsComponent,
        MerchantInfoComponent,
        DashboardComponent,
        MerchantSummaryComponent,
        TransactionsComponent,
        TopMerchantTypesComponent,
        AdminsComponent,
        EditAdminDialogComponent,
        DeactivateMerchantComponent,
        AdminContainerComponent,
    ],
    entryComponents: [
        EditAdminDialogComponent
    ]
})
export class SuperAdminModule {}
