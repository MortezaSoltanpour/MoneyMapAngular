import { Component } from '@angular/core';
import { TableComponent } from '../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../models/sampledata';

@Component({
  selector: 'app-transactions',
  imports: [TableComponent],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
}
