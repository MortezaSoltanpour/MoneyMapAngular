export interface ApiResponse<T> {
  dateRetrieve: Date;
  isDataFromCached: boolean;
  isSuccess: boolean;
  errorMessages: string;
  statusCode: number;
  payLoad: T;
  pageCount: number;
  pageNumber: number;
  totalItems: number;
}
