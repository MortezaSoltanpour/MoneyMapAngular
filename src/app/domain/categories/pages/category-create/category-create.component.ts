import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { Router, RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../components/shared/validation-messages/validation-messages.component';
import { CategoryServicesService } from '../../services/category-services.service';
import { categoryDto } from '../../models/categoryDtos';
import { LoadingService } from '../../../../services/loading.service';
import { finalize } from 'rxjs';
import { ErrorMessageComponent } from '../../../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-category-create',
  imports: [
    ReactiveFormsModule,
    BreadcrumbComponent,
    RouterModule,
    MainTitleComponent,
    ValidationMessagesComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './category-create.component.html',
})
export class CategoryCreateComponent {
  constructor(
    private service: CategoryServicesService,
    private router: Router,
    private loading: LoadingService
  ) {}
  title = 'Create';
  errors: string[] = [];

  pageForm = new FormGroup({
    Title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    IsInput: new FormControl(false, [Validators.required]),
  });

  catData: categoryDto = {
    isInput: false,
    title: '',
    dateRegistered: new Date(),
    idCategory: '',
  };

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    this.loading.show();
    const formData = this.pageForm.value;

    this.catData = {
      idCategory: '',
      isInput: formData.IsInput ?? false,
      title: formData.Title ?? '',
      dateRegistered: new Date(),
    };

    this.service
      .add(this.catData)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/financial/categories']);
        },
        error: (err) => {
          this.errors = err.error.errorMessages;
        },
      });
  }
}
