import { Component } from '@angular/core';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../components/shared/validation-messages/validation-messages.component';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../../../services/loading.service';
import { ChangePasswordDto } from '../../models/usersDto';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-change-password',
  imports: [
    MainTitleComponent,
    BreadcrumbComponent,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  title = 'Change password';
  errors: string[] = [];
  hasError = false;
  pageForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),

    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private service: UserService,
    private loading: LoadingService,
    private router: Router
  ) {}

  userData: ChangePasswordDto = {
    newPassword: '',
    oldPassword: '',
  };

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    this.loading.show();
    const formData = this.pageForm.value;

    this.userData = {
      oldPassword: formData.oldPassword ?? '',
      newPassword: formData.newPassword ?? '',
    };

    this.service
      .updatePassword(this.userData)
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
          this.hasError = true;
          this.errors = err.error.errorMessages;
          console.log(err.error.errorMessages);
        },
      });
  }
}
