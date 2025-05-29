export interface userDto {
  idUser?: string;
  email: string;
  password: string;
  fullname: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface TokenDto {
  jwt: string;
}
