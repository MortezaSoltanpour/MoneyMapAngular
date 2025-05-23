import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../components/shared/validation-messages/validation-messages.component';
import { Credentials } from '../../domain/users/models/usersDto';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    const formData = this.loginForm.value;

    let credential: Credentials = {
      email: formData.email ?? '',
      password: formData.password ?? '',
    };

    this.auth.login(credential).subscribe({
      next: () => this.router.navigate(['/financial/dashboard']),
      error: (err) => alert('Login failed'),
    });
  }
}
