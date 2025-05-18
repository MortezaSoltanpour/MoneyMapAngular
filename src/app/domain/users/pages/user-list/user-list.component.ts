import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';

@Component({
  selector: 'app-user-list',
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
}
