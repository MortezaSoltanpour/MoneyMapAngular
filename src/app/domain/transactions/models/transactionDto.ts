export interface transactionDto {
  description: string;
  amount: number;
  Idcategory: string;
  dateRegistered?: Date | null;
  category?: string | null;
  fileAttached?: string | null;
  idTransaction?: string | null;
}
