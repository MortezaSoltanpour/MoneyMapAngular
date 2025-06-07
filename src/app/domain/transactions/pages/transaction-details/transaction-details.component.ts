import { Component, OnInit } from '@angular/core';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { transactionDto } from '../../models/transactionDto';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-transaction-details',
  imports: [
    RouterModule,
    CommonModule,
    MainTitleComponent,
    BreadcrumbComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './transaction-details.component.html',
})
export class TransactionDetailsComponent implements OnInit {
  constructor(
    private service: TransactionServicesService,
    private route: ActivatedRoute,
    private loading: LoadingService
  ) {}
  title = 'Details';
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
        this.errors = err.error.errorMessages;
      },
    });
  }
}
