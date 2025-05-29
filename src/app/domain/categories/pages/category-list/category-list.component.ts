import { Component, OnInit } from '@angular/core';

import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { categoryDto } from '../../models/categoryDtos';
import { CategoryServicesService } from '../../services/category-services.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-category-list',
  imports: [NgIf, BreadcrumbComponent, RouterModule, MainTitleComponent, NgFor],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  constructor(
    private service: CategoryServicesService,
    private loading: LoadingService
  ) {}
  ngOnInit(): void {
    this.loading.show();
    this.service.get().subscribe({
      next: (response) => {
        this.categories = response.payLoad;
        this.loading.hide();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  title = 'Categories';

  categories: categoryDto[] = [];
}
