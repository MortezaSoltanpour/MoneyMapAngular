import { Component, OnInit } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../../../services/loading.service';
import { userDto } from '../../models/usersDto';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-delete',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user-delete.component.html',
})
export class UserDeleteComponent implements OnInit {
  title: string = 'Details';
  user: userDto = {
    email: '',
    fullname: '',
  };

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
          console.log(err);
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
          this.router.navigate(['/financial/users']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  confirmDelete(event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this user?')) {
      this.deleteData();
    }
  }
}
