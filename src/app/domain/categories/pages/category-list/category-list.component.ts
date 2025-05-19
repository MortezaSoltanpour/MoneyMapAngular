import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { categoryDto } from '../../models/categoryDtos';
import { CategoryServicesService } from '../../services/category-services.service';

@Component({
  selector: 'app-category-list',
  imports: [
    TableComponent,
    BreadcrumbComponent,
    RouterModule,
    MainTitleComponent,
  ],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  constructor(private service: CategoryServicesService) {}
  ngOnInit(): void {
    var cates = this.service.get().subscribe((response) => {
      console.group('Get data from category');
      console.table(response);
      console.groupEnd();
    });
  }
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
  title = 'Categories';

  // categories: categoryDto[];
}
