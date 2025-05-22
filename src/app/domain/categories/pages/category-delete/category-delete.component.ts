import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-category-delete',
  imports: [MainTitleComponent, BreadcrumbComponent],
  templateUrl: './category-delete.component.html',
})
export class CategoryDeleteComponent {
  title = 'Delete';
}
