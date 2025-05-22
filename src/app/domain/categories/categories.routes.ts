import { Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';
import { CategoryDetailsComponent } from './pages/category-details/category-details.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './pages/category-delete/category-delete.component';

export const categoriesRoutes: Routes = [
  { path: '', component: CategoryListComponent, data: { title: 'Categories' } },
  {
    path: 'create',
    component: CategoryCreateComponent,
    data: { title: 'Create' },
  },
  {
    path: 'details/:id',
    component: CategoryDetailsComponent,
    data: { title: 'Details' },
  },
  {
    path: 'edit:id',
    component: CategoryEditComponent,
    data: { title: 'Edit' },
  },
  {
    path: 'delete:id',
    component: CategoryDeleteComponent,
    data: { title: 'Delete' },
  },
];
