import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
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
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-user-create',
  imports: [
    MainTitleComponent,
    ReactiveFormsModule,
    BreadcrumbComponent,
    ValidationMessagesComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  constructor(
    private service: UserService,
    private router: Router,
    private loading: LoadingService
  ) {}
  title = 'Create';
  errors: string[] = [];

  userData: userDto = {
    email: '',
    fullname: '',
    password: '',
  };
  pageForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
      Validators.maxLength(100),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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
      email: formData.email ?? '',
      fullname: formData.fullname ?? '',
      password: formData.password ?? '',
    };

    this.service
      .add(this.userData)
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
}
