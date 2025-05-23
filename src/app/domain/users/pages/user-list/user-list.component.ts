import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';

@Component({
  selector: 'app-user-list',
  imports: [TableComponent, BreadcrumbComponent, MainTitleComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;

  title = 'Users';
}
