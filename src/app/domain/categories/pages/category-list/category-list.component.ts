import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [TableComponent, BreadcrumbComponent, RouterModule],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
  title = 'Categories';
}
