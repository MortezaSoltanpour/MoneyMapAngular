export interface ApiResponse<T> {
  dateRetrieve: Date;
  isDataFromCached: boolean;
  isSuccess: boolean;
  errorMessages: string;
  statusCode: number;
  payLoad: {};
  pageCount: number;
  pageNumber: number;
  totalItems: number;
}
