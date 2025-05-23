import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAddresses } from '../../../shared/apiAddress';
import { ApiResponse } from '../../../shared/models/api-response';
import { categoryDto } from '../models/categoryDtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryServicesService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ApiResponse<categoryDto[]>> {
    return this.httpClient.get<ApiResponse<categoryDto[]>>(
      `${ApiAddresses.category}${ApiAddresses.all}`
    );
  }

  getOne(id: string): Observable<ApiResponse<categoryDto>> {
    return this.httpClient.get<ApiResponse<categoryDto>>(
      `${ApiAddresses.category}${ApiAddresses.details}?id=${id}`
    );
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(
      `${ApiAddresses.category}${ApiAddresses.delete}/${id}`
    );
  }
  add(data: categoryDto) {
    return this.httpClient.post(
      `${ApiAddresses.category}${ApiAddresses.add}`,
      data
    );
  }

  update(data: categoryDto) {
    return this.httpClient.post(
      `${ApiAddresses.category}${ApiAddresses.edit}`,
      data
    );
  }
}
