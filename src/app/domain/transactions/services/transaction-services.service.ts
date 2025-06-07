import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAddresses } from '../../../shared/apiAddress';
import { transactionDto } from '../models/transactionDto';
import { ApiResponse } from '../../../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class TransactionServicesService {
  constructor(private httpClient: HttpClient) {}

  get(
    dateFrom: Date | null = null,
    dateTo: Date | null = null,
    idCategory: string[] = []
  ): Observable<ApiResponse<transactionDto[]>> {
    let params = new HttpParams();
    if (dateFrom) params = params.set('dtStart', dateFrom.toString());
    if (dateTo) params = params.set('dtEnd', dateTo.toString());
    if (idCategory) {
      for (var cat of idCategory) params = params.append('idCategory', cat);
    }
    return this.httpClient.get<ApiResponse<transactionDto[]>>(
      `${ApiAddresses.transaction}${ApiAddresses.all}`,
      { params }
    );
  }

  getOne(id: string): Observable<ApiResponse<transactionDto>> {
    return this.httpClient.get<ApiResponse<transactionDto>>(
      `${ApiAddresses.transaction}${ApiAddresses.details}?id=${id}`
    );
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(
      `${ApiAddresses.transaction}${ApiAddresses.delete}/${id}`
    );
  }
  add(data: transactionDto) {
    return this.httpClient.post(
      `${ApiAddresses.transaction}${ApiAddresses.add}`,
      data
    );
  }

  update(data: transactionDto) {
    return this.httpClient.post(
      `${ApiAddresses.transaction}${ApiAddresses.edit}`,
      data
    );
  }
}
