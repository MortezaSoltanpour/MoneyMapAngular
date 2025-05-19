export interface categoryModel {
  title: string;
  isInput: boolean;
}

export interface categoryDto extends categoryModel {
  idCategory: string;
  dateRegistered: Date;
  type: string;
}
