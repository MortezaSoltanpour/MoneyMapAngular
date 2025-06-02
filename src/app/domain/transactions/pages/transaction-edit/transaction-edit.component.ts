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
import { LoadingService } from '../../../../services/loading.service';
import { CategoryServicesService } from '../../../categories/services/category-services.service';
import { categoryDto } from '../../../categories/models/categoryDtos';
import { finalize } from 'rxjs';
import { NgFor } from '@angular/common';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { transactionDto } from '../../models/transactionDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-edit',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    ReactiveFormsModule,
    NgFor,
    ValidationMessagesComponent,
  ],
  templateUrl: './transaction-edit.component.html',
})
export class TransactionEditComponent implements OnInit {
  constructor(
    private catService: CategoryServicesService,
    private loading: LoadingService,
    private service: TransactionServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  title = 'Edit';
  categories: categoryDto[] = [];

  transactionData: transactionDto = {
    amount: 0,
    idCategory: '',
    description: '',
  };
  pageForm = new FormGroup<{
    Description: FormControl<string | null>;
    Amount: FormControl<number | null>;
    IsInput: FormControl<boolean | null>;
    IdCategory: FormControl<string | null>;
    dateRegistered: FormControl<string | null>;
  }>({
    Description: new FormControl(null, [
      Validators.required,
      Validators.maxLength(500),
    ]),
    Amount: new FormControl(null, [
      Validators.required,
      Validators.min(0.01),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ]),
    IsInput: new FormControl(true),
    IdCategory: new FormControl(null, [Validators.required]),
    dateRegistered: new FormControl(null),
  });

  ngOnInit(): void {
    this.loadCategories();

    this.loading.show();
    
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.getOne(id).subscribe({
      next: (response) => {
        this.transactionData = response.payLoad;

        this.pageForm.setValue({
          Description: this.transactionData.description ?? null,
          Amount: this.transactionData.amount ?? null,
          IsInput: true,
          IdCategory: this.transactionData.idCategory ?? null,
          dateRegistered: this.transactionData.dateRegistered
            ? new Date(this.transactionData.dateRegistered)
                .toISOString()
                .split('T')[0]
            : '',
        });
        this.loading.hide();
      },
      error: (error) => {
        console.log(error);
      },
    });
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

          const currentValue = this.pageForm.get('idCategory')?.value;
          const existsInList = this.categories.some(
            (cat) => cat.idCategory === currentValue
          );
          if (!currentValue || !existsInList) {
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
    this.transactionData.dateRegistered = formData.dateRegistered
      ? new Date(formData.dateRegistered)
      : null;
    this.service
      .update(this.transactionData)
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
          console.log(err);
        },
      });
  }
}
