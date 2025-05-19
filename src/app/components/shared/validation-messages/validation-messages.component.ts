import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  imports: [],
  templateUrl: './validation-messages.component.html',
})
export class ValidationMessagesComponent {
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';
}
