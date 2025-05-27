import { Routes } from '@angular/router';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './pages/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './pages/transaction-edit/transaction-edit.component';
import { TransactionDetailsComponent } from './pages/transaction-details/transaction-details.component';
import { TransactionDeleteComponent } from './pages/transaction-delete/transaction-delete.component';

export const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionListComponent,
    data: { title: 'Transactions' },
  },
  {
    path: 'create',
    component: TransactionCreateComponent,
    data: { title: 'Create' },
  },
  {
    path: 'edit/:id',
    component: TransactionEditComponent,
    data: { title: 'Edit' },
  },
  {
    path: 'details/:id',
    component: TransactionDetailsComponent,
    data: { title: 'Details' },
  },
  {
    path: 'delete/:id',
    component: TransactionDeleteComponent,
    data: { title: 'Delete' },
  },
];
