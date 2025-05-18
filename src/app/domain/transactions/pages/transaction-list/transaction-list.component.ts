import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';

@Component({
  selector: 'app-transaction-list',
  imports: [TableComponent],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
}
