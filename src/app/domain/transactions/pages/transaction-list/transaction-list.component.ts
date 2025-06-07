import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { LoadingService } from '../../../../services/loading.service';
import { finalize } from 'rxjs';
import { transactionDto } from '../../models/transactionDto';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryServicesService } from '../../../categories/services/category-services.service';
import { categoryDto } from '../../../categories/models/categoryDtos';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';
declare var $: any;

@Component({
  selector: 'app-transaction-list',
  imports: [
    NgFor,
    RouterModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    MainTitleComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('selectElement') selectElement!: ElementRef;
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
  title = 'Transactions';
  inputSum: number = 0;
  outputSum: number = 0;
  constructor(
    private services: TransactionServicesService,
    private loading: LoadingService,
    private catService: CategoryServicesService
  ) {}
  errors: string[] = [];

  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  categories: categoryDto[] = [];
  idCategory: string[] = [''];
  transactions: transactionDto[] = [];

  calculateSums(): void {
    this.inputSum = this.transactions
      .filter((t) => t.isInput === true)
      .reduce((sum, t) => sum + t.amount, 0);

    this.outputSum = this.transactions
      .filter((t) => t.isInput === false)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  ngOnInit(): void {
    this.loadTransaction();
    this.errors = [];
  }
  loadTransaction() {
    this.loading.show();

    this.services
      .get(this.dateFrom, this.dateTo, this.idCategory)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (response) => {
          this.transactions = response.payLoad;
          this.calculateSums();
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
    this.loadCategories();
  }

  loadCategories() {
    this.loading.show();
    this.catService
      .get()
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (response) => {
          this.categories = response.payLoad;
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
  }

  handleFilter() {
    this.loadTransaction();
  }

  ngAfterViewInit() {
    // Initialize Select2
    $(this.selectElement.nativeElement).select2();

    // Optional: Listen to change event
    $(this.selectElement.nativeElement).on('change', (e: any) => {
      const selectedValues = $(e.target).val(); // this is an array of selected values
      this.idCategory = selectedValues;
    });
  }

  ngOnDestroy() {
    // Destroy Select2 instance to avoid memory leaks
    $(this.selectElement.nativeElement).select2('destroy');
  }
}
