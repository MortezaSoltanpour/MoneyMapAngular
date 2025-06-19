import { Component, OnInit } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../../../services/loading.service';
import { userDto } from '../../models/usersDto';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-user-delete',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
  ],
  templateUrl: './user-delete.component.html',
})
export class UserDeleteComponent implements OnInit {
  title: string = 'Details';
  user: userDto = {
    email: '',
    fullname: '',
  };
  errors: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private loading: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading.show();

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service
      .getOne(id)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (response) => {
          this.user = response.payLoad;
        },
        error: (err) => {
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
          this.router.navigate(['/financial/users']);
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
  }

  confirmDelete(event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this user ?')) {
      this.deleteData();
    }
  }
}
