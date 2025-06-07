import { Component, OnInit } from '@angular/core';
import {
  userSampleTableColumns,
  userSampleTableData,
} from '../../../../shared/models/sampledata';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { userDto } from '../../models/usersDto';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../../../services/loading.service';
import { finalize } from 'rxjs';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-user-list',
  imports: [
    RouterModule,
    NgFor,
    BreadcrumbComponent,
    MainTitleComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userTableColumns = userSampleTableColumns;
  userTableData = userSampleTableData;

  title = 'Users';
  users: userDto[] = [];
  errors: string[] = [];
  constructor(private service: UserService, private loading: LoadingService) {}
  ngOnInit(): void {
    this.loading.show();
    this.service
      .get()
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (response) => {
          this.users = response.payLoad;
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
  }
}
