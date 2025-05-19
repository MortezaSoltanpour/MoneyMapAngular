import { Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';

export const categoriesRoutes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'create', component: CategoryCreateComponent },
];
