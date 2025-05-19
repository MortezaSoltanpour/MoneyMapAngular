import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';

export const usersRoutes: Routes = [
  { path: '', component: UserListComponent, data: { title: 'Users' } },
];
