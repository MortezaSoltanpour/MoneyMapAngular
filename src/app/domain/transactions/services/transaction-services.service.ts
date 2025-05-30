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
    idCategory: string | null = null
  ): Observable<ApiResponse<transactionDto[]>> {
    let params = new HttpParams();
    if (dateFrom !== null) params = params.set('dtStart', dateFrom.toString());
    if (dateTo !== null) params = params.set('dtEnd', dateTo.toString());
    if (idCategory !== null) params = params.set('idCategory', idCategory);

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
    console.log(JSON.stringify(data));

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
