import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminContainerComponent } from './pages/layout/admin-container/admin-container.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { component: LoginComponent, path: '' },
  {
    component: AdminContainerComponent,
    path: 'financial',
    children: [
      {
        component: DashboardComponent,
        path: 'dashboard',
      },
    ],
  },
];
