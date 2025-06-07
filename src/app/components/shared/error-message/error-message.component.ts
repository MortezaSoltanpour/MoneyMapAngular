import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [NgIf, NgFor],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input()
  hasError = false;

  @Input()
  errors: string[] = [];
}
