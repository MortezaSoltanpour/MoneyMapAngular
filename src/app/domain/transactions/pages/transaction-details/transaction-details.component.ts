import { Component, OnInit } from '@angular/core';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { transactionDto } from '../../models/transactionDto';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  imports: [
    RouterModule,
    CommonModule,
    MainTitleComponent,
    BreadcrumbComponent,
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

  transactionData: transactionDto = {
    amount: 0,
    Idcategory: '',
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
      error: (error) => {
        console.log(error);
      },
    });
  }
}
