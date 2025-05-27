import { Component, OnInit } from '@angular/core';
import { TransactionServicesService } from '../../services/transaction-services.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { transactionDto } from '../../models/transactionDto';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-transaction-delete',
  imports: [
    RouterModule,
    CommonModule,
    MainTitleComponent,
    BreadcrumbComponent,
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
      error: (error) => {
        if (error.status === 404)
          this.router.navigate(['/financial/transactions']);
        console.log(error);
      },
    });
  }

  deleteData() {
    this.loading.show();
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('id', id);
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
        error: (error) => {
          console.log(error);
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
