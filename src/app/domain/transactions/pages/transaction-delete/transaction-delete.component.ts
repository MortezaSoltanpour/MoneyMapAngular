import { Component, OnInit } from '@angular/core';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { transactionDto } from '../../models/transactionDto';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-transaction-delete',
  imports: [
    RouterModule,
    CommonModule,
    MainTitleComponent,
    BreadcrumbComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './transaction-delete.component.html',
})
export class TransactionDeleteComponent implements OnInit {
  constructor(
    private service: TransactionServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private loading: LoadingService
  ) {}
  title = 'Delete';
  errors: string[] = [];

  transactionData: transactionDto = {
    amount: 0,
    idCategory: '',
    description: '',
  };

  ngOnInit(): void {
    this.loading.show();

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.getOne(id).subscribe({
      next: (response) => {
        this.transactionData = response.payLoad;
        this.loading.hide();
      },
      error: (err) => {
        if (err.status === 404)
          this.router.navigate(['/financial/transactions']);
        this.errors = err.error.errorMessages;
      },
    });
  }

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
          this.router.navigate(['/financial/transactions']);
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
  }

  confirmDelete(event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.deleteData();
    }
  }
}
