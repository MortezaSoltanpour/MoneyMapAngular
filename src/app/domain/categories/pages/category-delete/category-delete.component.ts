import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { NgIf } from '@angular/common';
import { CategoryServicesService } from '../../services/category-services.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { categoryDto } from '../../models/categoryDtos';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-category-delete',
  imports: [MainTitleComponent, BreadcrumbComponent, NgIf, FormsModule],
  templateUrl: './category-delete.component.html',
})
export class CategoryDeleteComponent {
  deleteData() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.delete(id).subscribe({
      next: (response) => {
        this.router.navigate(['/financial/categories']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  constructor(
    private service: CategoryServicesService,
    private route: ActivatedRoute,
    private router: Router,
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
  title = 'Delete';
}
