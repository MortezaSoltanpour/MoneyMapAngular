import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';

import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { categoryDto } from '../../models/categoryDtos';
import { CategoryServicesService } from '../../services/category-services.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [NgIf, BreadcrumbComponent, RouterModule, MainTitleComponent, NgFor],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  constructor(private service: CategoryServicesService) {}
  ngOnInit(): void {
    this.service.get().subscribe({
      next: (response) => {
        this.categories = response.payLoad;
        // this.categories = response.payLoad.map((category) => ({
        //   ...category,
        //   Type: category.isInput ? 'Income' : 'Expense',
        // }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  title = 'Categories';

  categories: categoryDto[] = [];
}
