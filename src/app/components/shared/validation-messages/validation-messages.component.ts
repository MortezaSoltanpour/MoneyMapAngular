import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  imports: [NgIf],
  templateUrl: './validation-messages.component.html',
})
export class ValidationMessagesComponent {
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';

  unknownError(): boolean {
    if (!this.control?.errors) return false;
    const known = [
      'required',
      'minlength',
      'maxlength',
      'email',
      'pattern',
      'min',
      'max',
    ];
    return Object.keys(this.control.errors).some((err) => !known.includes(err));
  }
}
