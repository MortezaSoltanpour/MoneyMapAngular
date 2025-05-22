import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiAddresses } from '../shared/apiAddress';
import { Credentials, TokenDto } from '../domain/users/models/usersDto';
import { ApiResponse } from '../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${ApiAddresses.user}${ApiAddresses.login}`;
  private tokenKey = 'access_token';
  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<ApiResponse<TokenDto>> {
    return this.http
      .post<ApiResponse<TokenDto>>(this.authUrl, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.payLoad.jwt);
          this.isLoggedIn.set(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  checkAndAutoLogout(): void {
    if (this.isTokenExpired()) this.logout();
  }
}
