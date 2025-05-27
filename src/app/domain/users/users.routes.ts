import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserDeleteComponent } from './pages/user-delete/user-delete.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

export const usersRoutes: Routes = [
  { path: '', component: UserListComponent, data: { title: 'Users' } },
  { path: 'create', component: UserCreateComponent, data: { title: 'Users' } },
  { path: 'edit/:id', component: UserEditComponent, data: { title: 'Edit' } },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
    data: { title: 'Details' },
  },
  {
    path: 'delete/:id',
    component: UserDeleteComponent,
    data: { title: 'Users' },
  },
];
