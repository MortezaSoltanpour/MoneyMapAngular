import { Routes } from '@angular/router';
import { AdminContainerComponent } from './pages/layout/admin-container/admin-container.component';
import { LoginComponent } from './pages/login/login.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsersComponent } from './pages/users/users.component';
import { CategoryListComponent } from './domain/categories/pages/category-list/category-list.component';
import { DashboardComponent } from './domain/dashboard/pages/dashboard/dashboard.component';

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
      {
        component: CategoryListComponent,
        path: 'categories',
      },
      {
        component: TransactionsComponent,
        path: 'transactions',
      },
      {
        component: UsersComponent,
        path: 'users',
      },
    ],
  },
];
