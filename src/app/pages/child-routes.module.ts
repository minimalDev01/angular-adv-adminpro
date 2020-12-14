import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenances
import { UsersComponent } from './maintenances/users/users.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { MedicsComponent } from './maintenances/medics/medics.component';
import { MedicComponent } from './maintenances/medics/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Account Settings' },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: { title: 'Searches' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress Bar' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { title: 'Graphics' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'User Profile' },
  },

  // Maintenances
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'Users Maintenances' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Hospitals Maintenances' },
  },
  {
    path: 'medics',
    component: MedicsComponent,
    data: { title: 'Medics Maintenances' },
  },
  {
    path: 'medic/:id',
    component: MedicComponent,
    data: { title: 'Medic Maintenances' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
