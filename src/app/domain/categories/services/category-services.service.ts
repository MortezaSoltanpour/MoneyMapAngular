import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAddresses } from '../../../shared/apiAddress';

@Injectable({
  providedIn: 'root',
})
export class CategoryServicesService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get(
      `${ApiAddresses.all}${ApiAddresses.baseAddress}`
    );
  }
}
