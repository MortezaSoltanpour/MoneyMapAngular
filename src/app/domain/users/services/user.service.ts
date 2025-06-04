import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePasswordDto, TokenDto, userDto } from '../models/usersDto';
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

  get(): Observable<ApiResponse<userDto[]>> {
    return this.httpClient.get<ApiResponse<userDto[]>>(
      `${ApiAddresses.user}/all`
    );
  }

  getOne(id: string): Observable<ApiResponse<userDto>> {
    return this.httpClient.get<ApiResponse<userDto>>(
      `${ApiAddresses.user}${ApiAddresses.details}?id=${id}`
    );
  }

  add(data: userDto) {
    console.log(JSON.stringify(data));
    return this.httpClient.post(
      `${ApiAddresses.user}${ApiAddresses.add}`,
      data
    );
  }

  update(data: userDto) {
    return this.httpClient.post(
      `${ApiAddresses.user}${ApiAddresses.edit}`,
      data
    );
  }

  updatePassword(data: ChangePasswordDto) {
    return this.httpClient.post(
      `${ApiAddresses.user}${ApiAddresses.changePassword}`,
      data
    );
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(
      `${ApiAddresses.user}${ApiAddresses.delete}/${id}`
    );
  }
}
