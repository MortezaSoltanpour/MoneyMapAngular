import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-create',
  imports: [BreadcrumbComponent, RouterModule],
  templateUrl: './category-create.component.html',
})
export class CategoryCreateComponent {
  title = 'Create';
}
