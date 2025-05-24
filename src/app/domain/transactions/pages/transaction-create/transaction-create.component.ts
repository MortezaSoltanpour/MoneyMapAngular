import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { ValidationMessagesComponent } from '../../../../components/shared/validation-messages/validation-messages.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';
import { CategoryServicesService } from '../../../categories/services/category-services.service';
import { categoryDto } from '../../../categories/models/categoryDtos';
import { finalize } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-transaction-create',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    ReactiveFormsModule,
    NgFor,
    ValidationMessagesComponent,
  ],
  templateUrl: './transaction-create.component.html',
})
export class TransactionCreateComponent {
  title = 'Create';
  categories: categoryDto[] = [];

  constructor(
    private catService: CategoryServicesService,
    private loading: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    const inputType = this.pageForm.get('IsInput')?.value;
    this.loading.show();
    this.catService
      .get(inputType)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (response) => {
          this.categories = response.payLoad;
          if (this.categories.length) {
            this.pageForm
              .get('IdCategory')
              ?.setValue(this.categories[0].idCategory);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  pageForm = new FormGroup({
    Description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
    Amount: new FormControl(null, [
      Validators.required,
      Validators.min(0.01),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ]),
    IsInput: new FormControl(true),
    IdCategory: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      return;
    }

    const formData = this.pageForm.value;
    console.log(formData);
  }
}
