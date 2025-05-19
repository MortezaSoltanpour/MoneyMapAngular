import { Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';

export const categoriesRoutes: Routes = [
  { path: '', component: CategoryListComponent, data: { title: 'Categories' } },
  {
    path: 'create',
    component: CategoryCreateComponent,
    data: { title: 'Create' },
  },
];
