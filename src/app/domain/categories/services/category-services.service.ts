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

  get(): Observable<ApiResponse<categoryDto>> {
    let headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI0YzgyYjhjMi01MzAyLTQwOGYtYTkyMi0wMjllOWNiZWVkMjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJleHAiOjE3NDc2OTg1MzgsImlzcyI6Im1laHJlZ2Fuc21hcnQuY29tIiwiYXVkIjoibWVocmVnYW5zbWFydC5jb20ifQ.cpGHNATbR4iVYfOXMCtcHzFzEkcwNQWoZ8KqduWJJc8`,
    });

    return this.httpClient.get<ApiResponse<categoryDto>>(
      `${ApiAddresses.category}${ApiAddresses.all}`,
      { headers }
    );
  }
}
