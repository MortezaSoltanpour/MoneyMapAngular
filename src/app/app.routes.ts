import { Routes } from '@angular/router';
import { AdminContainerComponent } from './pages/layout/admin-container/admin-container.component';
import { LoginComponent } from './pages/login/login.component';
import { categoriesRoutes } from './domain/categories/categories.routes';
import { transactionRoutes } from './domain/transactions/transactions.routes';
import { dashboardRoutes } from './domain/dashboard/dashboard.routes';
import { usersRoutes } from './domain/users/users.routes';

export const routes: Routes = [
  { component: LoginComponent, path: '' },
  {
    component: AdminContainerComponent,
    path: 'financial',
    children: [
      {
        path: 'dashboard',
        children: dashboardRoutes,
      },
      {
        path: 'categories',
        children: categoriesRoutes,
      },
      {
        path: 'transactions',
        children: transactionRoutes,
      },
      {
        path: 'users',
        children: usersRoutes,
      },
    ],
  },
];
