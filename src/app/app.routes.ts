import { Routes } from '@angular/router';
import { AdminContainerComponent } from './pages/layout/admin-container/admin-container.component';
import { LoginComponent } from './pages/login/login.component';
import { categoriesRoutes } from './domain/categories/categories.routes';
import { transactionRoutes } from './domain/transactions/transactions.routes';
import { dashboardRoutes } from './domain/dashboard/dashboard.routes';
import { usersRoutes } from './domain/users/users.routes';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    component: LoginComponent,
    path: '',
    data: { title: 'Financial management Moneymap | Login' },
  },
  {
    component: AdminContainerComponent,
    path: 'financial',
    children: [
      {
        path: 'dashboard',
        children: dashboardRoutes,
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        children: categoriesRoutes,
        canActivate: [authGuard],
      },
      {
        path: 'transactions',
        children: transactionRoutes,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        children: usersRoutes,
        canActivate: [authGuard],
      },
    ],
  },
];
