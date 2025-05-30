import { Component, OnInit } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../components/shared/validation-messages/validation-messages.component';
import { userDto } from '../../models/usersDto';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  imports: [
    MainTitleComponent,
    ReactiveFormsModule,
    BreadcrumbComponent,
    ValidationMessagesComponent,
  ],
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private loading: LoadingService
  ) {}
  ngOnInit(): void {
    this.loading.show();

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.getOne(id).subscribe({
      next: (response) => {
        this.userData = response.payLoad;

        this.pageForm.setValue({
          email: this.userData.email ?? null,
          fullname: this.userData.fullname ?? null,
        });

        this.loading.hide();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  title = 'Create';

  userData: userDto = {
    email: '',
    fullname: '',
  };
  pageForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
      Validators.maxLength(100),
    ]),

    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
  });

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    this.loading.show();
    const formData = this.pageForm.value;

    this.userData = {
      idUser: this.route.snapshot.paramMap.get('id') ?? '',
      email: formData.email ?? '',
      fullname: formData.fullname ?? '',
    };

    this.service
      .update(this.userData)
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
          console.log(err);
        },
      });
  }
}
