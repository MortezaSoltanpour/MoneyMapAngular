import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/common/breadcrumb/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MainTitleComponent } from '../../../../components/common/main-title/main-title.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { categoryDto } from '../../models/categoryDtos';
import { ValidationMessagesComponent } from '../../../../components/shared/validation-messages/validation-messages.component';

@Component({
  selector: 'app-category-create',
  imports: [
    ReactiveFormsModule,
    BreadcrumbComponent,
    RouterModule,
    MainTitleComponent,
    ValidationMessagesComponent,
  ],
  templateUrl: './category-create.component.html',
})
export class CategoryCreateComponent {
  title = 'Create';

  pageForm = new FormGroup({
    Title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    IsInput: new FormControl(false),
  });

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    const formData = this.pageForm.value;
    console.table(formData);
  }
}
