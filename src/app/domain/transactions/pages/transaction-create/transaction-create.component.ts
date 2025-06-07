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
import { CommonModule, NgFor } from '@angular/common';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { transactionDto } from '../../models/transactionDto';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-transaction-create',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    ReactiveFormsModule,
    CommonModule,
    NgFor,
    ValidationMessagesComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './transaction-create.component.html',
})
export class TransactionCreateComponent {
  title = 'Create';
  categories: categoryDto[] = [];
  errors: string[] = [];

  constructor(
    private catService: CategoryServicesService,
    private loading: LoadingService,
    private services: TransactionServicesService,
    private router: Router
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

  getCurrentDateTimeString(): string {
    const now = new Date();
    return now.toISOString().slice(0, 10);
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
    dateRegistered: new FormControl(this.getCurrentDateTimeString(), [
      Validators.required,
    ]),
  });

  transactionData: transactionDto = {
    amount: 0,
    idCategory: '',
    description: '',
  };

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      return;
    }
    this.loading.show();

    const formData = this.pageForm.value;

    this.transactionData.amount = formData.Amount ?? 0;
    this.transactionData.description = formData.Description ?? '0';
    this.transactionData.idCategory = formData.IdCategory ?? '0';
    this.transactionData.dateRegistered = new Date(
      formData.dateRegistered ?? ''
    );

    this.services
      .add(this.transactionData)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/financial/transactions']);
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
  }
}
