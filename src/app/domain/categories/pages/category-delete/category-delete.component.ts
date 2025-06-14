import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { NgIf } from '@angular/common';
import { CategoryServicesService } from '../../services/category-services.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { categoryDto } from '../../models/categoryDtos';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';
import { finalize } from 'rxjs';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-category-delete',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    NgIf,
    FormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './category-delete.component.html',
})
export class CategoryDeleteComponent {
  errors: string[] = [];

  deleteData() {
    this.loading.show();
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service
      .delete(id)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/financial/categories']);
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
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
      error: (err) => {
        this.errors = err.error.errorMessages;
      },
    });
  }
  title = 'Delete';

  confirmDelete(event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this category?')) {
      this.deleteData();
    }
  }
}
