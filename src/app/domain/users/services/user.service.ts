import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '../models/usersDto';
import { ApiAddresses } from '../../../shared/apiAddress';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  Login(): Observable<ApiResponse<TokenDto>> {
    return this.httpClient.get<ApiResponse<TokenDto>>(
      `${ApiAddresses.user}${ApiAddresses.login}`
    );
  }
}
