import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../components/shared/table/table.component';
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
import { resetFakeAsyncZone } from '@angular/core/testing';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [
    NgFor,
    RouterModule,
    CommonModule,
    TableComponent,
    BreadcrumbComponent,
    MainTitleComponent,
  ],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;
  title = 'Transactions';

  constructor(
    private services: TransactionServicesService,
    private loading: LoadingService
  ) {}

  transactions: transactionDto[] = [];

  ngOnInit(): void {
    this.loading.show();

    this.services
      .get()
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (response) => {
          this.transactions = response.payLoad;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
