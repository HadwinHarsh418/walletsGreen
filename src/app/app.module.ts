import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from '@modules/login/login.module';
import { MaterialModule } from '@modules/material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountsModule } from '@root/modules/accounts/accounts.module';
import { DashboardModule } from '@root/modules/dashboard/dashboard.module';
import { PayeeRoutingModule } from '@root/modules/payee/payee-routing.module';
import { PayeeModule } from '@root/modules/payee/payee.module';
import { SettingsModule } from '@root/modules/profile/settings.module';
import { TransactionsModule } from '@root/modules/transactions/transactions.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { AppEffects } from './effects/app.effects';
import { metaReducers, reducers } from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessengerModule } from '@modules/messenger/messenger.module';
import { SuperAdminModule } from '@root/modules/super-admin/super-admin.module';
import { SharedModule } from '@modules/shared/shared.module';
import { PayrixModule } from '@modules/payrix/payrix.module';
import { LunexModule } from './modules/lunex/lunex.module';
import { DatePipe } from '@angular/common';
import { SetupModule } from './modules/setup/setup.module';
import { FooterComponent } from './modules/dashboard/components/footer/footer.component';

@NgModule({
        declarations: [AppComponent, FooterComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LoginModule,
        PayrixModule,
        SetupModule,
        LunexModule,
        TransactionsModule,
        SettingsModule,
        SuperAdminModule,
        DashboardModule,
        AccountsModule,
        LayoutModule,
        MaterialModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument(),
        MatDialogModule,
        PayeeModule,
        PayeeRoutingModule,
        HttpClientModule,
        MessengerModule,
        SharedModule,
        AppRoutingModule,
    ],
    providers: [DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true, }
       ,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
