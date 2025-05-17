import { Component } from '@angular/core';
import { TableComponent } from '../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../models/sampledata';

@Component({
  selector: 'app-users',
  imports: [TableComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
}
