import { Component, inject, OnInit } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { CategoryServicesService } from '../../services/category-services.service';
import { categoryDto } from '../../models/categoryDtos';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-category-details',
  imports: [MainTitleComponent, BreadcrumbComponent, NgIf],
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private service: CategoryServicesService,
    private route: ActivatedRoute,
    private loading: LoadingService
  ) {}

  category: categoryDto = {
    idCategory: '',
    isInput: false,
    title: '',
    dateRegistered: new Date(),
  };

  ngOnInit(): void {
    this.loading.show();
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.getOne(id).subscribe({
      next: (response) => {
        this.category = response.payLoad;
        this.loading.hide();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  title = 'Details';
}
