import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';

@Component({
  selector: 'app-category-create',
  imports: [BreadcrumbComponent, RouterModule, MainTitleComponent],
  templateUrl: './category-create.component.html',
})
export class CategoryCreateComponent {
  title = 'Create';
}
