import { HttpClient, HttpParams } from '@angular/common/http';
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

  get(isInput: boolean | null = null): Observable<ApiResponse<categoryDto[]>> {
    let params = new HttpParams();
    if (isInput !== null) {
      params = params.set('isinput', isInput.toString());
    }

    return this.httpClient.get<ApiResponse<categoryDto[]>>(
      `${ApiAddresses.category}${ApiAddresses.all}`,
      { params }
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
    return this.httpClient.post(`${ApiAddresses.category}${ApiAddresses.add}`, {
      title: data.title,
      isInput: data.isInput,
    });
  }

  update(data: categoryDto) {
    return this.httpClient.post(
      `${ApiAddresses.category}${ApiAddresses.edit}`,
      data
    );
  }
}
