import { Routes } from '@angular/router';
import { AdminContainerComponent } from './pages/layout/admin-container/admin-container.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryListComponent } from './domain/categories/pages/category-list/category-list.component';
import { DashboardComponent } from './domain/dashboard/pages/dashboard/dashboard.component';
import { TransactionListComponent } from './domain/transactions/pages/transaction-list/transaction-list.component';
import { UserListComponent } from './domain/users/pages/user-list/user-list.component';

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
        component: TransactionListComponent,
        path: 'transactions',
      },
      {
        component: UserListComponent,
        path: 'users',
      },
    ],
  },
];
