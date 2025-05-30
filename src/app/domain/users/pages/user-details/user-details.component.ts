import { Component, OnInit } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../../../services/loading.service';
import { userDto } from '../../models/usersDto';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  title: string = 'Details';
  user: userDto = {
    email: '',
    fullname: '',
  };

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private loading: LoadingService
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
          console.log(err);
        },
      });
  }
}
