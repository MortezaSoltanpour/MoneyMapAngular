import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminContainerComponent } from './pages/layout/admin-container/admin-container.component';
import { LoginComponent } from './pages/login/login.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsersComponent } from './pages/users/users.component';
import { CategoryListComponent } from './domain/categories/pages/category-list/category-list.component';

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
