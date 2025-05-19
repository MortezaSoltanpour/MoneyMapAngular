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
import { CategoryServicesService } from '../../services/category-services.service';

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
  constructor(private service: CategoryServicesService) {}
  title = 'Create';

  pageForm = new FormGroup({
    Title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    IsInput: new FormControl(false, [Validators.required]),
  });

  catData: categoryDto = {
    IdCategory: '',
    DateRegistered: new Date(),
    IsInput: false,
    Title: '',
  };

  handleSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    const formData = this.pageForm.value;
    console.table(formData);
    this.catData.IsInput = formData.IsInput ? formData.IsInput : false;
    this.catData.Title = formData.Title ? formData.Title : '';
    this.service.add(this.catData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.pageForm.reset({
      IsInput: false,
    });
  }
}
