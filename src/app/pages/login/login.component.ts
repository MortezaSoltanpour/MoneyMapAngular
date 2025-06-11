import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../components/shared/validation-messages/validation-messages.component';
import { Credentials } from '../../domain/users/models/usersDto';
import { finalize } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ValidationMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    let token = localStorage.getItem('access_token');
    if (token) this.router.navigate(['/financial/transactions']);
  }
  isLoading = false;
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.error('Model is not valid');
      return;
    }
    this.isLoading = true;
    const formData = this.loginForm.value;

    let credential: Credentials = {
      email: formData.email ?? '',
      password: formData.password ?? '',
    };

    this.auth
      .login(credential)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/financial/transactions']);
          if (formData.rememberMe) {
            localStorage.setItem('remember', 'true');
          }
        },
        error: (err) => {
          alert('Login failed');
        },
      });
  }
}
