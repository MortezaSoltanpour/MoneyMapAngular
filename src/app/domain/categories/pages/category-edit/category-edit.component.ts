import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-category-edit',
  imports: [MainTitleComponent, BreadcrumbComponent],
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent {
  title = 'Edit';
}
