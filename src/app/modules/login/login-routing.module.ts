import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationCompleteComponent } from '@modules/login/components/registration-complete/registration-complete.component'
import { RequestPasswordResetComponent } from '@modules/login/components/request-password-reset/request-password-reset.component'
import { RegisterUserComponent } from '@modules/login/components/register-user/register-user.component'
import { RegisterMerchantComponent } from '@modules/login/components/register-merchant/register-merchant.component'
import { RegisterChooseComponent } from '@modules/login/components/register-choose/register-choose.component'
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { UserActivationAccountComponent } from './components/user-activation-account/user-activation-account.component';
import {ActivateAccountComponent} from '@modules/login/components/activate-account/activate-account.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterChooseComponent
    },
    {
        path: 'user-signup',
        component: RegisterUserComponent
    },
    {
        path: 'merchant-signup',
        component: RegisterMerchantComponent
    },
    {
        path: 'registration',
        component: RegistrationCompleteComponent
    },
    {
        path: 'request-password-reset',
        component: RequestPasswordResetComponent
    },
    {
        path: 'password-reset',
        component: PasswordResetComponent
    },
    {
        path: 'activate-account',
        component: ActivateAccountComponent
    },
    {
        path: 'user-activate-account',
        component: UserActivationAccountComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
