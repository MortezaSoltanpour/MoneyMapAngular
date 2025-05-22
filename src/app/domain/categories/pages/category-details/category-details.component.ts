import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-category-details',
  imports: [MainTitleComponent, BreadcrumbComponent],
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent {
  title = 'Details';
}
