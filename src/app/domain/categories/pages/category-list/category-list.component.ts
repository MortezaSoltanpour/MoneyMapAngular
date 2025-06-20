import { Component, OnInit } from '@angular/core';

import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { categoryDto } from '../../models/categoryDtos';
import { CategoryServicesService } from '../../services/category-services.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingService } from '../../../../services/loading.service';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-category-list',
  imports: [
    NgIf,
    BreadcrumbComponent,
    RouterModule,
    MainTitleComponent,
    NgFor,
    ErrorMessageComponent,
  ],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  constructor(
    private service: CategoryServicesService,
    private loading: LoadingService
  ) {}
  errors: string[] = [];
  title = 'Categories';
  categories: categoryDto[] = [];

  ngOnInit(): void {
    this.loading.show();
    this.service.get().subscribe({
      next: (response) => {
        this.categories = response.payLoad;
        this.loading.hide();
      },
      error: (err) => {
        this.errors = err.error.errorMessages;
      },
    });
  }
}
