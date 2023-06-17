import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { MaterialModule } from '@root/modules/material/material.module';
import { SettingsComponent } from './components/settings/settings.component';
import { SecurityComponent } from './components/security/security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DraftComponent } from './components/draft/draft.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './effects/profile.effects';
import { MerchantDetailEffects } from './effects/merchant-detail.effects';
import { reducers } from './reducers';
import { CompanyInfoComponent } from './components/draft/company-info/company-info.component';
import { ProcessingInfoComponent } from './components/draft/processing-info/processing-info.component';
import { TaxInfoComponent } from './components/draft/tax-info/tax-info.component';
import { BankInfoComponent } from './components/draft/bank-info/bank-info.component';
import { StartupInfoComponent } from './components/draft/startup-info/startup-info.component';
import { ProductServiceOfferComponent } from './components/draft/product-service-offer/product-service-offer.component';
import { MerchantDetailComponent } from './components/draft/merchant-detail/merchant-detail.component';
import { AddCommentDialogComponent } from './components/draft/add-comment-dialog/add-comment-dialog.component';
import { LastCommentsPipe } from './components/draft/last-comments.pipe';
import { MerchantStatusLabelPipe } from '@modules/profile/components/draft/merchant-status-label.pipe';
import { InformationComponent } from '@modules/profile/components/draft/information/information.component';
import { DocumentsComponent } from '@modules/profile/components/draft/documents/documents.component';
import { SiteInspectionComponent } from './components/draft/site-inspection/site-inspection.component';
import { DbaComponent } from './components/draft/dba/dba.component';
import { SourceOfSaleComponent } from './components/draft/source-of-sale/source-of-sale.component';
import { CommunicationComponent } from './components/draft/communication/communication.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('update', reducers),
    EffectsModule.forFeature([ProfileEffects, MerchantDetailEffects]),
    SettingsRoutingModule
  ],
  declarations: [
    ContainerComponent,
    InformationComponent,
    SettingsComponent,
    SecurityComponent,
    DocumentsComponent,
    DraftComponent,
    CompanyInfoComponent,
    ProcessingInfoComponent,
    TaxInfoComponent,
    BankInfoComponent,
    StartupInfoComponent,
    ProductServiceOfferComponent,
    MerchantDetailComponent,
    AddCommentDialogComponent,
    LastCommentsPipe,
    MerchantStatusLabelPipe,
    SiteInspectionComponent,
    DbaComponent,
    SourceOfSaleComponent,
    CommunicationComponent
  ],
  exports: [
    MerchantDetailComponent,
    MerchantStatusLabelPipe
  ],
  entryComponents: [
    AddCommentDialogComponent,
  ],
})
export class SettingsModule { }
