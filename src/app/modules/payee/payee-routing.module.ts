import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "@root/modules/payee/components/container.component";
import { AuthGuardService } from '@root/services/auth-guard.service';

const routes: Routes = [
    {
        path: "payee",
        component: ContainerComponent,
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PayeeRoutingModule {}
