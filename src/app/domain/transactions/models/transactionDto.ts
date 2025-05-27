export interface transactionDto {
  description: string;
  amount: number;
  idCategory: string;
  dateRegistered?: Date | null;
  category?: string | null;
  fileAttached?: string | null;
  idTransaction?: string | null;
  isInput?: boolean | null;
}
