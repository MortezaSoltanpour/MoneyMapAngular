import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';

@Component({
  selector: 'app-category-list',
  imports: [TableComponent],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
}
