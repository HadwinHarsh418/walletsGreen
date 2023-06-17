import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistrationCompleteComponent } from "@modules/login/components/registration-complete/registration-complete.component";
import { LoginEffects } from "@modules/login/effects/login.effects";
import { LogoutEffects } from "@modules/login/effects/logout.effects";
import { SignupEffects } from "@modules/login/effects/signup.effects";
import { LoginRoutingModule } from "@modules/login/login-routing.module";
import { reducers } from "@modules/login/reducers";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MaterialModule } from "@root/modules/material/material.module";
// import { ContainerComponent } from "./components/container.component";
import { LoginComponent } from "./components/login/login.component";
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { RegisterChooseComponent } from './components/register-choose/register-choose.component';
import { RegisterMerchantComponent } from "./components/register-merchant/register-merchant.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { ResetEffects } from "./effects/reset.effects";
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { UserActivationAccountComponent } from './components/user-activation-account/user-activation-account.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature("login", reducers),
        EffectsModule.forFeature([LoginEffects, LogoutEffects, SignupEffects, ResetEffects]),
        LoginRoutingModule
    ],
    providers: [],
    declarations: [
        RegistrationCompleteComponent,
        LoginComponent,
        RegisterUserComponent,
        RegisterMerchantComponent,
        RequestPasswordResetComponent,
        RegisterChooseComponent,
        PasswordResetComponent,
        ActivateAccountComponent,
        UserActivationAccountComponent
    ]
})
export class LoginModule {}
