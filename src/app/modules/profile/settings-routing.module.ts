import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { DraftComponent } from './components/draft/draft.component';
import { AuthGuardService } from '@root/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'draft',
        pathMatch: 'full'
      },
      {
        path: 'draft',
        component: DraftComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ]
})
export class SettingsRoutingModule {
}
