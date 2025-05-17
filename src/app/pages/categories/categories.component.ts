import { Component } from '@angular/core';
import { TableComponent } from '../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../models/sampledata';

@Component({
  selector: 'app-categories',
  imports: [TableComponent],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
}
