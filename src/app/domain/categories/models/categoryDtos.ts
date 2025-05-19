export interface categoryModel {
  Title: string;
  IsInput: boolean;
}

export interface categoryDto extends categoryModel {
  IdCategory: string;
  DateRegistered: Date;
}
