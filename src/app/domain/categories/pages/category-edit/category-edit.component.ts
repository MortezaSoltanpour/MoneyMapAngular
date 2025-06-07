import { Component, OnInit } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { ValidationMessagesComponent } from '../../../../components/shared/validation-messages/validation-messages.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryServicesService } from '../../services/category-services.service';
import { categoryDto } from '../../models/categoryDtos';
import { LoadingService } from '../../../../services/loading.service';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-category-edit',
  imports: [
    ReactiveFormsModule,
    BreadcrumbComponent,
    RouterModule,
    MainTitleComponent,
    ValidationMessagesComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent implements OnInit {
  title = 'Edit';
  errors: string[] = [];

  constructor(
    private service: CategoryServicesService,
    private router: Router,
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

        this.pageForm = new FormGroup({
          Title: new FormControl(this.category.title, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          IsInput: new FormControl(this.category.isInput, [
            Validators.required,
          ]),
        });
        this.loading.hide();
      },
      error: (err) => {
        this.errors = err.error.errorMessages;
      },
    });
  }

  pageForm = new FormGroup({
    Title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    IsInput: new FormControl(false, [Validators.required]),
  });

  catData: categoryDto = {
    isInput: false,
    title: '',
    dateRegistered: new Date(),
    idCategory: '',
  };

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }

    this.loading.show();
    const formData = this.pageForm.value;

    this.catData = {
      idCategory: this.category.idCategory,
      isInput: formData.IsInput ?? false,
      title: formData.Title ?? '',
      dateRegistered: new Date(),
    };

    this.service
      .update(this.catData)
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
}
